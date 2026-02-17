import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { phases } from '@/data/phases';
import { storyBeats } from '@/data/storyBeats';
import MetricsBanner from '@/components/MetricsBanner';
import PhaseBackground from '@/components/PhaseBackground';
import WalkingMan from '@/components/WalkingMan';
import NPCCharacter from '@/components/NPCCharacter';

const DustParticles = () => (
  <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 3, height: 3,
          backgroundColor: 'hsl(var(--dust))',
          left: -10 + i * 4, bottom: 0,
          animation: 'dust-particle 0.8s ease-out infinite',
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

const WalkingScene = () => {
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const totalBeats = storyBeats.length;
  const beat = storyBeats[currentBeatIndex];
  const metricsPhaseIndex = beat.metricsPhaseIndex ?? beat.phaseIndex;
  const phase = phases[metricsPhaseIndex];

  const isWalking = beat.type === 'walk' && isScrolling;
  const isDialogue = beat.type === 'dialogue';

  // Target background offsets that center each phase's infrastructure in the viewport.
  // Infrastructure x-positions from PhaseBackground: Diesel=200, PowerCreek=900, Humpback=1700,
  // Battery=2500, GreenSPARC=3300, RatePressures=4000, HumpbackUpgrade=4700, FutureReservoir=5500
  const SCENE_WIDTH = 6400;
  const VIEW_W = 800;
  const maxOffset = SCENE_WIDTH - VIEW_W;
  const phaseTargetOffsets = [
    Math.max(0, 260 - VIEW_W * 0.3),    // Phase 0: Diesel Plant
    Math.max(0, 960 - VIEW_W * 0.3),    // Phase 1: Power Creek
    Math.max(0, 1750 - VIEW_W * 0.3),   // Phase 2: Humpback Creek
    Math.max(0, 2540 - VIEW_W * 0.3),   // Phase 3: Battery Storage
    Math.max(0, 3350 - VIEW_W * 0.3),   // Phase 4: GreenSPARC
    Math.max(0, 4050 - VIEW_W * 0.3),   // Phase 5: Rate Pressures
    Math.max(0, 4750 - VIEW_W * 0.3),   // Phase 6: Humpback Upgrade
    Math.min(maxOffset, 5550 - VIEW_W * 0.3), // Phase 7: Future Reservoir
  ];

  // Compute background offset: interpolate between phase targets during walk beats, hold during dialogue.
  const backgroundProgress = useMemo(() => {
    const bgPhaseIndex = beat.phaseIndex;
    const targetOffset = phaseTargetOffsets[bgPhaseIndex];

    // Find previous phase target for interpolation during walk beats
    if (beat.type === 'walk') {
      const prevPhaseIndex = Math.max(0, bgPhaseIndex - 1);
      const prevOffset = phaseTargetOffsets[prevPhaseIndex];
      // Get progress within current beat
      const beatFraction = Math.max(0, Math.min(1, (scrollProgress * totalBeats) - currentBeatIndex));

      // If this walk's metricsPhaseIndex differs from phaseIndex, we're transitioning — interpolate
      if (beat.metricsPhaseIndex !== undefined && beat.metricsPhaseIndex < bgPhaseIndex) {
        return (prevOffset + (targetOffset - prevOffset) * beatFraction) / maxOffset;
      }
      // Otherwise hold at target
      return targetOffset / maxOffset;
    }

    // During dialogue, hold at phase target
    return targetOffset / maxOffset;
  }, [currentBeatIndex, scrollProgress, totalBeats, beat]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      if (scrollHeight <= 0) return;

      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
      const index = Math.min(Math.floor(progress * totalBeats), totalBeats - 1);
      setCurrentBeatIndex(index);

      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => setIsScrolling(false), 200);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [totalBeats]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-y-scroll" style={{ scrollBehavior: 'smooth' }}>
      {/* Scroll space */}
      <div style={{ height: `${totalBeats * 100}vh` }} />

      {/* Fixed viewport overlay */}
      <div className="fixed inset-0 overflow-hidden select-none pointer-events-none">
        {/* Background */}
        <PhaseBackground scrollProgress={backgroundProgress} isWalking={isWalking} />

        {/* Stats HUD */}
        <MetricsBanner
          currentPhaseIndex={metricsPhaseIndex}
          phaseTitle={phase.title}
          phaseSubtitle={phase.subtitle}
        />

        {/* Characters area */}
        <div className="absolute bottom-[18%] left-1/2 z-10 flex items-end gap-6"
          style={{ transform: 'translateX(-50%)' }}>
          {/* Walking man */}
          <WalkingMan isWalking={isWalking} />

          {/* NPC */}
          {beat.npc && (
            <NPCCharacter type={beat.npc} visible={isDialogue} />
          )}
        </div>

        {isWalking && <DustParticles />}

        {/* Dialogue box */}
        {isDialogue && beat.speaker && beat.text && (
          <div className="absolute bottom-[38%] left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg">
            <div
              className="rounded-xl px-5 py-4 border"
              style={{
                backgroundColor: 'hsla(220, 20%, 10%, 0.92)',
                borderColor: 'hsl(var(--border))',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="text-xs uppercase tracking-wider mb-1.5 font-bold"
                style={{ color: 'hsl(var(--primary))' }}
              >
                {beat.speaker}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
                {beat.text}
              </p>
              <div className="text-right mt-2 text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                ↓ Scroll to continue
              </div>
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {phases.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === metricsPhaseIndex ? 'hsl(var(--primary))' : 'hsla(var(--foreground), 0.3)',
                transform: i === metricsPhaseIndex ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {currentBeatIndex === 0 && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 text-xs animate-pulse"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            ↓ Scroll to explore the story ↓
          </div>
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, hsl(220, 20%, 8%) 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default WalkingScene;

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

  // Compute background progress that only moves during walk beats.
  // We assign scroll "weight" to each beat: walk beats move the bg, dialogue beats don't.
  const backgroundProgress = useMemo(() => {
    // Build cumulative weights: walk = 1, dialogue = 0
    const weights = storyBeats.map(b => b.type === 'walk' ? 1 : 0);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    if (totalWeight === 0) return 0;

    // Sum weights up to current beat index
    const weightBefore = weights.slice(0, currentBeatIndex).reduce((a, b) => a + b, 0);
    // Add partial progress within current beat if it's a walk beat
    const currentWeight = weights[currentBeatIndex];
    const beatFraction = (scrollProgress * totalBeats) - currentBeatIndex;
    const accumulated = weightBefore + (currentWeight * Math.max(0, Math.min(1, beatFraction)));

    return accumulated / totalWeight;
  }, [currentBeatIndex, scrollProgress, totalBeats]);

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

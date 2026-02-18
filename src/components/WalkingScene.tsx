import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { phases } from '@/data/phases';
import { storyBeats, type NPCType } from '@/data/storyBeats';
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

  // Collect all unique NPCs in the current phase's dialogue group
  const phaseNPCs = useMemo(() => {
    const phase = beat.phaseIndex;
    const npcs: NPCType[] = [];
    const seen = new Set<NPCType>();
    for (const b of storyBeats) {
      if (b.phaseIndex === phase && b.type === 'dialogue' && b.npc && !seen.has(b.npc)) {
        seen.add(b.npc);
        npcs.push(b.npc);
      }
    }
    return npcs;
  }, [beat.phaseIndex]);

  // Background pans evenly across all walk beats; holds during dialogue.
  const backgroundProgress = useMemo(() => {
    const walkIndices = storyBeats.map((b, i) => b.type === 'walk' ? i : -1).filter(i => i >= 0);
    const totalWalks = walkIndices.length;
    if (totalWalks === 0) return 0;

    // How many walk beats are fully completed before current beat?
    const completedWalks = walkIndices.filter(i => i < currentBeatIndex).length;

    // If current beat is a walk, add fractional progress within it
    const isCurrentWalk = beat.type === 'walk';
    const beatFraction = isCurrentWalk
      ? Math.max(0, Math.min(1, (scrollProgress * totalBeats) - currentBeatIndex))
      : 0;

    return (completedWalks + beatFraction) / totalWalks;
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

          {/* NPCs — show all characters from current phase dialogue group */}
          {phaseNPCs.map((npcType) => (
            <NPCCharacter key={npcType} type={npcType} visible={isDialogue} />
          ))}
        </div>

        {isWalking && <DustParticles />}

        {/* Dialogue box */}
        {isDialogue && beat.speaker && beat.text && (() => {
          // Calculate where the speaking NPC is relative to the character group center
          const speakerNpcIndex = beat.npc ? phaseNPCs.indexOf(beat.npc) : 0;
          const walkingManWidth = 38;
          const npcWidth = 65;
          const gap = 24;
          // Total group width: walkingMan + gap + (npcCount * npcWidth) + ((npcCount-1) * gap)
          const npcCount = phaseNPCs.length;
          const totalWidth = walkingManWidth + gap + (npcCount * npcWidth) + (Math.max(0, npcCount - 1) * gap);
          const groupCenter = totalWidth / 2;
          // NPC center position within the group
          const npcCenterX = walkingManWidth + gap + (speakerNpcIndex * (npcWidth + gap)) + npcWidth / 2;
          const tailOffset = npcCenterX - groupCenter;

          return (
            <div className="absolute bottom-[calc(32%+22px)] left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg">
              <div
                className="rounded-xl px-5 py-4 border relative"
                style={{
                  backgroundColor: 'hsla(220, 20%, 10%, 0.92)',
                  borderColor: 'hsl(var(--border))',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Speech bubble tail */}
                <div
                  className="absolute -bottom-3"
                  style={{
                    left: `calc(50% + ${tailOffset}px)`,
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '14px solid hsla(220, 20%, 10%, 0.92)',
                  }}
                />
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
          );
        })()}

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

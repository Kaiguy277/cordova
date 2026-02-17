import type { NPCType } from '@/data/storyBeats';

const npcConfig: Record<NPCType, {
  hat: string | null;
  hatStyle?: 'hardhat' | 'rainhat' | 'beanie' | 'fedora';
  body: string;
  accent: string;
  pants: string;
  accessory?: 'clipboard' | 'fish' | 'laptop' | 'briefcase';
}> = {
  fisherman: {
    hat: 'hsl(35, 70%, 40%)',
    hatStyle: 'rainhat',
    body: 'hsl(25, 65%, 50%)',
    accent: 'hsl(25, 55%, 40%)',
    pants: 'hsl(220, 20%, 30%)',
    accessory: 'fish',
  },
  'cec-worker': {
    hat: 'hsl(45, 90%, 50%)',
    hatStyle: 'hardhat',
    body: 'hsl(210, 50%, 40%)',
    accent: 'hsl(45, 80%, 55%)',
    pants: 'hsl(220, 30%, 25%)',
  },
  engineer: {
    hat: 'hsl(0, 0%, 88%)',
    hatStyle: 'hardhat',
    body: 'hsl(220, 15%, 40%)',
    accent: 'hsl(0, 0%, 75%)',
    pants: 'hsl(220, 20%, 25%)',
    accessory: 'clipboard',
  },
  'tech-worker': {
    hat: null,
    hatStyle: 'beanie',
    body: 'hsl(260, 25%, 38%)',
    accent: 'hsl(260, 20%, 50%)',
    pants: 'hsl(220, 25%, 22%)',
    accessory: 'laptop',
  },
  'board-member': {
    hat: null,
    hatStyle: 'fedora',
    body: 'hsl(220, 25%, 30%)',
    accent: 'hsl(0, 60%, 45%)',
    pants: 'hsl(220, 20%, 20%)',
    accessory: 'briefcase',
  },
};

interface NPCCharacterProps {
  type: NPCType;
  visible: boolean;
}

const NPCCharacter = ({ type, visible }: NPCCharacterProps) => {
  const cfg = npcConfig[type];

  return (
    <div
      className="relative transition-all duration-500 ease-out"
      style={{
        width: 65,
        height: 125,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.8)',
      }}
    >
      {/* Head */}
      <div
        className="absolute rounded-full"
        style={{
          width: 20, height: 20, top: 16, left: 19,
          backgroundColor: 'hsl(30, 35%, 40%)',
          zIndex: 1,
        }}
      />

      {/* Hat */}
      {cfg.hat && cfg.hatStyle === 'hardhat' && (
        <>
          <div className="absolute" style={{
            width: 28, height: 14, top: 5, left: 15,
            backgroundColor: cfg.hat,
            borderRadius: '10px 10px 3px 3px',
            zIndex: 2,
          }} />
          <div className="absolute" style={{
            width: 34, height: 5, top: 18, left: 12,
            backgroundColor: cfg.hat,
            borderRadius: 2,
            zIndex: 2,
            filter: 'brightness(0.9)',
          }} />
        </>
      )}
      {cfg.hat && cfg.hatStyle === 'rainhat' && (
        <div className="absolute" style={{
          width: 32, height: 12, top: 8, left: 13,
          backgroundColor: cfg.hat,
          borderRadius: '14px 14px 6px 6px',
          zIndex: 2,
        }} />
      )}
      {!cfg.hat && (
        <div className="absolute" style={{
          width: 22, height: 10, top: 10, left: 18,
          backgroundColor: 'hsl(25, 30%, 25%)',
          borderRadius: '8px 8px 0 0',
          zIndex: 2,
        }} />
      )}

      {/* Body */}
      <div className="absolute" style={{
        width: 22, height: 34, top: 34, left: 18,
        backgroundColor: cfg.body,
        borderRadius: 4,
      }} />

      {/* Accent stripe / tie */}
      <div className="absolute" style={{
        width: 22, height: 4, top: 46, left: 18,
        backgroundColor: cfg.accent,
      }} />

      {/* Left arm */}
      <div className="absolute" style={{
        width: 6, height: 26, top: 36, left: 10,
        backgroundColor: 'hsl(30, 35%, 40%)',
        borderRadius: 3,
        transform: 'rotate(8deg)',
        transformOrigin: 'top',
      }} />

      {/* Right arm */}
      <div className="absolute" style={{
        width: 6, height: 26, top: 36, left: 42,
        backgroundColor: 'hsl(30, 35%, 40%)',
        borderRadius: 3,
        transform: 'rotate(-8deg)',
        transformOrigin: 'top',
      }} />

      {/* Accessory in right hand */}
      {cfg.accessory === 'fish' && (
        <div className="absolute" style={{
          width: 16, height: 8, top: 60, left: 42,
          backgroundColor: 'hsl(200, 30%, 55%)',
          borderRadius: '8px 4px 4px 8px',
          transform: 'rotate(-15deg)',
        }} />
      )}
      {cfg.accessory === 'clipboard' && (
        <div className="absolute" style={{
          width: 10, height: 14, top: 56, left: 44,
          backgroundColor: 'hsl(30, 40%, 60%)',
          borderRadius: 2,
          border: '1px solid hsl(30, 30%, 40%)',
        }} />
      )}
      {cfg.accessory === 'laptop' && (
        <div className="absolute" style={{
          width: 14, height: 9, top: 58, left: 42,
          backgroundColor: 'hsl(220, 10%, 30%)',
          borderRadius: '2px 2px 0 0',
          borderBottom: '2px solid hsl(220, 10%, 25%)',
        }} />
      )}
      {cfg.accessory === 'briefcase' && (
        <div className="absolute" style={{
          width: 12, height: 10, top: 60, left: 44,
          backgroundColor: 'hsl(25, 40%, 30%)',
          borderRadius: 2,
        }} />
      )}

      {/* Legs */}
      <div className="absolute" style={{
        width: 8, height: 34, top: 66, left: 18,
        backgroundColor: cfg.pants,
        borderRadius: 3,
      }}>
        <div style={{
          position: 'absolute', bottom: -2, left: -1, width: 10, height: 6,
          backgroundColor: 'hsl(25, 25%, 20%)', borderRadius: '2px 2px 3px 3px',
        }} />
      </div>
      <div className="absolute" style={{
        width: 8, height: 34, top: 66, left: 32,
        backgroundColor: cfg.pants,
        borderRadius: 3,
      }}>
        <div style={{
          position: 'absolute', bottom: -2, left: -1, width: 10, height: 6,
          backgroundColor: 'hsl(25, 25%, 20%)', borderRadius: '2px 2px 3px 3px',
        }} />
      </div>
    </div>
  );
};

export default NPCCharacter;

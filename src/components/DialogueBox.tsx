import { useState } from 'react';

export interface DialogueLine {
  speaker: string;
  text: string;
}

interface DialogueBoxProps {
  lines: DialogueLine[];
  onComplete: () => void;
}

const DialogueBox = ({ lines, onComplete }: DialogueBoxProps) => {
  const [lineIndex, setLineIndex] = useState(0);

  const current = lines[lineIndex];
  const isLast = lineIndex >= lines.length - 1;

  const advance = () => {
    if (isLast) {
      onComplete();
    } else {
      setLineIndex((i) => i + 1);
    }
  };

  return (
    <div
      className="absolute bottom-[35%] left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md cursor-pointer select-none"
      onClick={advance}
    >
      <div
        className="rounded-xl px-5 py-4 border"
        style={{
          backgroundColor: 'hsla(220, 20%, 10%, 0.92)',
          borderColor: 'hsl(var(--border))',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="text-xs uppercase tracking-wider mb-1.5 font-bold" style={{ color: 'hsl(var(--primary))' }}>
          {current.speaker}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
          {current.text}
        </p>
        <div className="text-right mt-2 text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {isLast ? 'Click to continue →' : `${lineIndex + 1}/${lines.length} — Click to advance`}
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;

const WalkingMan = ({ isWalking = true }: { isWalking?: boolean }) => (
  <div className="relative" style={{ width: 70, height: 130, animation: isWalking ? 'walk-bob 0.5s ease-in-out infinite' : 'none' }}>
    {/* Head (rendered first = behind helmet) */}
    <div
      className="absolute rounded-full"
      style={{
        width: 22, height: 22, top: 14, left: 20,
        backgroundColor: 'hsl(25, 40%, 35%)',
        zIndex: 1,
      }}
    />
    {/* Hard hat dome - covers top of head */}
    <div
      className="absolute"
      style={{
        width: 30, height: 16, top: 2, left: 16,
        backgroundColor: 'hsl(45, 90%, 50%)',
        borderRadius: '12px 12px 3px 3px',
        zIndex: 2,
      }}
    />
    {/* Hard hat brim */}
    <div
      className="absolute"
      style={{
        width: 36, height: 5, top: 17, left: 13,
        backgroundColor: 'hsl(45, 85%, 45%)',
        borderRadius: 2,
        zIndex: 2,
      }}
    />
    {/* Body / vest */}
    <div
      className="absolute"
      style={{
        width: 20, height: 36, top: 34, left: 21,
        backgroundColor: 'hsl(30, 70%, 45%)',
        borderRadius: 4,
      }}
    />
    {/* Hi-vis vest stripes */}
    <div className="absolute" style={{ width: 20, height: 4, top: 46, left: 21, backgroundColor: 'hsl(45, 90%, 55%)' }} />
    <div className="absolute" style={{ width: 20, height: 4, top: 54, left: 21, backgroundColor: 'hsl(45, 90%, 55%)' }} />
    {/* Left Arm */}
    <div className="absolute origin-top" style={{
      width: 6, height: 28, top: 36, left: 13, backgroundColor: 'hsl(25, 40%, 35%)',
      borderRadius: 3, animation: isWalking ? 'arm-left 0.5s ease-in-out infinite' : 'none',
    }} />
    {/* Right Arm */}
    <div className="absolute origin-top" style={{
      width: 6, height: 28, top: 36, left: 43, backgroundColor: 'hsl(25, 40%, 35%)',
      borderRadius: 3, animation: isWalking ? 'arm-right 0.5s ease-in-out infinite' : 'none',
    }} />
    {/* Tool belt */}
    <div className="absolute" style={{
      width: 24, height: 5, top: 68, left: 19, backgroundColor: 'hsl(30, 30%, 25%)', borderRadius: 2,
    }} />
    {/* Left Leg with boot */}
    <div className="absolute origin-top" style={{
      width: 8, height: 38, top: 70, left: 21, backgroundColor: 'hsl(220, 30%, 25%)',
      borderRadius: 3, animation: isWalking ? 'leg-left 0.5s ease-in-out infinite' : 'none',
    }}>
      <div style={{
        position: 'absolute', bottom: -2, left: -2, width: 12, height: 7,
        backgroundColor: 'hsl(25, 30%, 20%)', borderRadius: '2px 2px 3px 3px',
      }} />
    </div>
    {/* Right Leg with boot */}
    <div className="absolute origin-top" style={{
      width: 8, height: 38, top: 70, left: 33, backgroundColor: 'hsl(220, 30%, 25%)',
      borderRadius: 3, animation: isWalking ? 'leg-right 0.5s ease-in-out infinite' : 'none',
    }}>
      <div style={{
        position: 'absolute', bottom: -2, left: -2, width: 12, height: 7,
        backgroundColor: 'hsl(25, 30%, 20%)', borderRadius: '2px 2px 3px 3px',
      }} />
    </div>
  </div>
);

export default WalkingMan;

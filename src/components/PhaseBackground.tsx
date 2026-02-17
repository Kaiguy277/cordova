/**
 * A continuous linear landscape the character walks through.
 * Infrastructure is placed at sequential x-positions matching each era.
 * The viewport pans via `scrollProgress` (0 → 1).
 */

const SCENE_WIDTH = 6400;
const VIEW_W = 800; // logical viewport width

/* ─── Era infrastructure segments ─── */

const DieselPlant = () => (
  <g transform="translate(200, 0)">
    {/* Main building */}
    <rect x={0} y={220} width={120} height={80} fill="hsl(220, 10%, 25%)" />
    <rect x={10} y={200} width={100} height={20} fill="hsl(220, 10%, 30%)" />
    {/* Smokestacks */}
    <rect x={30} y={140} width={15} height={80} fill="hsl(0, 0%, 30%)" />
    <rect x={70} y={150} width={15} height={70} fill="hsl(0, 0%, 28%)" />
    {/* Smoke */}
    <ellipse cx={37} cy={130} rx={20} ry={10} fill="hsl(0, 0%, 40%)" opacity={0.5} />
    <ellipse cx={45} cy={115} rx={15} ry={8} fill="hsl(0, 0%, 45%)" opacity={0.3} />
    <ellipse cx={77} cy={140} rx={18} ry={9} fill="hsl(0, 0%, 42%)" opacity={0.4} />
    {/* Fuel tanks */}
    <ellipse cx={180} cy={275} rx={25} ry={25} fill="hsl(0, 0%, 22%)" />
    <ellipse cx={240} cy={280} rx={20} ry={20} fill="hsl(0, 0%, 20%)" />
    {/* Windows */}
    <rect x={20} y={240} width={12} height={12} fill="hsl(40, 80%, 55%)" opacity={0.6} />
    <rect x={45} y={240} width={12} height={12} fill="hsl(40, 80%, 55%)" opacity={0.6} />
    <rect x={70} y={240} width={12} height={12} fill="hsl(40, 80%, 55%)" opacity={0.6} />
    {/* Diesel barrels */}
    {[300, 325, 350].map((x, i) => (
      <g key={`barrel-${i}`}>
        <rect x={x} y={272} width={16} height={28} fill="hsl(0, 50%, 30%)" rx={3} />
        <rect x={x + 2} y={283} width={12} height={3} fill="hsl(0, 40%, 40%)" />
      </g>
    ))}
    {/* Label */}
    <text x={60} y={195} textAnchor="middle" fontSize={8} fill="hsl(40, 60%, 50%)" fontFamily="monospace">DIESEL PLANT</text>
  </g>
);

const PowerCreekDam = () => (
  <g transform="translate(900, 0)">
    {/* Dam structure — run-of-river */}
    <polygon points="0,300 25,180 85,180 110,300" fill="hsl(200, 10%, 40%)" />
    <rect x={30} y={175} width={50} height={8} fill="hsl(200, 10%, 45%)" />
    {/* Water behind dam */}
    <rect x={-80} y={190} width={100} height={110} fill="hsl(200, 50%, 35%)" opacity={0.6} />
    {/* Water flow */}
    <path d="M45,300 Q55,275 50,255 Q60,245 55,235" fill="none" stroke="hsl(200, 60%, 60%)" strokeWidth={3} opacity={0.5} />
    <path d="M60,300 Q65,280 62,265" fill="none" stroke="hsl(200, 60%, 60%)" strokeWidth={2} opacity={0.4} />
    {/* Powerhouse */}
    <rect x={35} y={270} width={45} height={30} fill="hsl(200, 10%, 35%)" />
    <rect x={43} y={278} width={8} height={8} fill="hsl(40, 70%, 60%)" opacity={0.5} />
    {/* Intake pipe */}
    <line x1={55} y1={180} x2={55} y2={270} stroke="hsl(200, 15%, 30%)" strokeWidth={4} />
    {/* Power lines leading away */}
    {[140, 200, 260].map((x, i) => (
      <g key={`pole-pc-${i}`}>
        <rect x={x} y={230} width={3} height={70} fill="hsl(30, 20%, 25%)" />
        <line x1={x - 8} y1={232} x2={x + 11} y2={232} stroke="hsl(30, 20%, 25%)" strokeWidth={2} />
        <line x1={x + 1} y1={232} x2={x + 61} y2={232} stroke="hsl(0, 0%, 20%)" strokeWidth={0.8} />
      </g>
    ))}
    {/* Label */}
    <text x={55} y={170} textAnchor="middle" fontSize={7} fill="hsl(200, 50%, 60%)" fontFamily="monospace">POWER CREEK 6MW</text>
  </g>
);

const HumpbackCreek = () => (
  <g transform="translate(1700, 0)">
    {/* Smaller dam */}
    <polygon points="0,300 18,210 65,210 83,300" fill="hsl(200, 12%, 38%)" />
    {/* Three turbine housings */}
    {[10, 35, 60].map((x, i) => (
      <g key={`turbine-${i}`}>
        <rect x={x} y={275} width={14} height={25} fill="hsl(200, 10%, 30%)" rx={2} />
        <circle cx={x + 7} cy={283} r={3} fill="hsl(200, 40%, 50%)" opacity={0.6} />
      </g>
    ))}
    {/* Creek water */}
    <path d="M-60,250 Q-30,245 0,250 Q20,255 40,250" fill="none" stroke="hsl(200, 50%, 45%)" strokeWidth={2} opacity={0.5} />
    <rect x={-70} y={250} width={70} height={50} fill="hsl(200, 45%, 35%)" opacity={0.4} />
    {/* Power lines */}
    {[110, 170, 230].map((x, i) => (
      <g key={`pole-hb-${i}`}>
        <rect x={x} y={235} width={3} height={65} fill="hsl(30, 20%, 25%)" />
        <line x1={x - 8} y1={237} x2={x + 11} y2={237} stroke="hsl(30, 20%, 25%)" strokeWidth={2} />
        <line x1={x + 1} y1={237} x2={x + 61} y2={237} stroke="hsl(0, 0%, 20%)" strokeWidth={0.8} />
      </g>
    ))}
    {/* Label */}
    <text x={42} y={203} textAnchor="middle" fontSize={7} fill="hsl(200, 50%, 60%)" fontFamily="monospace">HUMPBACK 1.25MW</text>
  </g>
);

const BatteryStorage = () => (
  <g transform="translate(2500, 0)">
    {/* Battery container */}
    <rect x={0} y={250} width={80} height={50} fill="hsl(150, 30%, 28%)" rx={4} />
    {[8, 28, 48].map((x, i) => (
      <g key={`cell-${i}`}>
        <rect x={x} y={258} width={16} height={34} fill="hsl(120, 50%, 38%)" rx={2} />
        <circle cx={x + 8} cy={265} r={2.5} fill="hsl(120, 80%, 55%)" />
        <circle cx={x + 8} cy={275} r={2} fill="hsl(120, 70%, 50%)" />
      </g>
    ))}
    <text x={40} y={245} textAnchor="middle" fontSize={7} fill="hsl(120, 50%, 55%)" fontFamily="monospace">BESS</text>
    {/* Underground cables (dashed) */}
    <line x1={80} y1={290} x2={200} y2={290} stroke="hsl(120, 30%, 40%)" strokeWidth={2} strokeDasharray="6,4" opacity={0.5} />
    {/* Buried-cable markers */}
    {[110, 150, 190].map((x, i) => (
      <g key={`marker-${i}`}>
        <rect x={x - 3} y={285} width={6} height={10} fill="hsl(40, 60%, 50%)" rx={1} />
      </g>
    ))}
  </g>
);

const GreenSPARCDataCenter = () => (
  <g transform="translate(3300, 0)">
    {/* Container building */}
    <rect x={0} y={238} width={100} height={62} fill="hsl(200, 15%, 26%)" rx={3} />
    {/* Server racks */}
    {[12, 32, 52, 72].map((x, i) => (
      <g key={`rack-${i}`}>
        <rect x={x} y={248} width={12} height={42} fill="hsl(210, 20%, 18%)" rx={1} />
        <circle cx={x + 6} cy={256} r={1.8} fill="hsl(120, 70%, 50%)" />
        <circle cx={x + 6} cy={264} r={1.8} fill="hsl(120, 70%, 50%)" />
        <circle cx={x + 6} cy={272} r={1.8} fill="hsl(200, 70%, 50%)" />
        <circle cx={x + 6} cy={280} r={1.5} fill="hsl(200, 60%, 45%)" />
      </g>
    ))}
    {/* Rooftop HVAC / cooling */}
    <rect x={15} y={228} width={22} height={12} fill="hsl(200, 10%, 35%)" rx={2} />
    <rect x={60} y={230} width={18} height={10} fill="hsl(200, 10%, 35%)" rx={2} />
    {/* Solar panels on roof */}
    {[10, 35, 60, 82].map((x, i) => (
      <rect key={`solar-${i}`} x={x} y={234} width={14} height={4} fill="hsl(220, 40%, 35%)" rx={1} opacity={0.7} />
    ))}
    <text x={50} y={222} textAnchor="middle" fontSize={7} fill="hsl(120, 50%, 55%)" fontFamily="monospace">GreenSPARC 150kW</text>
  </g>
);

const RatePressuresSign = () => (
  <g transform="translate(4000, 0)">
    {/* CEC office building */}
    <rect x={0} y={245} width={70} height={55} fill="hsl(210, 12%, 30%)" rx={2} />
    <rect x={10} y={255} width={10} height={10} fill="hsl(40, 60%, 55%)" opacity={0.5} />
    <rect x={30} y={255} width={10} height={10} fill="hsl(40, 60%, 55%)" opacity={0.5} />
    <rect x={50} y={255} width={10} height={10} fill="hsl(40, 60%, 55%)" opacity={0.5} />
    {/* Notice board */}
    <rect x={100} y={252} width={50} height={35} fill="hsl(40, 30%, 80%)" rx={2} />
    <text x={125} y={268} textAnchor="middle" fontSize={5} fill="hsl(0, 50%, 40%)" fontFamily="monospace">RATE INCREASE</text>
    <text x={125} y={277} textAnchor="middle" fontSize={4} fill="hsl(0, 40%, 35%)" fontFamily="monospace">+15% APR 2025</text>
    {/* Post */}
    <rect x={123} y={287} width={4} height={13} fill="hsl(30, 20%, 25%)" />
    <text x={35} y={240} textAnchor="middle" fontSize={7} fill="hsl(210, 30%, 50%)" fontFamily="monospace">CEC OFFICE</text>
  </g>
);

const HumpbackUpgrade = () => (
  <g transform="translate(4700, 0)">
    {/* Upgraded dam — larger */}
    <polygon points="0,300 25,195 90,195 115,300" fill="hsl(200, 15%, 42%)" />
    <rect x={28} y={190} width={60} height={8} fill="hsl(200, 15%, 48%)" />
    {/* New turbines (highlighted) */}
    {[15, 42, 70].map((x, i) => (
      <g key={`new-turbine-${i}`}>
        <rect x={x} y={270} width={18} height={30} fill="hsl(180, 25%, 35%)" rx={2} />
        <circle cx={x + 9} cy={280} r={4} fill="hsl(180, 50%, 55%)" opacity={0.7} />
        <text x={x + 9} y={285} textAnchor="middle" fontSize={4} fill="hsl(180, 80%, 70%)" fontFamily="monospace">NEW</text>
      </g>
    ))}
    {/* Construction crane */}
    <rect x={130} y={170} width={4} height={130} fill="hsl(40, 50%, 40%)" />
    <line x1={130} y1={172} x2={190} y2={172} stroke="hsl(40, 50%, 40%)" strokeWidth={3} />
    <line x1={188} y1={172} x2={188} y2={210} stroke="hsl(0, 0%, 30%)" strokeWidth={1} />
    <text x={58} y={183} textAnchor="middle" fontSize={7} fill="hsl(180, 50%, 60%)" fontFamily="monospace">HUMPBACK UPGRADE</text>
  </g>
);

const FutureReservoir = () => (
  <g transform="translate(5500, 0)">
    {/* Large reservoir */}
    <ellipse cx={100} cy={260} rx={120} ry={30} fill="hsl(200, 50%, 40%)" opacity={0.5} />
    <ellipse cx={100} cy={260} rx={100} ry={22} fill="hsl(200, 55%, 45%)" opacity={0.6} />
    {/* Dam wall */}
    <polygon points="180,300 200,210 240,210 260,300" fill="hsl(200, 12%, 45%)" />
    <rect x={203} y={205} width={34} height={8} fill="hsl(200, 12%, 50%)" />
    {/* Powerhouse */}
    <rect x={210} y={270} width={30} height={30} fill="hsl(200, 10%, 38%)" rx={2} />
    {/* Green energy symbol */}
    <circle cx={100} cy={220} r={15} fill="hsl(120, 40%, 35%)" opacity={0.4} />
    <text x={100} y={224} textAnchor="middle" fontSize={12} fill="hsl(120, 60%, 55%)">⚡</text>
    <text x={100} y={210} textAnchor="middle" fontSize={7} fill="hsl(120, 50%, 55%)" fontFamily="monospace">95%+ RENEWABLE</text>
    {/* Wind turbines (future vision) */}
    {[320, 380].map((x, i) => (
      <g key={`wind-${i}`}>
        <rect x={x} y={210} width={3} height={90} fill="hsl(0, 0%, 60%)" />
        <circle cx={x + 1} cy={210} r={3} fill="hsl(0, 0%, 65%)" />
        <line x1={x + 1} y1={210} x2={x - 18} y2={195} stroke="hsl(0, 0%, 70%)" strokeWidth={2} />
        <line x1={x + 1} y1={210} x2={x + 20} y2={200} stroke="hsl(0, 0%, 70%)" strokeWidth={2} />
        <line x1={x + 1} y1={210} x2={x + 5} y2={230} stroke="hsl(0, 0%, 70%)" strokeWidth={2} />
      </g>
    ))}
  </g>
);

/* ─── Fishing village scattered throughout ─── */
const VillageHouses = () => {
  const houses = [
    { x: 550, w: 35, h: 40, color: 'hsl(10, 50%, 45%)', roofColor: 'hsl(20, 40%, 30%)' },
    { x: 1350, w: 40, h: 42, color: 'hsl(40, 45%, 55%)', roofColor: 'hsl(25, 35%, 35%)' },
    { x: 1500, w: 32, h: 36, color: 'hsl(200, 30%, 55%)', roofColor: 'hsl(210, 25%, 30%)' },
    { x: 2150, w: 38, h: 44, color: 'hsl(5, 45%, 48%)', roofColor: 'hsl(10, 35%, 28%)' },
    { x: 2300, w: 34, h: 38, color: 'hsl(30, 40%, 50%)', roofColor: 'hsl(20, 30%, 30%)' },
    { x: 3100, w: 36, h: 40, color: 'hsl(10, 50%, 45%)', roofColor: 'hsl(20, 40%, 30%)' },
    { x: 3700, w: 40, h: 42, color: 'hsl(200, 30%, 55%)', roofColor: 'hsl(210, 25%, 30%)' },
    { x: 4400, w: 35, h: 38, color: 'hsl(40, 45%, 55%)', roofColor: 'hsl(25, 35%, 35%)' },
    { x: 5100, w: 38, h: 44, color: 'hsl(5, 45%, 48%)', roofColor: 'hsl(10, 35%, 28%)' },
    { x: 5900, w: 36, h: 40, color: 'hsl(30, 40%, 50%)', roofColor: 'hsl(20, 30%, 30%)' },
  ];

  return (
    <g>
      {houses.map((h, i) => (
        <g key={`house-${i}`}>
          <rect x={h.x} y={300 - h.h} width={h.w} height={h.h} fill={h.color} />
          <polygon
            points={`${h.x - 3},${300 - h.h} ${h.x + h.w / 2},${300 - h.h - 14} ${h.x + h.w + 3},${300 - h.h}`}
            fill={h.roofColor}
          />
          <rect x={h.x + h.w / 2 - 4} y={300 - 14} width={8} height={14} fill="hsl(25, 30%, 22%)" rx={1} />
          <rect x={h.x + 5} y={300 - h.h + 8} width={7} height={7} fill="hsl(45, 60%, 65%)" rx={1} opacity={0.6} />
        </g>
      ))}
    </g>
  );
};

/* Boats near the harbor areas */
const Boats = () => (
  <g>
    {[480, 1420, 2200, 3650, 5050].map((x, i) => (
      <g key={`boat-${i}`} transform={`translate(${x}, 270)`}>
        <path d="M0,10 Q4,0 16,0 Q28,0 32,10 Q16,13 0,10Z" fill="hsl(25, 40%, 35%)" />
        <line x1={16} y1={0} x2={16} y2={-14} stroke="hsl(30, 20%, 30%)" strokeWidth={1.2} />
      </g>
    ))}
  </g>
);

/* Water patches */
const WaterPatches = () => (
  <g>
    {[430, 1380, 2160, 3600, 5000].map((x, i) => (
      <rect key={`water-${i}`} x={x} y={280} width={120} height={20} fill="hsl(200, 40%, 25%)" opacity={0.4} rx={2} />
    ))}
  </g>
);

/* ─── Sky gradient that shifts subtly across the journey ─── */
const SkyGradient = () => (
  <defs>
    <linearGradient id="journey-sky" x1="0" y1="0" x2="1" y2="0">
      {/* Diesel era — dark, smoggy */}
      <stop offset="0%" stopColor="hsl(220, 15%, 22%)" />
      <stop offset="10%" stopColor="hsl(215, 18%, 28%)" />
      {/* Hydro transition — brightening */}
      <stop offset="25%" stopColor="hsl(210, 25%, 38%)" />
      <stop offset="40%" stopColor="hsl(210, 30%, 42%)" />
      {/* Battery / modern — clearer */}
      <stop offset="55%" stopColor="hsl(210, 35%, 45%)" />
      {/* GreenSPARC — bright */}
      <stop offset="70%" stopColor="hsl(210, 38%, 48%)" />
      {/* Future — optimistic */}
      <stop offset="90%" stopColor="hsl(205, 42%, 52%)" />
      <stop offset="100%" stopColor="hsl(200, 45%, 55%)" />
    </linearGradient>
    <linearGradient id="sky-vert" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(220, 20%, 15%)" />
      <stop offset="100%" stopColor="transparent" />
    </linearGradient>
  </defs>
);

interface PhaseBackgroundProps {
  scrollProgress: number; // 0–1
  isWalking?: boolean;
}

const PhaseBackground = ({ scrollProgress, isWalking = false }: PhaseBackgroundProps) => {
  // How far to pan: character is always centered, background slides left
  const maxOffset = SCENE_WIDTH - VIEW_W;
  const offset = scrollProgress * maxOffset;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute bottom-0"
        style={{
          width: '100%',
          height: '100%',
        }}
        viewBox={`${offset} 0 ${VIEW_W} 400`}
        preserveAspectRatio="xMidYMax slice"
      >
        <SkyGradient />
        {/* Sky background */}
        <rect width={SCENE_WIDTH} height={400} fill="url(#journey-sky)" />
        <rect width={SCENE_WIDTH} height={200} fill="url(#sky-vert)" opacity={0.4} />

        {/* Clouds spread across the journey */}
        {[80, 300, 600, 950, 1300, 1700, 2100, 2600, 3100, 3500, 4000, 4500, 5000, 5500, 6000].map((cx, i) => (
          <ellipse
            key={`cloud-${i}`}
            cx={cx}
            cy={40 + (i % 4) * 18}
            rx={30 + (i % 3) * 12}
            ry={8 + (i % 2) * 4}
            fill="hsl(0, 0%, 85%)"
            opacity={0.15 + (cx / SCENE_WIDTH) * 0.25}
          />
        ))}

        {/* Rolling hills */}
        <path
          d={`M0,270 Q100,240 200,260 Q400,230 600,255 Q800,235 1000,260 Q1200,230 1400,255 Q1600,240 1800,258 Q2000,228 2200,255 Q2400,235 2600,258 Q2800,240 3000,260 Q3200,230 3400,255 Q3600,238 3800,258 Q4000,230 4200,255 Q4400,240 4600,260 Q4800,228 5000,255 Q5200,238 5400,258 Q5600,230 5800,255 Q6000,240 6200,260 L${SCENE_WIDTH},260 L${SCENE_WIDTH},300 L0,300Z`}
          fill="hsl(150, 20%, 28%)"
          opacity={0.4}
        />

        {/* Trees scattered along */}
        {[50, 160, 650, 750, 1250, 1600, 2050, 2400, 2900, 3050, 3500, 3850, 4300, 4550, 4950, 5300, 5700, 6100].map((x, i) => (
          <g key={`tree-${i}`}>
            <rect x={x} y={268} width={4} height={32} fill="hsl(25, 30%, 22%)" />
            <ellipse cx={x + 2} cy={260} rx={12 + (i % 3) * 4} ry={14 + (i % 2) * 4} fill={`hsl(${140 + (i % 3) * 10}, ${20 + (i % 2) * 10}%, ${22 + (i % 4) * 3}%)`} />
          </g>
        ))}

        {/* Infrastructure elements placed at their era positions */}
        <DieselPlant />
        <PowerCreekDam />
        <HumpbackCreek />
        <BatteryStorage />
        <GreenSPARCDataCenter />
        <RatePressuresSign />
        <HumpbackUpgrade />
        <FutureReservoir />

        {/* Village elements scattered throughout */}
        <VillageHouses />
        <Boats />
        <WaterPatches />

        {/* Ground — full width */}
        <rect y={300} width={SCENE_WIDTH} height={100} fill="hsl(30, 20%, 32%)" />
        <rect y={305} width={SCENE_WIDTH} height={12} fill="hsl(35, 15%, 38%)" opacity={0.4} />

        {/* Road/path the character walks on */}
        <rect y={295} width={SCENE_WIDTH} height={5} fill="hsl(30, 15%, 28%)" />
      </svg>
    </div>
  );
};

export default PhaseBackground;

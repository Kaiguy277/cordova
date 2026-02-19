/**
 * A continuous linear landscape the character walks through.
 * Infrastructure is placed at sequential x-positions matching each era.
 * The viewport pans via `scrollProgress` (0 → 1).
 */

const SCENE_WIDTH = 6400;
const VIEW_W = 800; // logical viewport width

/* ─── Era infrastructure segments ─── */

const DieselPlant = () => (
  <g transform="translate(500, 0)">
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
  <g transform="translate(1200, 0)">
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
  <g transform="translate(1950, 0)">
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
  <g transform="translate(2650, 0)">
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
  <g transform="translate(3350, 0)">
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
  <g transform="translate(4050, 0)">
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
  <g transform="translate(4750, 0)">
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
  <g transform="translate(5450, 0)">
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

/* ─── Mountain range backdrop ─── */
const Mountains = () => {
  const peaks = [
    { x: -80, peak: 118, w: 580 }, { x: 380, peak: 88, w: 660 },
    { x: 880, peak: 104, w: 600 }, { x: 1350, peak: 92, w: 620 },
    { x: 1800, peak: 112, w: 640 }, { x: 2280, peak: 82, w: 580 },
    { x: 2700, peak: 98, w: 610 }, { x: 3150, peak: 108, w: 590 },
    { x: 3600, peak: 86, w: 630 }, { x: 4080, peak: 116, w: 600 },
    { x: 4540, peak: 94, w: 570 }, { x: 4980, peak: 102, w: 610 },
    { x: 5450, peak: 88, w: 580 }, { x: 5880, peak: 110, w: 650 },
  ];
  return (
    <g>
      {peaks.map((m, i) => (
        <g key={`mt-${i}`} opacity={0.42 + (i % 3) * 0.04}>
          <polygon
            points={`${m.x},252 ${m.x + m.w / 2},${m.peak} ${m.x + m.w},252`}
            fill={`hsl(210, ${10 + (i % 3) * 3}%, ${22 + (i % 4) * 2}%)`}
          />
          {/* Snow cap */}
          <polygon
            points={`${m.x + m.w / 2 - 28},${m.peak + 38} ${m.x + m.w / 2},${m.peak} ${m.x + m.w / 2 + 28},${m.peak + 38}`}
            fill="hsl(210, 25%, 72%)" opacity={0.35}
          />
        </g>
      ))}
    </g>
  );
};

/* ─── Lighthouse ─── */
const Lighthouse = () => (
  <g transform="translate(295, 0)">
    <ellipse cx={12} cy={299} rx={18} ry={5} fill="hsl(200, 10%, 28%)" opacity={0.7} />
    <polygon points="4,298 6,218 18,218 20,298" fill="hsl(0, 0%, 72%)" />
    <rect x={4} y={244} width={16} height={10} fill="hsl(0, 65%, 48%)" opacity={0.8} />
    <rect x={5} y={268} width={14} height={10} fill="hsl(0, 65%, 48%)" opacity={0.8} />
    <rect x={2} y={212} width={20} height={8} fill="hsl(210, 15%, 48%)" rx={1} />
    <ellipse cx={12} cy={212} rx={14} ry={5} fill="hsl(45, 90%, 62%)" opacity={0.28} />
    <line x1={0} y1={211} x2={24} y2={211} stroke="hsl(0, 0%, 52%)" strokeWidth={1} />
    <text x={12} y={208} textAnchor="middle" fontSize={5} fill="hsl(40, 50%, 55%)" fontFamily="monospace">⚓</text>
  </g>
);

/* ─── Fish cannery / processing plant ─── */
const FishCannery = () => (
  <g transform="translate(690, 0)">
    <rect x={0} y={228} width={95} height={72} fill="hsl(200, 14%, 28%)" rx={2} />
    <rect x={3} y={220} width={89} height={10} fill="hsl(200, 12%, 33%)" />
    {[6, 17, 28, 39, 50, 61, 72, 83].map((x) => (
      <line key={x} x1={x} y1={220} x2={x} y2={228} stroke="hsl(200, 10%, 25%)" strokeWidth={0.8} />
    ))}
    <rect x={72} y={182} width={10} height={40} fill="hsl(0, 0%, 30%)" />
    <ellipse cx={77} cy={180} rx={8} ry={4} fill="hsl(0, 0%, 26%)" />
    <ellipse cx={79} cy={170} rx={6} ry={5} fill="hsl(0, 0%, 42%)" opacity={0.35} />
    <ellipse cx={82} cy={158} rx={5} ry={4} fill="hsl(0, 0%, 45%)" opacity={0.22} />
    {[10, 30, 50].map((x) => (
      <rect key={x} x={x} y={243} width={13} height={10} fill="hsl(40, 65%, 52%)" opacity={0.38} rx={1} />
    ))}
    <rect x={-18} y={286} width={32} height={5} fill="hsl(30, 28%, 20%)" />
    {[-14, -6, 2, 10].map((px, pi) => (
      <rect key={pi} x={px + 18} y={289} width={3} height={11} fill="hsl(25, 22%, 16%)" />
    ))}
    <text x={45} y={215} textAnchor="middle" fontSize={6} fill="hsl(200, 38%, 52%)" fontFamily="monospace">CANNERY</text>
  </g>
);

/* ─── Fish drying racks ─── */
const DryingRacks = () => (
  <g>
    {[618, 1476, 2278, 3678, 5118].map((x, i) => (
      <g key={`rack-${i}`} transform={`translate(${x}, 0)`}>
        <line x1={0} y1={298} x2={9} y2={268} stroke="hsl(25, 28%, 23%)" strokeWidth={1.5} />
        <line x1={20} y1={298} x2={9} y2={268} stroke="hsl(25, 28%, 23%)" strokeWidth={1.5} />
        <line x1={-5} y1={278} x2={25} y2={278} stroke="hsl(25, 28%, 23%)" strokeWidth={1} />
        <line x1={-5} y1={288} x2={25} y2={288} stroke="hsl(25, 28%, 23%)" strokeWidth={1} />
        {[-3, 1, 5, 9, 13, 17].map((fx, fi) => (
          <rect key={fi} x={fx + 5} y={279} width={2} height={8} fill="hsl(195, 28%, 46%)" rx={0.5} opacity={0.8} />
        ))}
      </g>
    ))}
  </g>
);

/* ─── Seagulls in the sky ─── */
const Seagulls = () => {
  const birds = [
    130, 360, 590, 820, 1080, 1350, 1640, 1950,
    2250, 2560, 2900, 3180, 3480, 3790, 4100, 4420,
    4750, 5060, 5380, 5700, 6020,
  ];
  return (
    <g>
      {birds.map((x, i) => (
        <g key={`gull-${i}`} transform={`translate(${x}, ${48 + (i % 5) * 14})`}>
          <path d="M-5,0 Q-2,-3 0,0 Q2,-3 5,0"
            stroke="hsl(0, 0%, 78%)" strokeWidth={0.9} fill="none" opacity={0.55} />
        </g>
      ))}
    </g>
  );
};

/* ─── Fishing village scattered throughout ─── */
const VillageHouses = () => {
  const houses = [
    { x: 528, w: 38, h: 44, color: 'hsl(10, 50%, 40%)', roofColor: 'hsl(20, 40%, 27%)', chimney: true, stilts: false },
    { x: 1338, w: 42, h: 46, color: 'hsl(40, 44%, 50%)', roofColor: 'hsl(25, 35%, 30%)', chimney: true, stilts: false },
    { x: 1492, w: 34, h: 38, color: 'hsl(200, 28%, 48%)', roofColor: 'hsl(210, 24%, 27%)', chimney: false, stilts: true },
    { x: 2138, w: 40, h: 46, color: 'hsl(5, 44%, 43%)', roofColor: 'hsl(10, 34%, 25%)', chimney: true, stilts: false },
    { x: 2286, w: 36, h: 40, color: 'hsl(30, 40%, 46%)', roofColor: 'hsl(20, 30%, 27%)', chimney: false, stilts: false },
    { x: 3078, w: 38, h: 42, color: 'hsl(10, 50%, 40%)', roofColor: 'hsl(20, 40%, 27%)', chimney: true, stilts: false },
    { x: 3678, w: 42, h: 44, color: 'hsl(200, 28%, 50%)', roofColor: 'hsl(210, 24%, 27%)', chimney: true, stilts: true },
    { x: 4378, w: 36, h: 40, color: 'hsl(40, 44%, 50%)', roofColor: 'hsl(25, 35%, 30%)', chimney: false, stilts: false },
    { x: 5078, w: 40, h: 46, color: 'hsl(5, 44%, 43%)', roofColor: 'hsl(10, 34%, 25%)', chimney: true, stilts: false },
    { x: 5878, w: 38, h: 42, color: 'hsl(30, 40%, 46%)', roofColor: 'hsl(20, 30%, 27%)', chimney: false, stilts: false },
  ];

  return (
    <g>
      {houses.map((h, i) => {
        const stiltsH = h.stilts ? 9 : 0;
        const top = 300 - h.h - stiltsH;
        return (
          <g key={`house-${i}`}>
            {h.stilts && [h.x + 5, h.x + h.w - 8].map((sx, si) => (
              <rect key={si} x={sx} y={300 - stiltsH} width={3} height={stiltsH} fill="hsl(25, 24%, 18%)" />
            ))}
            <rect x={h.x} y={top} width={h.w} height={h.h} fill={h.color} />
            <polygon
              points={`${h.x - 3},${top} ${h.x + h.w / 2},${top - 15} ${h.x + h.w + 3},${top}`}
              fill={h.roofColor}
            />
            <rect x={h.x + h.w / 2 - 4} y={300 - stiltsH - 14} width={8} height={14} fill="hsl(25, 28%, 19%)" rx={1} />
            <rect x={h.x + 5} y={top + 9} width={7} height={7} fill="hsl(45, 60%, 62%)" rx={1} opacity={0.6} />
            {h.w > 36 && (
              <rect x={h.x + h.w - 13} y={top + 9} width={7} height={7} fill="hsl(45, 60%, 62%)" rx={1} opacity={0.55} />
            )}
            {h.chimney && (
              <>
                <rect x={h.x + Math.round(h.w * 0.65)} y={top - 18} width={6} height={18} fill="hsl(10, 18%, 22%)" />
                <ellipse cx={h.x + Math.round(h.w * 0.65) + 3} cy={top - 21} rx={5} ry={3} fill="hsl(0, 0%, 58%)" opacity={0.14} />
                <ellipse cx={h.x + Math.round(h.w * 0.65) + 5} cy={top - 28} rx={4} ry={2.5} fill="hsl(0, 0%, 62%)" opacity={0.09} />
              </>
            )}
          </g>
        );
      })}
    </g>
  );
};

/* ─── Fishing boats with masts and rigging ─── */
const FishingBoats = () => (
  <g>
    {[448, 1388, 2178, 3618, 5028].map((x, i) => (
      <g key={`boat-${i}`} transform={`translate(${x}, 264)`}>
        <path d="M0,13 Q5,0 21,0 Q37,0 42,13 Q21,17 0,13Z" fill="hsl(25, 38%, 28%)" />
        <rect x={11} y={-9} width={17} height={9} fill="hsl(200, 18%, 36%)" rx={1} />
        <rect x={13} y={-7} width={5} height={5} fill="hsl(40, 58%, 52%)" opacity={0.48} rx={0.5} />
        <line x1={21} y1={-9} x2={21} y2={-28} stroke="hsl(30, 18%, 26%)" strokeWidth={1.2} />
        <line x1={13} y1={-21} x2={31} y2={-21} stroke="hsl(30, 18%, 26%)" strokeWidth={0.8} />
        <line x1={21} y1={-28} x2={42} y2={-9} stroke="hsl(30, 14%, 32%)" strokeWidth={0.6} opacity={0.55} />
        <line x1={21} y1={-28} x2={4} y2={-9} stroke="hsl(30, 14%, 32%)" strokeWidth={0.6} opacity={0.45} />
        {i % 2 === 0 && (
          <path d="M2,9 Q6,15 12,11 Q18,15 24,11"
            stroke="hsl(30, 18%, 38%)" strokeWidth={0.8} fill="none" opacity={0.45} />
        )}
      </g>
    ))}
  </g>
);

/* ─── Harbor docks ─── */
const Harbor = () => (
  <g>
    {[398, 1348, 2128, 3578, 4978].map((x, i) => (
      <g key={`harbor-${i}`}>
        <rect x={x} y={278} width={155} height={22} fill="hsl(205, 44%, 20%)" opacity={0.58} rx={2} />
        {[x + 12, x + 38, x + 66, x + 94, x + 122].map((wx, wi) => (
          <line key={wi} x1={wx} y1={284} x2={wx + 12} y2={284}
            stroke="hsl(200, 48%, 38%)" strokeWidth={0.6} opacity={0.28} />
        ))}
        <rect x={x + 22} y={272} width={92} height={6} fill="hsl(30, 28%, 20%)" rx={1} />
        {[x + 26, x + 42, x + 58, x + 74, x + 90, x + 106].map((px, pi) => (
          <rect key={pi} x={px} y={276} width={3} height={24} fill="hsl(25, 22%, 16%)" />
        ))}
        <rect x={x + 32} y={271} width={5} height={2} fill="hsl(30, 18%, 32%)" />
        <rect x={x + 82} y={271} width={5} height={2} fill="hsl(30, 18%, 32%)" />
      </g>
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

        {/* Seagulls */}
        <Seagulls />

        {/* Mountain range backdrop */}
        <Mountains />

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
        <Lighthouse />
        <FishCannery />
        <VillageHouses />
        <DryingRacks />
        <Harbor />
        <FishingBoats />

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

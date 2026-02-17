import { phases } from '@/data/phases';

interface MetricsBannerProps {
  currentPhaseIndex: number;
  phaseTitle: string;
  phaseSubtitle: string;
}

const formatGallons = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return `${v}`;
};

const allMetrics = phases.map(p => p.metrics);

const LineChart = ({
  icon, label, values, currentIndex, color, format = (v: number) => `${v}`,
}: {
  icon: string; label: string; values: number[]; currentIndex: number; color: string;
  format?: (v: number) => string;
}) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const chartW = 100;
  const chartH = 48;
  const pad = 4;

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (chartW - pad * 2);
    const y = chartH - pad - ((v - min) / range) * (chartH - pad * 2);
    return { x, y, v };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${chartH} L${points[0].x},${chartH} Z`;

  // Path up to current index
  const activePoints = points.slice(0, currentIndex + 1);
  const activeLine = activePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  const cur = points[currentIndex];

  return (
    <div className="flex-1 min-w-[140px] rounded-lg px-3 py-2"
      style={{ backgroundColor: 'hsla(220, 20%, 12%, 0.9)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{icon}</span>
          <span className="text-[9px] uppercase tracking-wider font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</span>
        </div>
        <span className="font-mono font-bold text-base tabular-nums transition-all duration-300" style={{ color }}>
          {format(values[currentIndex])}
        </span>
      </div>
      {/* SVG line chart */}
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" style={{ height: 56 }} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(f => (
          <line key={f} x1={pad} x2={chartW - pad} y1={pad + f * (chartH - pad * 2)} y2={pad + f * (chartH - pad * 2)}
            stroke="hsla(220, 20%, 30%, 0.3)" strokeWidth="0.4" />
        ))}
        {/* Full ghost line */}
        <path d={linePath} fill="none" stroke="hsla(220, 20%, 40%, 0.2)" strokeWidth="1" />
        {/* Area fill up to current */}
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {currentIndex > 0 && (
          <path d={`${activeLine} L${activePoints[activePoints.length - 1].x},${chartH} L${activePoints[0].x},${chartH} Z`}
            fill={`url(#grad-${label})`} />
        )}
        {/* Active line */}
        <path d={activeLine} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
        {/* Data dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === currentIndex ? 3.5 : 1.5}
            fill={i <= currentIndex ? color : 'hsla(220, 20%, 40%, 0.4)'}
            stroke={i === currentIndex ? 'hsl(var(--foreground))' : 'none'} strokeWidth={i === currentIndex ? 1 : 0}
            style={i === currentIndex ? { filter: `drop-shadow(0 0 4px ${color})` } : {}} />
        ))}
        {/* Year labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={chartH - 0.5} textAnchor="middle" fontSize="3.5"
            fill={i === currentIndex ? color : 'hsla(220, 20%, 60%, 0.5)'}
            fontWeight={i === currentIndex ? 'bold' : 'normal'}>
            {allMetrics[i].year}
          </text>
        ))}
      </svg>
    </div>
  );
};

const MetricsBanner = ({ currentPhaseIndex, phaseTitle, phaseSubtitle }: MetricsBannerProps) => {
  const metrics = phases[currentPhaseIndex].metrics;

  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 pointer-events-none"
      style={{
        height: '33vh',
        background: 'linear-gradient(180deg, hsl(220, 22%, 8%) 0%, hsl(220, 22%, 8%) 75%, hsla(220, 22%, 8%, 0) 100%)',
      }}
    >
      {/* Phase title */}
      <div className="text-center pt-3 pb-1">
        <div className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {metrics.year}
        </div>
        <h1 className="text-sm md:text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
          {phaseTitle}
        </h1>
        <p className="text-[9px] md:text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {phaseSubtitle}
        </p>
      </div>

      {/* Line charts grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 px-3 mt-2 max-w-4xl mx-auto">
        <LineChart icon="⚡" label="Rate" values={allMetrics.map(m => m.energyRate)} currentIndex={currentPhaseIndex} color="hsl(35, 80%, 55%)" format={v => `${v}¢/kWh`} />
        <LineChart icon="🛢️" label="Diesel" values={allMetrics.map(m => m.dieselGallons)} currentIndex={currentPhaseIndex} color="hsl(0, 60%, 50%)" format={formatGallons} />
        <LineChart icon="💰" label="Saved" values={allMetrics.map(m => Math.round((1500000 - m.dieselGallons) * 3.5))} currentIndex={currentPhaseIndex} color="hsl(50, 75%, 55%)" format={v => v === 0 ? '$0' : `$${(v / 1_000_000).toFixed(1)}M`} />
        <LineChart icon="💧" label="Hydro" values={allMetrics.map(m => m.hydroPercent)} currentIndex={currentPhaseIndex} color="hsl(200, 60%, 50%)" format={v => `${v}%`} />
        <LineChart icon="🔋" label="Capacity" values={allMetrics.map(m => m.hydroCapacity)} currentIndex={currentPhaseIndex} color="hsl(150, 60%, 45%)" format={v => `${v}MW`} />
      </div>
    </div>
  );
};

export default MetricsBanner;
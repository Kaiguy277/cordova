export interface PhaseMetrics {
  year: string;
  energyRate: number; // cents per kWh
  dieselGallons: number; // gallons per year (estimated pre-2019 via 12.8 kWh/gal; EIA-923 actual 2019+)
  hydroPercent: number; // percentage hydro
  hydroCapacity: number; // MW
  dieselReduction: number; // percentage reduction from baseline (baseline = 1,513,176 gal pre-2002)
  dieselPricePerGal: number; // $/gallon (DCRA survey where available, estimated otherwise)
  description: string;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  metrics: PhaseMetrics;
  bgType: 'diesel' | 'early-hydro' | 'hydro-expansion' | 'battery-storage' | 'greensparc' | 'current';
}

// Baseline: AEG-reported 2001 diesel consumption (last full diesel-only year)
const BASELINE_GALLONS = 1513176;

export const phases: Phase[] = [
  {
    id: 'diesel-era',
    title: 'The Diesel Era',
    subtitle: 'Pre-2002 · A Diesel-Dependent Port',
    metrics: {
      year: 'Pre-02',
      energyRate: 40,
      dieselGallons: BASELINE_GALLONS,
      hydroPercent: 0,
      hydroCapacity: 0,
      dieselReduction: 0,
      dieselPricePerGal: 1.80, // estimated pre-DCRA survey era
      description: 'Cordova Electric Cooperative, founded in 1978, runs an islanded microgrid powered entirely by diesel generators. Every gallon arrives by barge. Rates are several times higher than Anchorage, and the growing seafood industry — cold storage, ice machines, processing plants — is acutely vulnerable to fuel price spikes. Outages are frequent.',
    },
    bgType: 'diesel',
  },
  {
    id: 'power-creek',
    title: 'Power Creek Comes Online',
    subtitle: '2002 · 6 MW Run-of-River Hydroelectric',
    metrics: {
      year: '2002',
      energyRate: 32,
      // 10,137 MWh diesel ÷ 12.8 kWh/gal (avg EIA-923 efficiency)
      dieselGallons: 792000,
      hydroPercent: 58, // actual AEDG: 57.95%
      hydroCapacity: 6.0,
      dieselReduction: 48, // (1,513,176 - 792,000) / 1,513,176
      dieselPricePerGal: 2.00, // estimated; DCRA survey began 2005 ($2.99)
      description: 'Power Creek, a $24M run-of-river project drawing from the Eyak Lake watershed, comes online and immediately cuts diesel use by ~48%. In its first year hydro supplies 58% of electricity — a dramatic shift, though wet/dry years cause wide swings. Rates drop ~20%. Half the funding came from Indian Energy Act programs; the rest from state support.',
    },
    bgType: 'early-hydro',
  },
  {
    id: 'humpback-creek',
    title: 'Humpback Creek Online',
    subtitle: '2011 · Adding 1.25 MW of Hydro Capacity',
    metrics: {
      year: '2011',
      energyRate: 28, // confirmed AEDG: $0.280/kWh
      // 10,268 MWh diesel ÷ 12.8 kWh/gal
      dieselGallons: 802000,
      hydroPercent: 62, // actual AEDG: 62.46%
      hydroCapacity: 7.25,
      dieselReduction: 47, // (1,513,176 - 802,000) / 1,513,176
      dieselPricePerGal: 4.60, // DCRA 2011: $4.595/gal
      description: 'Humpback Creek, 7 miles north of the boat harbor, adds 1.25 MW with multiple small turbines. Funded by $8M from the AEA Renewable Energy Fund, it offsets 250,000–300,000 gallons of diesel per year — though diesel remains stubbornly high as load grows and hydro output varies year to year with water conditions.',
    },
    bgType: 'hydro-expansion',
  },
  {
    id: 'consolidation',
    title: 'Consolidation & Batteries',
    subtitle: '2010s–2023 · Hardening the Grid',
    metrics: {
      year: '2018',
      energyRate: 29, // confirmed AEDG: $0.290/kWh
      // 7,021 MWh diesel ÷ 12.8 kWh/gal
      dieselGallons: 548000,
      hydroPercent: 72, // actual AEDG: 72.42%
      hydroCapacity: 7.25,
      dieselReduction: 64, // (1,513,176 - 548,000) / 1,513,176
      dieselPricePerGal: 3.76, // DCRA 2018: $3.760/gal
      description: 'CEC invests in reliability: battery storage (BESS) smooths hydro-diesel transitions, underground lines slash storm outages. By 2023, total utility plant is valued at $53.7M. The payoff: only 4 outages all year — 75 total minutes — an all-time record. Hydro generation hits a historic 22.1M kWh in 2023, supplying 78% of energy.',
    },
    bgType: 'battery-storage',
  },
  {
    id: 'greensparc',
    title: 'GreenSPARC Data Center',
    subtitle: '2024 · 150 kW Hydro-Powered Edge Computing',
    metrics: {
      year: '2024',
      energyRate: 27,
      dieselGallons: 350000, // EIA-923 actual: 349,734 gal
      hydroPercent: 82, // EIA-923 actual: 81.77%
      hydroCapacity: 7.25,
      dieselReduction: 77, // (1,513,176 - 350,000) / 1,513,176
      dieselPricePerGal: 5.27, // DCRA 2024: $5.265/gal
      description: 'Greensparc deploys a 150 kW containerized data center at Humpback Creek in partnership with HPE and CEC — 100% hydro-powered, using 80% less energy than conventional cloud facilities. It represents ~5% of CEC\'s energy sales. In 2024 CEC achieves a record 82% hydro share, with diesel at just 350,000 gallons — saving over $6M/year vs. the diesel-only baseline.',
    },
    bgType: 'greensparc',
  },
  {
    id: 'rate-pressures',
    title: 'Rate Pressures & Resilience',
    subtitle: '2025 · Navigating Inflation & Declining Sales',
    metrics: {
      year: '2025',
      energyRate: 30,
      dieselGallons: 360000, // estimated ~2024 level
      hydroPercent: 80,
      hydroCapacity: 7.25,
      dieselReduction: 76, // (1,513,176 - 360,000) / 1,513,176
      dieselPricePerGal: 5.00, // estimated ~2024-2025 level
      description: 'Material costs surge 100% over 18 months. kWh sales trend downward. CEC implements a 15% rate increase effective April 2025, noting it\'s "no longer collecting enough to meet lender requirements." Yet inflation-adjusted rates remain lower than the fully diesel era thanks to hydro and Alaska\'s Power Cost Equalization credits.',
    },
    bgType: 'greensparc',
  },
  {
    id: 'humpback-upgrade',
    title: 'Humpback Efficiency Upgrade',
    subtitle: '2025–2027 · 36% More Power, Same Water',
    metrics: {
      year: '2026',
      energyRate: 28,
      dieselGallons: 275000, // ~360k baseline − 85k from upgrade
      hydroPercent: 90,
      hydroCapacity: 8.6,
      dieselReduction: 82, // (1,513,176 - 275,000) / 1,513,176
      dieselPricePerGal: 5.20, // estimated
      description: 'On Nov 25, 2025, CEC\'s board votes to upgrade Humpback over the more ambitious Crater Lake project. The $31M modernization — new turbines, valves, and generators — will boost output 36%, adding ~1M kWh/year and cutting 85,000 more gallons of diesel. Backed by $20.4M in federal funding including a $4.8M EPA pollution reduction grant.',
    },
    bgType: 'battery-storage',
  },
  {
    id: 'future-storage',
    title: 'The Path to 95%+ Renewable',
    subtitle: '2028+ · Humpback Storage Phase',
    metrics: {
      year: '2028+',
      energyRate: 24,
      dieselGallons: 75000,
      hydroPercent: 95,
      hydroCapacity: 10,
      dieselReduction: 95, // (1,513,176 - 75,000) / 1,513,176
      dieselPricePerGal: 5.50, // estimated
      description: 'A future Humpback storage reservoir would capture water in wet periods and release it through winter, nearly eliminating seasonal diesel use. Combined cost with the efficiency upgrade: ~$62M. Cordova becomes a model for rural renewable energy — a remote fishing town running on 95%+ clean power, with edge computing and resilient infrastructure.',
    },
    bgType: 'current',
  },
];

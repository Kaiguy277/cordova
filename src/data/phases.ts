export interface PhaseMetrics {
  year: string;
  energyRate: number; // cents per kWh
  dieselGallons: number; // gallons per year
  hydroPercent: number; // percentage hydro
  hydroCapacity: number; // MW
  dieselReduction: number; // percentage reduction from baseline
  description: string;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  metrics: PhaseMetrics;
  bgType: 'diesel' | 'early-hydro' | 'hydro-expansion' | 'battery-storage' | 'greensparc' | 'current';
}

export const phases: Phase[] = [
  {
    id: 'diesel-era',
    title: 'The Diesel Era',
    subtitle: 'Pre-2002 · A Diesel-Dependent Port',
    metrics: {
      year: 'Pre-02',
      energyRate: 40,
      dieselGallons: 1500000,
      hydroPercent: 0,
      hydroCapacity: 0,
      dieselReduction: 0,
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
      dieselGallons: 520000,
      hydroPercent: 67,
      hydroCapacity: 6.0,
      dieselReduction: 65,
      description: 'Power Creek, a $24M run-of-river project drawing from the Eyak Lake watershed, produces ~16M kWh/year and immediately supplies 65–70% of Cordova\'s electricity. Rates drop ~20%. Half the funding came from Indian Energy Act programs; the rest from state support. Over two decades it will save tens of millions in avoided diesel costs and underpin the fishing economy.',
    },
    bgType: 'early-hydro',
  },
  {
    id: 'humpback-creek',
    title: 'Humpback Creek Online',
    subtitle: '2011 · Adding 1.25 MW of Hydro Capacity',
    metrics: {
      year: '2011',
      energyRate: 28,
      dieselGallons: 700000,
      hydroPercent: 65,
      hydroCapacity: 7.25,
      dieselReduction: 53,
      description: 'Humpback Creek, 7 miles north of the boat harbor, adds 1.25 MW with multiple small turbines. Funded by $8M from the AEA Renewable Energy Fund, it offsets 250,000–300,000 gallons of diesel per year. Combined with Power Creek, hydro now covers 75–80% of annual generation. Diesel is relegated to seasonal support and backup.',
    },
    bgType: 'hydro-expansion',
  },
  {
    id: 'consolidation',
    title: 'Consolidation & Batteries',
    subtitle: '2010s–2023 · Hardening the Grid',
    metrics: {
      year: '2018',
      energyRate: 29,
      dieselGallons: 589000,
      hydroPercent: 70,
      hydroCapacity: 7.25,
      dieselReduction: 61,
      description: 'CEC invests in reliability: battery storage (BESS) smooths hydro-diesel transitions, underground lines slash storm outages. By 2023, total utility plant is valued at $53.7M. The payoff: only 4 outages all year — 75 total minutes — an all-time record. Hydro generation hits a historic 21.4M kWh, supplying 75% of energy but only 18% of generation cost.',
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
      dieselGallons: 550000,
      hydroPercent: 75,
      hydroCapacity: 7.25,
      dieselReduction: 63,
      description: 'Greensparc deploys a 150 kW containerized data center at Humpback Creek in partnership with HPE and CEC — 100% hydro-powered, using 80% less energy than conventional cloud facilities. It represents ~5% of CEC\'s energy sales and brings edge computing closer to Cordova, reducing latency while generating new revenue from excess renewable generation.',
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
      dieselGallons: 550000,
      hydroPercent: 75,
      hydroCapacity: 7.25,
      dieselReduction: 63,
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
      dieselGallons: 465000,
      hydroPercent: 90,
      hydroCapacity: 8.6,
      dieselReduction: 69,
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
      dieselGallons: 100000,
      hydroPercent: 95,
      hydroCapacity: 10,
      dieselReduction: 93,
      description: 'A future Humpback storage reservoir would capture water in wet periods and release it through winter, nearly eliminating seasonal diesel use. Combined cost with the efficiency upgrade: ~$62M. Cordova becomes a model for rural renewable energy — a remote fishing town running on 95%+ clean power, with edge computing and resilient infrastructure.',
    },
    bgType: 'current',
  },
];

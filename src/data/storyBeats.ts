export type NPCType = 'fisherman' | 'cec-worker' | 'engineer' | 'tech-worker' | 'board-member';

export interface StoryBeat {
  type: 'walk' | 'dialogue';
  phaseIndex: number;
  npc?: NPCType;
  speaker?: string;
  text?: string;
}

export const storyBeats: StoryBeat[] = [
  // ── Phase 0: Diesel Era ──
  { type: 'walk', phaseIndex: 0 },
  {
    type: 'dialogue', phaseIndex: 0, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "Running these freezers on diesel is killing us. Every gallon comes by barge, and we're paying five times what they pay in Anchorage.",
  },
  {
    type: 'dialogue', phaseIndex: 0, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "One bad storm and the fuel barge can't dock. Then we're rationing power while fish spoil on the dock.",
  },
  { type: 'walk', phaseIndex: 0 },

  // ── Phase 1: Power Creek (2002) ──
  { type: 'walk', phaseIndex: 1 },
  {
    type: 'dialogue', phaseIndex: 1, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "Power Creek's online! Six megawatts of hydro from the Eyak Lake watershed. Biggest thing to happen to Cordova's grid.",
  },
  {
    type: 'dialogue', phaseIndex: 1, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "My rates just dropped twenty percent. We can finally run cold storage year-round. This changes everything for the fishery.",
  },
  { type: 'walk', phaseIndex: 1 },

  // ── Phase 2: Humpback Creek (2011) ──
  { type: 'walk', phaseIndex: 2 },
  {
    type: 'dialogue', phaseIndex: 2, npc: 'engineer',
    speaker: 'Project Engineer',
    text: "Humpback Creek adds another 1.25 megawatts — seven miles north of the harbor. Three turbines matched to the creek's flow.",
  },
  {
    type: 'dialogue', phaseIndex: 2, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "That's a quarter million fewer gallons of diesel every year. We're at seventy-five percent hydro now.",
  },
  { type: 'walk', phaseIndex: 2 },

  // ── Phase 3: Consolidation & Batteries (2010s–2023) ──
  { type: 'walk', phaseIndex: 3 },
  {
    type: 'dialogue', phaseIndex: 3, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "We buried the power lines and added battery storage. No more losing power every time a tree comes down in a storm.",
  },
  {
    type: 'dialogue', phaseIndex: 3, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "2023 was our best year ever — four outages, seventy-five minutes total. And we hit 21.4 million kilowatt-hours of hydro. Record.",
  },
  {
    type: 'dialogue', phaseIndex: 3, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "Remember that bomb cyclone that hammered the Pacific Northwest? Half a million people from Washington to Oregon lost power for days. Trees took out transmission lines across three states.",
  },
  {
    type: 'dialogue', phaseIndex: 3, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "Cordova kept the lights on. No transmission lines to lose — our generation is local. Buried distribution, battery backup, hydro right here. The storm barely touched us.",
  },
  {
    type: 'dialogue', phaseIndex: 3, npc: 'board-member',
    speaker: 'CEC Board Member',
    text: "That's the hidden value of a microgrid. Mainland utilities depend on hundreds of miles of exposed wire. We're self-contained. What looks like isolation is actually resilience.",
  },
  { type: 'walk', phaseIndex: 3 },

  // ── Phase 4: GreenSPARC (2024) ──
  { type: 'walk', phaseIndex: 4 },
  {
    type: 'dialogue', phaseIndex: 4, npc: 'tech-worker',
    speaker: 'GreenSPARC Tech',
    text: "We put a data center right at the hydropower plant. A hundred and fifty kilowatts — that's five percent of CEC's total energy sales, all from water that was already flowing.",
  },
  {
    type: 'dialogue', phaseIndex: 4, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "That's the magic of an anchor customer. Before GreenSPARC, surplus hydro in summer just went to waste. Now it generates steady revenue year-round.",
  },
  {
    type: 'dialogue', phaseIndex: 4, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "More revenue from the same infrastructure means the co-op can spread fixed costs over more kilowatt-hours. That keeps rates down for the rest of us.",
  },
  {
    type: 'dialogue', phaseIndex: 4, npc: 'board-member',
    speaker: 'CEC Board Member',
    text: "GreenSPARC also strengthens the business case for upgrading Humpback. A guaranteed large customer makes lenders more confident — better loan terms, less risk for ratepayers.",
  },
  { type: 'walk', phaseIndex: 4 },

  // ── Phase 5: Rate Pressures (2025) ──
  { type: 'walk', phaseIndex: 5 },
  {
    type: 'dialogue', phaseIndex: 5, npc: 'board-member',
    speaker: 'CEC Board Member',
    text: "Material costs doubled in eighteen months. Sales are trending down. We need a fifteen percent increase to stay solvent.",
  },
  {
    type: 'dialogue', phaseIndex: 5, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "Stings, but adjusted for inflation? Still cheaper than the diesel days. And the PCE credits take the edge off.",
  },
  { type: 'walk', phaseIndex: 5 },

  // ── Phase 6: Humpback Upgrade (2025–2027) ──
  { type: 'walk', phaseIndex: 6 },
  {
    type: 'dialogue', phaseIndex: 6, npc: 'engineer',
    speaker: 'Project Engineer',
    text: "Board voted to upgrade Humpback over building Crater Lake — better return on investment. Thirty-one million for thirty-six percent more output from the same water.",
  },
  {
    type: 'dialogue', phaseIndex: 6, npc: 'engineer',
    speaker: 'Project Engineer',
    text: "That's eighty-five thousand fewer gallons of diesel per year. Federal grants cover twenty million of the cost.",
  },
  { type: 'walk', phaseIndex: 6 },

  // ── Phase 7: Future (2028+) ──
  { type: 'walk', phaseIndex: 7 },
  {
    type: 'dialogue', phaseIndex: 7, npc: 'cec-worker',
    speaker: 'CEC Lineman',
    text: "A storage reservoir at Humpback could get us to ninety-five percent renewable — even through winter processing season.",
  },
  {
    type: 'dialogue', phaseIndex: 7, npc: 'fisherman',
    speaker: 'Fish Processor',
    text: "From all diesel to nearly all clean. Not bad for a fishing town at the end of the road.",
  },
  { type: 'walk', phaseIndex: 7 },
];

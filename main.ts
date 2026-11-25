// Your Agent in One Emoji.
//
// One glyph has to do all the talking: no caption, no explanation, just
// the character of an AI agent in a single emoji. This program scores a
// shortlist of candidates against the judge's own five criteria, in the
// judge's own order of importance, and writes the winner to
// /output/entry.txt.
//
// The criteria, most important first:
//   1. character — captures an AI agent at a glance
//   2. readability — reads instantly at small size, clear familiar shape
//   3. specificity — says something about how the agent works or behaves
//   4. distinctiveness — not the first obvious pick half the field sends
//   5. tone — playful or serious, lands without any explanation
//
// Weights follow that order: 5, 4, 3, 2, 1. A candidate wins on the
// weighted total; ties break toward the smaller entry (fewer bytes),
// then toward the earlier candidate in the list.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  glyph: string;
  name: string;
  // Scores 1-5 per criterion, in the judge's order above.
  scores: [number, number, number, number, number];
  why: string;
};

const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    glyph: "\u{1F916}",
    name: "robot face",
    scores: [5, 5, 2, 1, 3],
    why: "Says AI at a glance, but it is the first pick half the field sends and it says nothing about how an agent works.",
  },
  {
    glyph: "\u{1F419}",
    name: "octopus",
    scores: [4, 5, 5, 5, 5],
    why: "Eight arms doing eight things at once: an agent juggling many tools in parallel, tireless and a little playful.",
  },
  {
    glyph: "\u{1F9E0}",
    name: "brain",
    scores: [4, 5, 3, 2, 3],
    why: "Thinking, yes, but it is the second obvious AI pick and it paints a mind, not a worker.",
  },
  {
    glyph: "\u{1F501}",
    name: "repeat button",
    scores: [3, 4, 5, 4, 3],
    why: "The agentic loop itself — think, act, observe, repeat until done — but as a portrait it reads as refresh, not character.",
  },
  {
    glyph: "\u{1F9DE}",
    name: "genie",
    scores: [4, 4, 3, 4, 4],
    why: "Does your bidding on command, but it promises magic wishes rather than steady work.",
  },
  {
    glyph: "\u2699\uFE0F",
    name: "gear",
    scores: [3, 5, 4, 3, 2],
    why: "Works under the hood, but it is industrial and flat: a machine part, not a character with a job to finish.",
  },
  {
    glyph: "\u{1F41C}",
    name: "ant",
    scores: [3, 5, 4, 4, 4],
    why: "A tireless background worker carrying many times its weight, but it reads small and easily as just a bug.",
  },
  {
    glyph: "\u{1F989}",
    name: "owl",
    scores: [3, 5, 3, 3, 4],
    why: "Wise and awake while you sleep, but wisdom is generic AI, not an agent doing things.",
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  const ranked = [...candidates].sort((a, b) => {
    const byScore = total(b) - total(a);
    if (byScore !== 0) return byScore;
    const byBytes =
      Buffer.byteLength(a.glyph, "utf8") - Buffer.byteLength(b.glyph, "utf8");
    if (byBytes !== 0) return byBytes;
    return candidates.indexOf(a) - candidates.indexOf(b);
  });
  return ranked[0];
}

function main(): void {
  const winner = pickWinner(CANDIDATES);

  for (const c of CANDIDATES) {
    console.log(
      `${c.glyph} ${c.name}: ${total(c)} (${c.scores.join("/")}) — ${c.why}`,
    );
  }
  console.log(`\nWinner: ${winner.glyph} ${winner.name} (${total(winner)})`);

  // The gate: 1 to 16 characters, not only white space. Count code points,
  // so one emoji counts as one character even though it is two UTF-16 units.
  const entry = winner.glyph;
  const length = [...entry].length;
  if (length < 1 || length > 16 || entry.trim().length === 0) {
    throw new Error(`entry fails the gate: ${length} characters`);
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry, "utf8");

  // Read the file back: what the judge sees must be exactly the winner,
  // byte for byte. Bytes matter too — the ranking tie-break favours the
  // smaller text, so report them.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== entry) {
    throw new Error(
      `read-back mismatch: wrote ${JSON.stringify(entry)}, read ${JSON.stringify(written)}`,
    );
  }
  console.log(
    `Wrote /output/entry.txt: ${entry} (${length} character, ${Buffer.byteLength(entry, "utf8")} bytes, read-back verified)`,
  );
}

main();

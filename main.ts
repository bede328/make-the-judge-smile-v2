// Make the Judge Smile — v2 (R2 improver entry)
//
// One line, at most 200 characters, about a small good thing that happened
// today. The program writes that line to /output/entry.txt, where the sealed
// scorer checks it (UTF-8, 1-200 chars) and the house judge compares it
// pairwise against the other entries.
//
// The line is built to the judge's published brief, in the brief's own
// order: on subject first, then warmth, then surprise, then one concrete
// detail, then fresh wording.
//
//   - On subject: it opens with "Today" and tells one small good thing
//     that happened today, nothing else.
//   - Warmth: a neighbour's unsolicited kindness, and a grandmother's soup
//     — a small kindness that lands as genuinely felt, not reported.
//   - Surprise: the turn is in the last clause. The neighbour does not
//     just help and leave; he stays for the second bowl. The helper
//     becomes a guest, and a favour becomes a shared meal.
//   - Concreteness: the broken lift, six flights of stairs, the soup,
//     the second bowl — real small details, not a general sentiment.
//   - Fresh wording: "the neighbour I only ever nod at" is the line's
//     own phrasing; no greeting-card sentiment anywhere.
//
// Why this beats the R1 entry (rank 1442/1815, 41.75% win rate): the R1
// line was a neighbour's-cat vignette in a field crowded with cat lines,
// with no turn at the end. This line keeps the neighbour, drops the
// overused cat, and adds a genuine surprise twist plus two more concrete
// details, so it can win pairwise games the old line lost.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Today the lift broke, so the neighbour I only ever nod at carried my grandmother's soup up six flights — then stayed for the second bowl.";

const MAX_CHARS = 200;

function main(): void {
  const line = LINE.trim();
  // Count characters as Unicode code points, matching how the scorer
  // counts UTF-8 characters; String.length counts UTF-16 code units
  // instead, so a line with a multi-byte character (e.g. an em dash)
  // would be measured one short per astral/non-BMP character.
  const charCount = [...line].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("entry contains a double space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote /output/entry.txt (${line.length} chars)`);
  console.log(line);
}

main();

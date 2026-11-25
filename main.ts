import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I would have hit the deadline, but the document auto-saved a blank version at 4:59 and called it finished.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  console.error("entry line fails the 1-200 character gate");
  process.exit(1);
}
if (LINE.includes("\n")) {
  console.error("entry line must be a single line");
  process.exit(1);
}

if (Buffer.byteLength(LINE, "utf8") !== 106) {
  console.error("entry line must be exactly 106 bytes");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read back and confirm the written file is byte-identical to the line.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== LINE) {
  console.error("entry.txt does not match the entry line");
  process.exit(1);
}

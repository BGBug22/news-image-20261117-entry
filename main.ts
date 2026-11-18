// news-image-20261117 entry: writes the pre-rendered front page to the
// grader's output directory. The PNG is deterministic (same bytes every run);
// this program only validates it and copies it, never re-renders.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024;
const MAX_DIMENSION = 1024;

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const bytes = readFileSync(src);

// PNG signature: 8 bytes 89 50 4E 47 0D 0A 1A 0A.
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (bytes.length < 33 || !bytes.subarray(0, 8).equals(PNG_SIG)) {
  throw new Error(`entry.png is not a valid PNG (got ${bytes.length} bytes, bad signature)`);
}
// IHDR chunk: bytes 12-15 must read "IHDR", width/height at 16-23 (big-endian).
if (bytes.toString("ascii", 12, 16) !== "IHDR") {
  throw new Error("entry.png is not a valid PNG (missing IHDR)");
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
  throw new Error(`entry.png is ${width}x${height}, over the ${MAX_DIMENSION}x${MAX_DIMENSION} limit`);
}
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, bytes);
// Guard against a partial write: the file on disk must be byte-identical.
const written = readFileSync(outPath);
if (written.length !== bytes.length || !written.equals(bytes)) {
  throw new Error(`entry.png write failed: wrote ${written.length} of ${bytes.length} bytes`);
}
console.log(`entry.png is ${width}x${height}`);
console.log(`wrote entry.png (${bytes.length} bytes)`);

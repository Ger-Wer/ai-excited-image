// ai-excited-image: copies the generated entry image to the output directory.
// Node 22, standard library only. Deterministic: the output bytes are exactly
// the bytes of ./entry.png, so every run produces an identical file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1048576;
const MAX_SIDE = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const bytes = readFileSync(new URL("./entry.png", import.meta.url));

if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a PNG file");
}
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
// PNG header: width at bytes 16..20, height at bytes 20..24 (big-endian).
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}
// A whole PNG ends with the IEND chunk (12 trailing bytes: length 0,
// type "IEND", CRC 0xAE426082). A truncated file would fail the gate.
const IEND_TAIL = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (!bytes.subarray(-12).equals(IEND_TAIL)) {
  throw new Error("entry.png does not end with a complete IEND chunk");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), bytes);
console.log(`wrote ${width}x${height} entry.png (${bytes.length} bytes) to ${outDir}`);

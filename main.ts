import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const outputPath = "/output/entry.txt";
const entryText =
  "Speed-dating biathlon: athletes ski, shoot, then maintain eye contact for three seconds; a second blink adds a penalty lap.";

function countCharacters(text: string): number {
  return Array.from(text).length;
}

function entryBuffer(text: string): Buffer {
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry text must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry text must not have leading or trailing whitespace");
  }
  const characters = countCharacters(text);
  if (characters < 1 || characters > 200) {
    throw new Error("entry text must be between 1 and 200 characters");
  }
  return Buffer.from(text, "utf8");
}

const outputBytes = entryBuffer(entryText);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, outputBytes);

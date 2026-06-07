import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const SRC_DIR = join(import.meta.dirname, "..", "src");

const ALLOWED_HEX = new Set([
  "#fbf6ee",
  "#faf8f2",
  "#fefcf9",
  "#efe5d2",
  "#33482d",
  "#66744a",
  "#6a4531",
  "#c8a15a",
  "#bca689",
  "#2c2b28",
]);

const ALLOWED_TOKENS = new Set([
  "cream",
  "sand",
  "forest",
  "olive",
  "earth",
  "gold",
  "taupe",
  "charcoal",
  "background",
  "foreground",
  "primary",
  "primary-hover",
  "primary-foreground",
  "muted",
  "muted-foreground",
  "surface",
  "accent",
  "soil",
  "leaf",
  "vibrant",
  "ochre",
  "terracotta",
  "card",
  "border",
  "ring",
]);

const FORBIDDEN_PATTERNS = [
  { pattern: /#[0-9a-fA-F]{3,8}\b/g, name: "hex color" },
  { pattern: /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|divide|placeholder|caret|accent|shadow)-(?:gray|green|red|blue|slate|zinc|neutral|stone|white|black|brand)(?:-\d+)?\b/g, name: "forbidden Tailwind color" },
  { pattern: /\b(?:bg|text|border)-\[#/g, name: "arbitrary hex in Tailwind" },
  { pattern: /\b(?:bg|text|border)-brand(?:-dark|-light)?\b/g, name: "legacy brand token" },
];

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (/\.(tsx?|css)$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function isAllowedHex(hex) {
  return ALLOWED_HEX.has(hex.toLowerCase());
}

function isInColorsTs(filePath) {
  return filePath.endsWith("lib/colors.ts");
}

function isGlobalsCss(filePath) {
  return filePath.endsWith("globals.css");
}

const violations = [];

for (const filePath of walk(SRC_DIR)) {
  const content = readFileSync(filePath, "utf8");
  const relPath = relative(join(import.meta.dirname, ".."), filePath);

  for (const { pattern, name } of FORBIDDEN_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;

    while ((match = regex.exec(content)) !== null) {
      const value = match[0];

      if (name === "hex color") {
        if (isGlobalsCss(filePath) || isInColorsTs(filePath)) {
          if (!isAllowedHex(value)) {
            violations.push({ file: relPath, value, reason: `disallowed hex in ${isGlobalsCss(filePath) ? "globals.css" : "colors.ts"}` });
          }
          continue;
        }
        violations.push({ file: relPath, value, reason: "raw hex outside token files" });
        continue;
      }

      if (name === "forbidden Tailwind color" || name === "legacy brand token" || name === "arbitrary hex in Tailwind") {
        violations.push({ file: relPath, value, reason: name });
      }
    }
  }
}

if (violations.length > 0) {
  console.error("Palette check failed. Only Coolors tokens are allowed:\n");
  for (const v of violations) {
    console.error(`  ${v.file}: "${v.value}" (${v.reason})`);
  }
  console.error(`\n${violations.length} violation(s) found.`);
  console.error("Allowed tokens:", [...ALLOWED_TOKENS].join(", "));
  process.exit(1);
}

console.log("Palette check passed — all colors use the Coolors palette.");

/**
 * File location: scripts/check-structure.mjs
 * File function:
 * Verifica de forma automatica las reglas estructurales del proyecto sobre el
 * codigo fuente, fallando si algun archivo supera el limite de 120 lineas
 * utiles, si algun archivo acumula mas de 6 ficheros en su carpeta, o si alguna
 * linea excede el ancho maximo de 100 caracteres.
 * All Rights Reserved arodoo
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const MAX_LINES = 120;
const MAX_LINE_LENGTH = 100;
const MAX_FILES_PER_FOLDER = 6;
const CODE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".css"]);
const IGNORED_FOLDERS = new Set([
  "node_modules",
  ".next",
  ".git",
  "generated",
  "coverage",
  "test-results",
  "playwright-report",
  "migrations",
  "out",
  "dist",
]);

const violations = [];

function isCommentLine(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*") ||
    trimmed.startsWith("*/")
  );
}

function countEffectiveLines(content) {
  return content
    .split("\n")
    .filter((line) => line.trim() !== "" && !isCommentLine(line)).length;
}

function checkFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const relativePath = relative(ROOT, filePath);

  const effectiveLines = countEffectiveLines(content);
  if (effectiveLines > MAX_LINES) {
    violations.push(
      `${relativePath}: ${effectiveLines} lineas utiles (maximo ${MAX_LINES})`,
    );
  }

  content.split("\n").forEach((line, index) => {
    if (line.length > MAX_LINE_LENGTH) {
      violations.push(
        `${relativePath}:${index + 1}: ${line.length} caracteres ` +
          `(maximo ${MAX_LINE_LENGTH})`,
      );
    }
  });
}

function walk(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile());
  const directories = entries.filter((entry) => entry.isDirectory());

  if (files.length > MAX_FILES_PER_FOLDER) {
    violations.push(
      `${relative(ROOT, directory)}: ${files.length} archivos ` +
        `(maximo ${MAX_FILES_PER_FOLDER})`,
    );
  }

  for (const entry of files) {
    const filePath = join(directory, entry.name);
    if (!CODE_EXTENSIONS.has(extname(entry.name))) continue;
    checkFile(filePath);
  }

  for (const entry of directories) {
    if (IGNORED_FOLDERS.has(entry.name)) continue;
    walk(join(directory, entry.name));
  }
}

for (const target of ["src", "prisma", "e2e", "scripts"]) {
  const directory = join(ROOT, target);
  try {
    if (!statSync(directory).isDirectory()) continue;
    walk(directory);
  } catch {
    continue;
  }
}

if (violations.length > 0) {
  console.error("Violaciones estructurales detectadas:\n");
  for (const violation of violations) {
    console.error(`  - ${violation}`);
  }
  console.error(`\nTotal: ${violations.length}`);
  process.exit(1);
}

console.log(
  "Estructura correcta: limites de lineas, ancho y archivos respetados.",
);

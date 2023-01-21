import { execSync } from "child_process";
import { gzipSizeFromFileSync } from "gzip-size";

// Delete dist folder, and build project
execSync("shx rm -rf ./dist .cache && tsc");

// Optimize files
const files = ["dist/index.js"];

for (const file of files) {
  execSync(`terser -o ${file} --compress --mangle -- ${file}`);
  console.log(`Optimized ${file} - 0.${gzipSizeFromFileSync(file)}KB`);
}

import { execSync } from "child_process";
import { gzipSizeFromFileSync } from "gzip-size";

try {
  // Delete dist folder, and build project
  execSync("shx rm -rf ./dist .cache && tsc");

  // Prettier
  execSync("npx prettier --write .");

  // Optimize files
  const files = ["dist/index.js"];

  for (const file of files) {
    execSync(`terser -o ${file} --compress --mangle -- ${file}`);
    console.log(`${file} - 0.${gzipSizeFromFileSync(file)}KB`);
  }
} catch (error) {
  console.log(error);
}

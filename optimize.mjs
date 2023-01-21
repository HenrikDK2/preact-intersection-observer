import { execSync } from "child_process";
import { gzipSizeFromFileSync } from "gzip-size";

const files = ["dist/index.js"];

for (const file of files) {
  execSync(`terser -o ${file} --compress --mangle -- ${file}`);
  console.log(`Optimized ${file} - 0.${gzipSizeFromFileSync(file)}KB`);
}

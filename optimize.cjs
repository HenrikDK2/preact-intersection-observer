/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const files = ["dist/index.js"];

try {
  console.log("Optimizing...");
  for (const file of files) {
    execSync(`terser -o ${file} --compress --mangle -- ${file}`);
    console.log(`Optimized ${file}`);
  }
} catch (err) {
  console.error(err);
}

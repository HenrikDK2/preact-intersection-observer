import { execSync } from "child_process";
import { gzipSizeFromFileSync } from "gzip-size";

try {
  // ESlint
  execSync("clear && echo Running ESlint...", { stdio: "inherit" });
  execSync("eslint ./src", { stdio: "inherit" });

  // Prettier
  console.log("Prettier...");
  execSync("npx prettier --write .");

  // Delete dist folder, and build project
  console.log("Building...");
  execSync("shx rm -rf ./dist .cache && tsc", { stdio: "inherit" });

  // Optimize files
  console.log("Optimizing...\n");
  const files = ["dist/index.js"];

  for (const file of files) {
    execSync(`terser -o ${file} -c -m -- ${file}`);
    console.log(`${file} - 0.${gzipSizeFromFileSync(file)}KB`);
  }
} catch (error) {
  console.log(error);
}

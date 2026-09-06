import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const fail = [];
const tsc = spawnSync("npx", ["tsc", "--noEmit"], { encoding: "utf8" });
if (tsc.status !== 0) fail.push("tsc");

const unit = spawnSync(
  "node",
  ["--experimental-strip-types", "--test", "src/lib/filename.test.ts"],
  { encoding: "utf8" },
);
if (unit.status !== 0) {
  if (unit.stderr) process.stderr.write(unit.stderr);
  if (unit.stdout) process.stderr.write(unit.stdout);
  fail.push("unit");
}

const needles = [
  ["dangerouslySetInnerHTML", "src"],
  ["mailto:\"\"", "src"],
  ["Official mark", "src"],
];
for (const [needle, root] of needles) {
  const rg = spawnSync("rg", ["-n", needle, root], { encoding: "utf8" });
  if (rg.status === 0 && rg.stdout.trim()) fail.push(`grep ${needle}`);
}

const robots = readFileSync("public/robots.txt", "utf8");
if (!robots.startsWith("User-agent")) fail.push("robots");

if (fail.length) {
  console.error(fail.join("\n"));
  process.exit(1);
}
console.log("ci-gates ok");

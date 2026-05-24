#!/usr/bin/env node
/**
 * toolkit-batch - Batch task scheduler
 * Usage: toolkit-batch [config.json]
 *
 * Config format:
 * {
 *   "tasks": [
 *     { "tool": "csv", "args": ["merge", "a.csv", "b.csv", "-o", "out.csv"] },
 *     { "tool": "image", "args": ["compress", "./img/"] }
 *   ],
 *   "schedule": { "interval": "daily" }
 * }
 */
const path = require("path");
const fs = require("fs");
const configPath = process.argv[2] || "batch.json";

if (!fs.existsSync(configPath)) {
  console.error(`Config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const tasks = config.tasks || [];

console.log(`📋 Batch: ${tasks.length} tasks`);
tasks.forEach((t, i) => {
  console.log(`  [${i + 1}] ${t.tool}: ${(t.args || []).join(" ")}`);
});

let failed = 0;
for (let i = 0; i < tasks.length; i++) {
  const t = tasks[i];
  const { execSync } = require("child_process");
  const binMap = {
    csv: "csv-toolkit-pro",
    json: "json-tidy-pro",
    image: "batch-image-tool",
    text: "text-processor-pro",
    pdf: "pdf-toolkit-pro",
    file: "file-batch-toolkit",
  };
  const bin = binMap[t.tool] || t.tool;
  try {
    console.log(`\n▶️  [${i + 1}/${tasks.length}] ${t.name || t.tool}`);
    execSync(`${bin} ${(t.args || []).join(" ")}`, { stdio: "inherit" });
    console.log(`   ✅ Done`);
  } catch (e) {
    console.error(`   ❌ Failed`);
    failed++;
  }
}

console.log(`\n✅ Batch complete (${tasks.length - failed}/${tasks.length} succeeded)`);
process.exit(failed > 0 ? 1 : 0);

#!/usr/bin/env node
/**
 * CLI Toolkit Pro - Unified CLI for all tools
 * Usage: toolkit <command> [options]
 *   toolkit csv merge file1.csv file2.csv
 *   toolkit json format config.json
 *   toolkit image compress ./images/
 *   toolkit batch schedule --config tasks.json
 *   toolkit pipeline --config pipeline.yml
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const COMMANDS = {
  csv: { pkg: "csv-toolkit-pro", bin: "csv-toolkit-pro" },
  json: { pkg: "json-tidy-pro", bin: "json-tidy-pro" },
  image: { pkg: "batch-image-tool", bin: "batch-image-tool" },
  text: { pkg: "text-processor-pro", bin: "text-processor-pro" },
  pdf: { pkg: "pdf-toolkit-pro", bin: "pdf-toolkit-pro" },
  file: { pkg: "file-batch-toolkit", bin: "file-batch-toolkit" },
};

function runTool(cmd, args) {
  const info = COMMANDS[cmd];
  if (!info) {
    console.error(`Unknown command: ${cmd}`);
    console.log("Available: csv, json, image, text, pdf, file, batch, pipeline");
    process.exit(1);
  }

  try {
    const result = execSync(`${info.bin} ${args.join(" ")}`, {
      stdio: "inherit",
      env: { ...process.env },
    });
    return result;
  } catch (e) {
    process.exit(e.status || 1);
  }
}

function runPipeline(args) {
  const configPath = args[0] || "pipeline.json";
  if (!fs.existsSync(configPath)) {
    console.error(`Pipeline config not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.steps || !Array.isArray(config.steps)) {
    console.error("Pipeline config must have a 'steps' array");
    process.exit(1);
  }

  console.log(`🚀 Running pipeline: ${config.name || "unnamed"}`);
  console.log(`   ${config.steps.length} steps\n`);

  for (let i = 0; i < config.steps.length; i++) {
    const step = config.steps[i];
    console.log(`[${i + 1}/${config.steps.length}] ${step.name || step.tool}`);
    
    const start = Date.now();
    try {
      runTool(step.tool, step.args || []);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`   ✅ Done (${elapsed}s)\n`);
    } catch (e) {
      console.error(`   ❌ Failed at step ${i + 1}`);
      process.exit(1);
    }
  }

  console.log("🎉 Pipeline complete!");
}

function runBatch(args) {
  const configPath = args[0] || "batch.json";
  if (!fs.existsSync(configPath)) {
    console.error(`Batch config not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const { schedule, tasks } = config;

  if (!tasks || !Array.isArray(tasks)) {
    console.error("Batch config must have a 'tasks' array");
    process.exit(1);
  }

  console.log(`📋 Batch scheduler: ${tasks.length} tasks`);
  if (schedule) {
    console.log(`   Schedule: ${schedule.cron || schedule.interval || "manual"}`);
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(`\n[${i + 1}/${tasks.length}] ${task.name || task.tool}`);
    try {
      runTool(task.tool, task.args || []);
    } catch (e) {
      console.error(`   ⚠️ Task failed, continuing...`);
    }
  }

  console.log("\n✅ Batch complete!");
}

function showHelp() {
  console.log(`
CLI Toolkit Pro v${require("../package.json").version}

Usage:
  toolkit <command> [options]

Commands:
  csv               CSV/Excel processing (merge, clean, convert, analyze)
  json              JSON formatting, validation, conversion
  image             Batch image optimization and conversion
  text              Batch text processing
  pdf               PDF merge, split, text extraction
  file              File organization, rename, deduplicate
  batch             Run multiple tasks from a config file
  pipeline          Run a multi-step pipeline from a config file

Pipeline Example (pipeline.json):
  {
    "name": "Monthly Report",
    "steps": [
      { "tool": "csv", "args": ["merge", "sales_*.csv", "-o", "merged.csv"] },
      { "tool": "csv", "args": ["clean", "merged.csv", "--deduplicate", "-o", "clean.csv"] },
      { "tool": "json", "args": ["convert", "clean.csv", "-o", "report.json"] }
    ]
  }

Batch Example (batch.json):
  {
    "tasks": [
      { "tool": "file", "args": ["organize", "~/Downloads"] },
      { "tool": "image", "args": ["compress", "./images/", "-o", "./optimized/"] }
    ]
  }
`);
}

const [,, cmd, ...rest] = process.argv;

if (!cmd || cmd === "help") {
  showHelp();
} else if (cmd === "batch") {
  runBatch(rest);
} else if (cmd === "pipeline") {
  runPipeline(rest);
} else {
  runTool(cmd, rest);
}

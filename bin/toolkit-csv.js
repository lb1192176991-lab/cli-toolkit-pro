#!/usr/bin/env node
// toolkit-csv - wrapper for csv-toolkit-pro
const { execSync } = require("child_process");
try {
  execSync(`csv-toolkit-pro ${process.argv.slice(2).join(" ")}`, { stdio: "inherit" });
} catch (e) {
  process.exit(e.status || 1);
}

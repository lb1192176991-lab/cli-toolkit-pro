#!/usr/bin/env node
const { execSync } = require("child_process");
try {
  execSync(`pdf-toolkit-pro ${process.argv.slice(2).join(" ")}`, { stdio: "inherit" });
} catch (e) {
  process.exit(e.status || 1);
}

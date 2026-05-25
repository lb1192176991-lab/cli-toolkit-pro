# CLI Toolkit Pro
[![Buy on Gumroad](https://img.shields.io/badge/Buy%20on-Gumroad-ff69b4?style=for-the-badge&logo=gumroad)](https://bobotempes.gumroad.com/l/nmcqjr)
 馃殌

**One command to rule them all.** CSV, JSON, image, PDF, text, and file tools 鈥?unified CLI with batch scheduling and pipeline automation.

## Why Pro?

| Feature | Free Tools | CLI Toolkit Pro |
|---------|-----------|-----------------|
| Individual tools | 鉁?| 鉁?|
| Unified CLI | 鉂?| 鉁?|
| Batch scheduling | 鉂?| 鉁?|
| Pipeline automation | 鉂?| 鉁?|
| Config file support | 鉂?| 鉁?|
| Premium support | 鉂?| 鉁?|
| Regular updates | 鉂?| 鉁?|

## Installation

```bash
npm install -g cli-toolkit-pro
```

## Quick Start

```bash
# Merge CSV files
toolkit csv merge sales_jan.csv sales_feb.csv -o q1.csv

# Format JSON
toolkit json format config.json -o pretty.json

# Optimize images
toolkit image process ./photos/ --resize 1920 --format webp

# Batch: organize downloads + optimize images
toolkit batch examples/daily-cleanup.json

# Pipeline: extract, clean, convert in one command
toolkit pipeline examples/report-pipeline.json
```

## Pipeline Example

Create `report-pipeline.json`:

```json
{
  "name": "Monthly Report Generator",
  "steps": [
    { "tool": "csv", "args": ["merge", "sales_*.csv", "-o", "merged.csv"] },
    { "tool": "csv", "args": ["clean", "merged.csv", "--deduplicate", "-o", "clean.csv"] },
    { "tool": "json", "args": ["convert", "clean.csv", "-o", "report.json"] }
  ]
}
```

Run it:

```bash
toolkit pipeline report-pipeline.json
```

## Batch Scheduling

Create `daily-tasks.json`:

```json
{
  "tasks": [
    { "name": "Organize Downloads", "tool": "file", "args": ["organize", "~/Downloads"] },
    { "name": "Optimize Images", "tool": "image", "args": ["compress", "./images/"] }
  ]
}
```

```bash
toolkit batch daily-tasks.json
```

## Included Tools

| Command | Package | Purpose |
|---------|---------|---------|
| `csv` | csv-toolkit-pro | CSV/Excel merge, clean, convert, analyze |
| `json` | json-tidy-pro | Format, validate, minify, convert JSON |
| `image` | batch-image-tool | Compress, resize, convert images |
| `text` | text-processor-pro | Batch find/replace, extract, count |
| `pdf` | pdf-toolkit-pro | Merge, split, extract PDF text |
| `file` | file-batch-toolkit | Organize, rename, deduplicate files |

## Requirements

- Node.js 16+

## License

Commercial license. See [LICENSE.md](./LICENSE.md).

---

馃寪 **Visit us**: [https://www.tucaowall.vip/](https://www.tucaowall.vip/)

## GitHub

- Repository: https://github.com/lb1192176991-lab/cli-toolkit-pro
- Issues: https://github.com/lb1192176991-lab/cli-toolkit-pro/issues

---

猸?Star this repo if you find it useful!


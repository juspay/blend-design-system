# blend-telemetry

CLI tool to scan any project using `@juspay/blend-design-system` and produce a detailed report of component adoption, prop usage, file breakdown, and migration metrics.

Supports both **TypeScript** and **ReScript** projects.

## Installation

```bash
npm install -g blend-telemetry
# or
npx blend-telemetry --dir ./your-project
```

## Usage

```bash
# Scan a project directory
blend-telemetry --dir /path/to/your/project

# Scan the current directory
blend-telemetry

# Output as JSON
blend-telemetry --dir . --reporter json

# Quiet mode (no console output)
blend-telemetry --dir . --quiet
```

## What it reports

- **Adoption Rate** — how many of the available Blend components are actually used
- **Component Usage** — per-component usage counts, prop breakdown, variant distribution, file locations
- **Never Used** — components available in the installed version but not used at all
- **File Breakdown** — which files use Blend and which components they import
- **Migration Status** _(ReScript projects only)_ — tracks adapter pattern files (`isBlendEnabled`), direct usage files, and wrapper files
- **HTML Report** — opt-in via `--reporter html` or by adding `"html"` to `reporters` in config; written to `.blend-telemetry/report.html`, opens directly from the terminal link

## HTML Report

When `"html"` is included in `reporters` (via `--reporter html` or config), a full interactive HTML report is written to `.blend-telemetry/report.html` inside your project. The terminal prints a clickable link to open it directly.

The report has five tabs:

| Tab                         | Contents                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| **Overview**                | Stat cards + adoption & usage charts                                                           |
| **Components**              | Searchable table, never-used grid, per-component prop & variant detail                         |
| **Files**                   | File-by-file breakdown with component lists                                                    |
| **Blend Files / Migration** | TS: files using Blend with stats · RS: migration status with adapter/direct/wrapper file lists |
| **Info**                    | Scan metadata                                                                                  |

## Configuration

Create a `.blendrc.json` in your project root to customise behaviour:

```json
{
    "scanDirs": ["src", "app"],
    "outputDir": ".blend-telemetry",
    "reporters": ["console"]
}
```

| Field         | Default               | Description                                                             | When to use                                                                                                                    |
| ------------- | --------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `scanDirs`    | entire project        | Folders to scan for Blend component usage                               | Set to `["src"]` or `["src", "app"]` if your project is large and you want to skip irrelevant directories to make scans faster |
| `outputDir`   | `.blend-telemetry`    | Folder where the HTML/JSON report is written                            | Change this if you want reports in a different location, e.g. `"reports"`                                                      |
| `reporters`   | `["console"]`         | Array of output formats — `"console"`, `"json"`, `"html"` (or multiple) | Set to `["json"]` for machine-readable output, or `["console", "json"]` to run multiple reporters                              |
| `packageName` | `blend-design-system` | The npm package name to scan for                                        | Only change this if your project uses a fork or re-export of Blend under a different package name                              |

## Requirements

- Node.js >= 18
- Project must have `@juspay/blend-design-system` installed (or declared in `package.json`)

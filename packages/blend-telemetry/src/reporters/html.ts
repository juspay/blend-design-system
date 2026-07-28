import { writeFile, mkdir } from 'fs/promises'
import { resolve } from 'path'
import type {
    BlendTelemetryReport,
    ComponentMetrics,
    FileMetrics,
} from '../metrics/definitions.js'

export async function writeHtmlReport(
    report: BlendTelemetryReport,
    outputDir: string,
    projectRoot: string
): Promise<string> {
    const outDir = resolve(projectRoot, outputDir)
    await mkdir(outDir, { recursive: true })
    const html = generateHtml(report)
    const outPath = resolve(outDir, 'report.html')
    await writeFile(outPath, html, 'utf-8')
    return outPath
}

function esc(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

function migrationBadge(f: FileMetrics): string {
    if (f.isAdapter) return '<span class="badge badge-yellow">adapter</span>'
    if (f.isWrapper) return '<span class="badge badge-blue">wrapper</span>'
    if (f.isDirect) return '<span class="badge badge-green">direct</span>'
    return '<span class="badge badge-gray">—</span>'
}

function statusBadge(c: ComponentMetrics): string {
    if (!c.isUsed) return '<span class="badge badge-gray">unused</span>'
    return '<span class="badge badge-green">used</span>'
}

function generateHtml(report: BlendTelemetryReport): string {
    const {
        meta,
        summary,
        componentMetrics,
        fileMetrics,
        migrationMetrics,
        languageBreakdown,
    } = report

    const isRescriptProject = languageBreakdown.rescript.files > 0

    const versionWarning =
        meta.versionMismatch && meta.declaredVersion
            ? `<div class="version-warn">
        ⚠ Version mismatch: <code>package.json</code> declares <strong>${esc(meta.declaredVersion!)}</strong>
        but <code>node_modules</code> has <strong>${esc(meta.packageVersion)}</strong> installed.
        Run <code>yarn install</code> or <code>npm install</code> to sync.
      </div>`
            : ''

    // ── Component rows (full table) ───────────────────────────────────────────
    const componentRows = componentMetrics
        .sort((a, b) => b.usageCount - a.usageCount)
        .map((c) => {
            const topProps = c.propUsage
                .slice(0, 4)
                .map((p) => `<code>${esc(p.propName)}</code>`)
                .join(' ')
            const fileLinks = c.filesUsedIn
                .slice(0, 5)
                .map((f) => `<div class="file-path">${esc(f)}</div>`)
                .join('')
            const moreFiles =
                c.filesUsedIn.length > 5
                    ? `<div class="file-path more">+${c.filesUsedIn.length - 5} more files</div>`
                    : ''
            const spreadWarn =
                c.spreadPropUsages > 0
                    ? `<span class="warn-inline">⚠ ${c.spreadPropUsages} spread</span>`
                    : ''

            return `
      <tr class="comp-row ${c.isUsed ? '' : 'unused-row'}" data-name="${esc(c.componentName.toLowerCase())}">
        <td>
          <a href="#comp-${esc(c.componentName)}" class="comp-name-link"><strong>${esc(c.componentName)}</strong></a>
          ${c.bindingName ? `<div class="sub-text">${esc(c.bindingName)}.res</div>` : ''}
        </td>
        <td class="num">${c.usageCount}</td>
        <td class="num">${c.filesUsedIn.length}</td>
        <td>${topProps}${spreadWarn}</td>
        <td>${statusBadge(c)}</td>
        <td>
          <button class="expand-btn" onclick="toggleFiles(this)">▶ files</button>
          <div class="file-list hidden">${fileLinks}${moreFiles}</div>
        </td>
      </tr>`
        })
        .join('')

    // ── Component detail cards (drill-down) ───────────────────────────────────
    const componentCards = componentMetrics
        .filter((c) => c.isUsed)
        .sort((a, b) => b.usageCount - a.usageCount)
        .map((c) => {
            const allFiles = c.filesUsedIn
                .map(
                    (f) =>
                        `<div class="file-entry"><span class="file-icon">📄</span><span class="file-path-text">${esc(f)}</span></div>`
                )
                .join('')

            const propRows = c.propUsage
                .map((p) => {
                    const topValues = Object.entries(p.valueDistribution)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(
                            ([v, n]) =>
                                `<span class="value-chip">${esc(v)}<em>${n}</em></span>`
                        )
                        .join('')
                    const declaredMark = p.isDeclaredInBinding
                        ? '<span class="declared">✓ in binding</span>'
                        : '<span class="undeclared">? not in binding</span>'
                    return `
          <tr>
            <td><code>${esc(p.propName)}</code></td>
            <td class="num">${p.usageCount}</td>
            <td class="num">${Math.round(p.usageRate * 100)}%</td>
            <td>${topValues || '<span class="sub-text">dynamic</span>'}</td>
            ${isRescriptProject ? `<td>${declaredMark}</td>` : ''}
          </tr>`
                })
                .join('')

            const variantRows = c.variantDistribution
                .map((v) => {
                    const bars = Object.entries(v.distribution)
                        .sort((a, b) => b[1] - a[1])
                        .map(([val, count]) => {
                            const total = Object.values(v.distribution).reduce(
                                (s, n) => s + n,
                                0
                            )
                            const pct =
                                total > 0
                                    ? Math.round((count / total) * 100)
                                    : 0
                            return `
              <div class="variant-bar-row">
                <span class="variant-label">${esc(val)}</span>
                <div class="variant-bar-track">
                  <div class="variant-bar-fill" style="width:${pct}%"></div>
                </div>
                <span class="variant-count">${count} (${pct}%)</span>
              </div>`
                        })
                        .join('')
                    return `
          <div class="variant-section">
            <div class="variant-prop-name">${esc(v.propName)}</div>
            ${bars}
            ${v.unspecifiedCount > 0 ? `<div class="sub-text">${v.unspecifiedCount} usages used default (prop not passed)</div>` : ''}
          </div>`
                })
                .join('')

            const warnings: string[] = []
            if (c.spreadPropUsages > 0)
                warnings.push(
                    `${c.spreadPropUsages} usage(s) use spread props — prop analysis is incomplete for those`
                )
            if (c.dynamicUsages > 0)
                warnings.push(
                    `${c.dynamicUsages} dynamic usage(s) via createElement — not fully tracked`
                )

            return `
      <div class="detail-card" id="comp-${esc(c.componentName)}">
        <div class="detail-card-header">
          <div>
            <h3>${esc(c.componentName)}</h3>
            ${isRescriptProject && c.bindingName ? `<div class="sub-text">Binding: ${esc(c.bindingName)}.res</div>` : ''}
          </div>
          <div class="detail-stats">
            <span class="stat-chip">${c.usageCount} usages</span>
            <span class="stat-chip">${c.filesUsedIn.length} files</span>
            ${c.spreadPropUsages > 0 ? `<span class="stat-chip warn">⚠ ${c.spreadPropUsages} spread</span>` : ''}
          </div>
        </div>

        ${warnings.length > 0 ? `<div class="card-warn">${warnings.map((w) => `<div>⚠ ${esc(w)}</div>`).join('')}</div>` : ''}

        <div class="detail-grid">
          <div class="detail-section">
            <div class="section-title">File Locations (${c.filesUsedIn.length})</div>
            <div class="file-list-full">${allFiles || '<div class="sub-text">No files</div>'}</div>
          </div>

          ${
              c.propUsage.length > 0
                  ? `
          <div class="detail-section">
            <div class="section-title">Prop Usage</div>
            <table class="inner-table">
              <thead><tr><th>Prop</th><th>Used</th><th>Rate</th><th>Top Values</th>${isRescriptProject ? '<th>Binding</th>' : ''}</tr></thead>
              <tbody>${propRows}</tbody>
            </table>
          </div>`
                  : ''
          }

          ${
              c.variantDistribution.length > 0
                  ? `
          <div class="detail-section">
            <div class="section-title">Variant Distribution</div>
            ${variantRows}
          </div>`
                  : ''
          }
        </div>
      </div>`
        })
        .join('')

    // ── File breakdown table ───────────────────────────────────────────────────
    const fileRows = fileMetrics
        .sort((a, b) => b.totalUsages - a.totalUsages)
        .map(
            (f) => `
      <tr class="file-row" data-path="${esc(f.relativePath.toLowerCase())}">
        <td>
          <div class="file-path-text">${esc(f.relativePath)}</div>
        </td>
        <td><span class="lang-badge lang-${f.language}">${f.language === 'rescript' ? 'ReScript' : f.language === 'typescript' ? 'TypeScript' : 'JS'}</span></td>
        <td class="num">${f.totalUsages}</td>
        <td class="num">${f.components.length}</td>
        ${isRescriptProject ? `<td>${migrationBadge(f)}</td>` : ''}
        <td>
          <button class="expand-btn" onclick="toggleFiles(this)">▶ components</button>
          <div class="file-list hidden">
            ${f.components.map((c) => `<span class="comp-chip"><a href="#comp-${esc(c)}">${esc(c)}</a></span>`).join('')}
          </div>
        </td>
      </tr>`
        )
        .join('')

    // ── Migration detail (ReScript-only concept) ───────────────────────────────
    const { componentsByMigrationStatus: mcs } = migrationMetrics

    function fileList(paths: string[], emptyMsg: string): string {
        if (paths.length === 0)
            return `<div class="sub-text muted">${emptyMsg}</div>`
        return `
      <div class="file-list-scroll">
        ${paths.map((p) => `<div class="file-path-row">${esc(p)}</div>`).join('')}
      </div>`
    }

    const migrationDetail = isRescriptProject
        ? `
    <div class="migration-grid">
      <div class="migration-col">
        <div class="migration-col-header green-header">✓ Fully Migrated (${mcs.fullyMigrated.length})</div>
        <div class="sub-text muted" style="margin-bottom:0.5rem">Components used directly — no adapter gate</div>
        ${mcs.fullyMigrated.map((c) => `<div class="comp-chip-row"><a href="#comp-${esc(c)}">${esc(c)}</a></div>`).join('') || '<div class="sub-text muted">None</div>'}
        ${
            migrationMetrics.directFilePaths.length > 0
                ? `
        <div class="migration-col-header green-header" style="margin-top:1rem">Direct Files (${migrationMetrics.directFilePaths.length})</div>
        ${fileList(migrationMetrics.directFilePaths, 'None')}`
                : ''
        }
      </div>
      <div class="migration-col">
        <div class="migration-col-header yellow-header">~ Partially Migrated (${mcs.partiallyMigrated.length})</div>
        <div class="sub-text muted">Used both directly and via adapter</div>
        ${mcs.partiallyMigrated.map((c) => `<div class="comp-chip-row"><a href="#comp-${esc(c)}">${esc(c)}</a></div>`).join('') || '<div class="sub-text muted">None</div>'}
      </div>
      <div class="migration-col">
        <div class="migration-col-header red-header">✗ Adapter Only (${mcs.adapterOnly.length})</div>
        <div class="sub-text muted" style="margin-bottom:0.5rem">Always behind isBlendEnabled gate</div>
        ${mcs.adapterOnly.map((c) => `<div class="comp-chip-row"><a href="#comp-${esc(c)}">${esc(c)}</a></div>`).join('') || '<div class="sub-text muted">None</div>'}
        ${
            migrationMetrics.adapterFilePaths.length > 0
                ? `
        <div class="migration-col-header red-header" style="margin-top:1rem">Adapter Files (${migrationMetrics.adapterFilePaths.length})</div>
        ${fileList(migrationMetrics.adapterFilePaths, 'None')}`
                : ''
        }
      </div>
    </div>
    ${
        migrationMetrics.wrapperFilePaths.length > 0
            ? `
    <div style="margin-top:1rem">
      <div class="section-subtitle">Wrapper Files (${migrationMetrics.wrapperFilePaths.length}) <span class="badge badge-blue">wrapper</span></div>
      <div class="sub-text muted" style="margin-bottom:0.5rem">Components that wrap Blend internally — infrastructure, not counted in migration rate</div>
      ${fileList(migrationMetrics.wrapperFilePaths, 'None')}
    </div>`
            : ''
    }`
        : ''

    // ── Unused components ──────────────────────────────────────────────────────
    const unusedGrid = summary.unusedComponents
        .map((name) => `<div class="unused-chip">${esc(name)}</div>`)
        .join('')

    // ── Chart data ─────────────────────────────────────────────────────────────
    const topChartData = JSON.stringify(
        summary.topComponents.map((c) => ({ name: c.name, count: c.count }))
    )
    const adoptionChartData = JSON.stringify([
        { label: 'Used', value: summary.totalComponentsUsed, color: '#3fb950' },
        {
            label: 'Unused',
            value: summary.unusedComponents.length,
            color: '#30363d',
        },
    ])
    const migrationChartData = JSON.stringify([
        {
            label: 'Direct',
            value: migrationMetrics.directBlendFiles,
            color: '#3fb950',
        },
        {
            label: 'Adapter',
            value: migrationMetrics.adapterPatternFiles,
            color: '#d29922',
        },
        {
            label: 'Wrapper',
            value: migrationMetrics.wrapperFiles,
            color: '#58a6ff',
        },
    ])

    // ── Blend files section (TypeScript-only) ─────────────────────────────────
    const blendFilesForTab = fileMetrics
        .filter((f) => f.totalUsages > 0)
        .sort((a, b) => b.totalUsages - a.totalUsages)
    const blendFilesTab = !isRescriptProject
        ? `
    <div class="section">
      <div class="stat-grid" style="margin-bottom:1.5rem">
        <div class="stat-card">
          <div class="stat-label">Files Using Blend</div>
          <div class="stat-value green">${blendFilesForTab.length}</div>
          <div class="stat-sub">of ${meta.totalFilesScanned} total files scanned</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Avg Usages / File</div>
          <div class="stat-value">${blendFilesForTab.length > 0 ? (blendFilesForTab.reduce((s, f) => s + f.totalUsages, 0) / blendFilesForTab.length).toFixed(1) : '0'}</div>
          <div class="stat-sub">blend component usages per file</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Avg Components / File</div>
          <div class="stat-value">${blendFilesForTab.length > 0 ? (blendFilesForTab.reduce((s, f) => s + f.components.length, 0) / blendFilesForTab.length).toFixed(1) : '0'}</div>
          <div class="stat-sub">distinct blend components per file</div>
        </div>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>File Path</th>
              <th style="text-align:right">Usages</th>
              <th style="text-align:right">Components</th>
              <th>Components Used</th>
            </tr>
          </thead>
          <tbody>
            ${blendFilesForTab
                .map(
                    (f) => `
            <tr>
              <td><span class="file-path-text">${esc(f.relativePath)}</span></td>
              <td class="num">${f.totalUsages}</td>
              <td class="num">${f.components.length}</td>
              <td>${f.components.map((c) => `<span class="comp-chip"><a href="#comp-${esc(c)}">${esc(c)}</a></span>`).join('')}</td>
            </tr>`
                )
                .join('')}
          </tbody>
        </table>
      </div>
    </div>`
        : ''

    const thirdTabId = isRescriptProject ? 'migration' : 'blend-files'
    const thirdTabLabel = isRescriptProject ? 'Migration' : 'Blend Files'
    const thirdTabCount = isRescriptProject
        ? migrationMetrics.adapterPatternFiles +
          migrationMetrics.directBlendFiles
        : blendFilesForTab.length

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>blend-telemetry — ${esc(meta.packageName)}</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d1117; --bg2: #161b22; --bg3: #21262d; --bg4: #2d333b;
    --border: #30363d; --border2: #3d444d;
    --text: #e6edf3; --text2: #8b949e; --text3: #6e7681;
    --blue: #58a6ff; --green: #3fb950; --yellow: #d29922; --red: #f85149; --purple: #bc8cff;
    --blue-bg: #1f3a5f; --green-bg: #1a4731; --yellow-bg: #4a3219; --red-bg: #4a1a1a;
    --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif;
    --mono: 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
    --header-h: 49px;
    --tabbar-h: 44px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font); background: var(--bg); color: var(--text); font-size: 14px; line-height: 1.5; }

  /* ── App header ──────────────────────────────────────────────────────────── */
  .app-header {
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    height: var(--header-h);
  }
  .header-inner {
    max-width: 1400px; margin: 0 auto;
    padding: 0 2rem; height: 100%;
    display: flex; justify-content: space-between; align-items: center;
  }
  .header-left { display: flex; align-items: center; gap: 0.75rem; }
  .logo { font-size: 0.95rem; font-weight: 700; color: var(--blue); letter-spacing: -0.01em; }
  .header-pkg { font-size: 0.78rem; color: var(--text3); font-family: var(--mono); }
  .header-right { font-size: 0.75rem; color: var(--text3); }

  /* ── Tab bar ─────────────────────────────────────────────────────────────── */
  .tab-bar {
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    position: sticky; top: var(--header-h); z-index: 99;
    height: var(--tabbar-h);
  }
  .tab-bar-inner {
    max-width: 1400px; margin: 0 auto;
    padding: 0 2rem; height: 100%;
    display: flex; align-items: flex-end;
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tab-bar-inner::-webkit-scrollbar { display: none; }
  .tab-btn {
    background: none; border: none;
    border-bottom: 2px solid transparent;
    color: var(--text2); cursor: pointer;
    font-size: 0.85rem; font-family: var(--font);
    padding: 0.65rem 1.1rem;
    margin-bottom: -1px;
    transition: color 0.15s, border-color 0.15s;
    display: inline-flex; align-items: center; gap: 0.35rem;
    white-space: nowrap; flex-shrink: 0;
  }
  .tab-btn:hover { color: var(--text); }
  .tab-btn.active { color: var(--blue); border-bottom-color: var(--blue); font-weight: 500; }
  .tab-count {
    font-size: 0.68rem; font-weight: 400;
    background: var(--bg3); border-radius: 10px;
    padding: 0.08rem 0.42rem; color: var(--text3);
  }
  .tab-btn.active .tab-count { background: var(--blue-bg); color: var(--blue); }

  /* ── Main content ────────────────────────────────────────────────────────── */
  .main { max-width: 1400px; margin: 0 auto; padding: 2rem; }
  .tab-panel { display: none; }
  .tab-panel.active { display: block; }

  /* ── Sections inside tabs ────────────────────────────────────────────────── */
  .section { margin-bottom: 2.5rem; }
  .section-heading {
    font-size: 0.72rem; font-weight: 700; color: var(--text3);
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-bottom: 1rem; padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .section-heading-count {
    font-size: 0.72rem; color: var(--text3);
    background: var(--bg3); border-radius: 10px;
    padding: 0.08rem 0.42rem; font-weight: 400;
  }
  h3 { font-size: 0.95rem; font-weight: 600; color: var(--text); }

  /* ── Version warning ─────────────────────────────────────────────────────── */
  .version-warn { background: var(--yellow-bg); border: 1px solid var(--yellow); border-radius: 6px; padding: 0.7rem 1rem; font-size: 0.85rem; color: var(--yellow); margin-bottom: 1.5rem; }
  .version-warn code { background: rgba(0,0,0,0.3); padding: 0.1rem 0.3rem; border-radius: 3px; font-family: var(--mono); }
  .version-warn strong { font-weight: 600; }

  /* ── Stat cards ──────────────────────────────────────────────────────────── */
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 1.2rem 1.4rem; }
  .stat-label { font-size: 0.72rem; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.4rem; }
  .stat-value { font-size: 2rem; font-weight: 700; color: var(--blue); line-height: 1.1; }
  .stat-sub { font-size: 0.78rem; color: var(--text3); margin-top: 0.25rem; }
  .stat-value.green { color: var(--green); }
  .stat-value.yellow { color: var(--yellow); }
  .stat-value.red { color: var(--red); }

  /* ── Charts ──────────────────────────────────────────────────────────────── */
  .chart-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }
  .chart-box { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 1.2rem; }
  .chart-box-label { font-size: 0.75rem; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
  .chart-box canvas { max-height: 200px; }

  /* ── Tables ──────────────────────────────────────────────────────────────── */
  .table-wrapper { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .table-search { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); background: var(--bg3); display: flex; align-items: center; gap: 0.75rem; }
  .table-search input { flex: 1; background: var(--bg); border: 1px solid var(--border2); border-radius: 6px; padding: 0.4rem 0.75rem; color: var(--text); font-size: 0.85rem; font-family: var(--font); outline: none; }
  .table-search input:focus { border-color: var(--blue); }
  .table-search input::placeholder { color: var(--text3); }
  .table-search-count { font-size: 0.78rem; color: var(--text3); white-space: nowrap; }
  table { width: 100%; border-collapse: collapse; }
  th { background: var(--bg3); color: var(--text3); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.6rem 1rem; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; }
  td { padding: 0.6rem 1rem; border-bottom: 1px solid var(--bg3); vertical-align: top; font-size: 0.85rem; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg3); }
  .unused-row td { opacity: 0.4; }
  .num { text-align: right; font-variant-numeric: tabular-nums; color: var(--text2); font-family: var(--mono); }
  .sub-text { font-size: 0.75rem; color: var(--text3); margin-top: 0.15rem; }
  code { font-family: var(--mono); font-size: 0.8em; background: var(--bg3); padding: 0.1rem 0.3rem; border-radius: 3px; color: var(--blue); }

  /* ── Badges ──────────────────────────────────────────────────────────────── */
  .badge { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 600; white-space: nowrap; }
  .badge-green  { background: var(--green-bg); color: var(--green); }
  .badge-yellow { background: var(--yellow-bg); color: var(--yellow); }
  .badge-blue   { background: var(--blue-bg); color: var(--blue); }
  .badge-gray   { background: var(--bg3); color: var(--text3); }
  .badge-red    { background: var(--red-bg); color: var(--red); }
  .lang-badge   { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 600; }
  .lang-rescript   { background: #2d1f5e; color: #a78bfa; }
  .lang-typescript { background: #1e3a5f; color: #60a5fa; }
  .lang-javascript { background: #3a2e00; color: #fbbf24; }

  /* ── Expand buttons ──────────────────────────────────────────────────────── */
  .expand-btn { background: var(--bg3); border: 1px solid var(--border); border-radius: 4px; color: var(--text2); cursor: pointer; font-size: 0.75rem; padding: 0.2rem 0.5rem; font-family: var(--font); transition: all 0.15s; }
  .expand-btn:hover { background: var(--bg4); color: var(--text); }
  .file-list { margin-top: 0.5rem; }
  .file-list.hidden { display: none; }
  .file-path { font-family: var(--mono); font-size: 0.75rem; color: var(--text2); padding: 0.15rem 0; }
  .file-path.more { color: var(--text3); font-style: italic; }
  .warn-inline { color: var(--yellow); font-size: 0.75rem; margin-left: 0.25rem; }

  /* ── Component name link in table ────────────────────────────────────────── */
  .comp-name-link { color: var(--text); text-decoration: none; }
  .comp-name-link:hover { color: var(--blue); }

  /* ── Component detail cards ──────────────────────────────────────────────── */
  .detail-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 1.5rem; overflow: hidden; }
  .detail-card-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 1rem 1.25rem; background: var(--bg3); border-bottom: 1px solid var(--border); }
  .detail-stats { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .stat-chip { background: var(--bg4); border: 1px solid var(--border2); border-radius: 4px; padding: 0.2rem 0.6rem; font-size: 0.78rem; color: var(--text2); }
  .stat-chip.warn { color: var(--yellow); border-color: var(--yellow-bg); }
  .detail-grid { padding: 1.25rem; display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  .detail-section {}
  .section-title { font-size: 0.75rem; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.6rem; }
  .card-warn { background: var(--yellow-bg); border-bottom: 1px solid var(--border); padding: 0.6rem 1.25rem; font-size: 0.8rem; color: var(--yellow); }

  /* ── File list in detail ─────────────────────────────────────────────────── */
  .file-list-full { max-height: 240px; overflow-y: auto; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); }
  .file-entry { display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; border-bottom: 1px solid var(--bg3); }
  .file-entry:last-child { border-bottom: none; }
  .file-entry:hover { background: var(--bg3); }
  .file-icon { font-size: 0.75rem; flex-shrink: 0; }
  .file-path-text { font-family: var(--mono); font-size: 0.78rem; color: var(--text2); word-break: break-all; }

  /* ── Inner table ─────────────────────────────────────────────────────────── */
  .inner-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
  .inner-table th { padding: 0.4rem 0.75rem; }
  .inner-table td { padding: 0.4rem 0.75rem; }

  /* ── Value chips ─────────────────────────────────────────────────────────── */
  .value-chip { display: inline-flex; align-items: center; gap: 0.25rem; background: var(--bg3); border-radius: 4px; padding: 0.1rem 0.4rem; font-size: 0.75rem; margin-right: 0.2rem; color: var(--text); }
  .value-chip em { font-style: normal; color: var(--text3); font-size: 0.7rem; }
  .declared { color: var(--green); font-size: 0.75rem; }
  .undeclared { color: var(--yellow); font-size: 0.75rem; }

  /* ── Variant bars ────────────────────────────────────────────────────────── */
  .variant-section { margin-bottom: 1rem; }
  .variant-prop-name { font-size: 0.8rem; font-weight: 600; color: var(--text2); margin-bottom: 0.4rem; font-family: var(--mono); }
  .variant-bar-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.3rem; }
  .variant-label { font-size: 0.78rem; font-family: var(--mono); color: var(--text); width: 120px; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .variant-bar-track { flex: 1; background: var(--bg3); border-radius: 3px; height: 8px; overflow: hidden; }
  .variant-bar-fill { height: 100%; background: var(--blue); border-radius: 3px; transition: width 0.3s; }
  .variant-count { font-size: 0.75rem; color: var(--text3); width: 80px; flex-shrink: 0; text-align: right; font-family: var(--mono); }

  /* ── Migration ───────────────────────────────────────────────────────────── */
  .migration-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
  .migration-col { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; }
  .migration-col-header { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem; }
  .green-header  { color: var(--green); }
  .yellow-header { color: var(--yellow); }
  .red-header    { color: var(--red); }
  .comp-chip-row { margin-top: 0.4rem; }
  .comp-chip-row a { color: var(--blue); text-decoration: none; font-size: 0.82rem; font-family: var(--mono); }
  .comp-chip-row a:hover { text-decoration: underline; }
  .section-subtitle { font-size: 0.85rem; font-weight: 600; color: var(--text2); margin-bottom: 0.5rem; }
  .muted { margin-bottom: 0.6rem; }
  .file-list-scroll { max-height: 200px; overflow-y: auto; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; }
  .file-path-row { font-family: var(--mono); font-size: 0.75rem; color: var(--text2); padding: 0.3rem 0.75rem; border-bottom: 1px solid var(--bg3); }
  .file-path-row:last-child { border-bottom: none; }

  /* ── Unused grid ─────────────────────────────────────────────────────────── */
  .unused-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .unused-chip { background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 0.35rem 0.75rem; font-size: 0.82rem; color: var(--text3); font-family: var(--mono); }

  /* ── Comp chips ──────────────────────────────────────────────────────────── */
  .comp-chip { display: inline-block; margin: 0.15rem; }
  .comp-chip a { font-size: 0.78rem; color: var(--blue); text-decoration: none; background: var(--bg3); padding: 0.15rem 0.4rem; border-radius: 4px; font-family: var(--mono); }
  .comp-chip a:hover { background: var(--blue-bg); }

  /* ── Responsive ──────────────────────────────────────────────────────────── */
  @media (max-width: 960px) {
    .chart-row { grid-template-columns: 1fr; }
    .migration-grid { grid-template-columns: 1fr; }
    .main { padding: 1.25rem; }
    .header-inner { padding: 0 1.25rem; }
    .tab-bar-inner { padding: 0 1.25rem; }
  }
</style>
</head>
<body>

<!-- App header -->
<header class="app-header">
  <div class="header-inner">
    <div class="header-left">
      <span class="logo">blend-telemetry</span>
      <span class="header-pkg">${esc(meta.packageName)}@${esc(meta.packageVersion)}</span>
    </div>
    <div class="header-right">
      ${meta.totalFilesScanned.toLocaleString()} files scanned &nbsp;·&nbsp;
      ${(meta.scanDurationMs / 1000).toFixed(2)}s &nbsp;·&nbsp;
      ${new Date(meta.generatedAt).toLocaleString()}
    </div>
  </div>
</header>

<!-- Tab bar -->
<nav class="tab-bar">
  <div class="tab-bar-inner">
    <button class="tab-btn active" data-tab="overview" onclick="switchTab('overview')">Overview</button>
    <button class="tab-btn" data-tab="components" onclick="switchTab('components')">
      Components <span class="tab-count">${componentMetrics.length}</span>
    </button>
    <button class="tab-btn" data-tab="files" onclick="switchTab('files')">
      Files <span class="tab-count">${fileMetrics.length}</span>
    </button>
    <button class="tab-btn" data-tab="${thirdTabId}" onclick="switchTab('${thirdTabId}')">
      ${thirdTabLabel} <span class="tab-count">${thirdTabCount}</span>
    </button>
    <button class="tab-btn" data-tab="info" onclick="switchTab('info')">Info</button>
  </div>
</nav>

<!-- Main content -->
<main class="main">

  <!-- ── Overview tab ─────────────────────────────────────────────────────── -->
  <div class="tab-panel active" id="tab-overview">
    ${versionWarning}

    <!-- Stat cards -->
    <div class="section">
      <div class="section-heading">Summary</div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-label">Adoption Rate</div>
          <div class="stat-value ${summary.adoptionRate >= 80 ? 'green' : summary.adoptionRate >= 50 ? 'yellow' : 'red'}">${summary.adoptionRate}%</div>
          <div class="stat-sub">${summary.totalComponentsUsed} of ${summary.totalComponentsAvailable} components used</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Usages</div>
          <div class="stat-value">${summary.totalUsageCount.toLocaleString()}</div>
          <div class="stat-sub">across ${summary.filesWithBlendUsage} files</div>
        </div>
        ${
            isRescriptProject
                ? `
        <div class="stat-card">
          <div class="stat-label">Migration</div>
          <div class="stat-value ${migrationMetrics.migrationCompletionRate >= 80 ? 'green' : migrationMetrics.migrationCompletionRate >= 40 ? 'yellow' : 'red'}">${migrationMetrics.migrationCompletionRate}%</div>
          <div class="stat-sub">${migrationMetrics.directBlendFiles} direct · ${migrationMetrics.adapterPatternFiles} adapter · ${migrationMetrics.wrapperFiles} wrapper</div>
        </div>`
                : ''
        }
        <div class="stat-card">
          <div class="stat-label">Unused Components</div>
          <div class="stat-value ${summary.unusedComponents.length === 0 ? 'green' : 'yellow'}">${summary.unusedComponents.length}</div>
          <div class="stat-sub">of ${summary.totalComponentsAvailable} available</div>
        </div>
        ${
            isRescriptProject
                ? `
        <div class="stat-card">
          <div class="stat-label">Binding Files</div>
          <div class="stat-value">${meta.bindingFilesFound}</div>
          <div class="stat-sub">parsed for component registry</div>
        </div>`
                : ''
        }
        <div class="stat-card">
          <div class="stat-label">Parse Errors</div>
          <div class="stat-value ${meta.filesWithParseErrors === 0 ? 'green' : 'yellow'}">${meta.filesWithParseErrors}</div>
          <div class="stat-sub">files skipped due to errors</div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="section">
      <div class="section-heading">Charts</div>
      <div class="chart-row">
        <div class="chart-box">
          <div class="chart-box-label">Top Components by Usage</div>
          <canvas id="topChart"></canvas>
        </div>
        <div class="chart-box">
          <div class="chart-box-label">Adoption</div>
          <canvas id="adoptionChart"></canvas>
        </div>
        ${
            isRescriptProject
                ? `
        <div class="chart-box">
          <div class="chart-box-label">Migration</div>
          <canvas id="migrationChart"></canvas>
        </div>`
                : ''
        }
      </div>
    </div>
  </div>

  <!-- ── Components tab ───────────────────────────────────────────────────── -->
  <div class="tab-panel" id="tab-components">

    <!-- All components table -->
    <div class="section">
      <div class="section-heading">
        All Components
        <span class="section-heading-count" id="comp-count">${componentMetrics.length}</span>
      </div>
      <div class="table-wrapper">
        <div class="table-search">
          <input type="text" id="comp-search" placeholder="Search components…" oninput="filterComponents(this.value)">
        </div>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align:right">Usages</th>
              <th style="text-align:right">Files</th>
              <th>Top Props</th>
              <th>Status</th>
              <th>File Locations</th>
            </tr>
          </thead>
          <tbody id="comp-tbody">${componentRows}</tbody>
        </table>
      </div>
    </div>

    <!-- Never used -->
    ${
        summary.unusedComponents.length > 0
            ? `
    <div class="section">
      <div class="section-heading">
        Never Used
        <span class="section-heading-count">${summary.unusedComponents.length}</span>
      </div>
      <div class="unused-grid">${unusedGrid}</div>
    </div>`
            : ''
    }

    <!-- Component detail cards -->
    <div class="section">
      <div class="section-heading">
        Component Detail
        <span class="section-heading-count">${componentMetrics.filter((c) => c.isUsed).length} used</span>
      </div>
      ${componentCards}
    </div>
  </div>

  <!-- ── Files tab ────────────────────────────────────────────────────────── -->
  <div class="tab-panel" id="tab-files">
    <div class="section">
      <div class="section-heading">
        File Breakdown
        <span class="section-heading-count">${fileMetrics.length} files</span>
      </div>
      <div class="table-wrapper">
        <div class="table-search">
          <input type="text" id="file-search" placeholder="Search file paths…" oninput="filterFiles(this.value)">
        </div>
        <table>
          <thead>
            <tr>
              <th>File Path</th>
              <th>Language</th>
              <th style="text-align:right">Usages</th>
              <th style="text-align:right">Components</th>
              ${isRescriptProject ? '<th>Type</th>' : ''}
              <th>Components Used</th>
            </tr>
          </thead>
          <tbody id="file-tbody">${fileRows}</tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ── Migration tab (ReScript) / Blend Files tab (TypeScript) ──────────── -->
  <div class="tab-panel" id="tab-${thirdTabId}">
    ${
        isRescriptProject
            ? `
    <div class="section">
      <div class="section-heading">Migration Status</div>
      <div class="stat-grid" style="margin-bottom:1.5rem">
        <div class="stat-card">
          <div class="stat-label">Migration Rate</div>
          <div class="stat-value ${migrationMetrics.migrationCompletionRate >= 80 ? 'green' : migrationMetrics.migrationCompletionRate >= 40 ? 'yellow' : 'red'}">${migrationMetrics.migrationCompletionRate}%</div>
          <div class="stat-sub">direct / (direct + adapter)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Direct Files</div>
          <div class="stat-value green">${migrationMetrics.directBlendFiles}</div>
          <div class="stat-sub">No adapter gate, fully migrated</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Adapter Files</div>
          <div class="stat-value yellow">${migrationMetrics.adapterPatternFiles}</div>
          <div class="stat-sub">Behind isBlendEnabled check</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Wrapper Files</div>
          <div class="stat-value">${migrationMetrics.wrapperFiles}</div>
          <div class="stat-sub">Components wrapping blend</div>
        </div>
      </div>
      ${migrationDetail}
    </div>`
            : blendFilesTab
    }
  </div>

  <!-- ── Info tab ─────────────────────────────────────────────────────────── -->
  <div class="tab-panel" id="tab-info">
    <div class="section">
      <div class="section-heading">Scan Info</div>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr><td><strong>Package</strong></td><td><code>${esc(meta.packageName)}</code></td></tr>
            <tr><td><strong>Installed Version</strong></td><td><code>${esc(meta.packageVersion)}</code></td></tr>
            ${meta.declaredVersion ? `<tr><td><strong>Declared Version</strong></td><td><code>${esc(meta.declaredVersion)}</code>${meta.versionMismatch ? ' <span class="badge badge-yellow">mismatch</span>' : ' <span class="badge badge-green">in sync</span>'}</td></tr>` : ''}
            <tr><td><strong>Project Root</strong></td><td><code>${esc(meta.projectRoot)}</code></td></tr>
            <tr><td><strong>Files Scanned</strong></td><td>${meta.totalFilesScanned.toLocaleString()}</td></tr>
            ${isRescriptProject ? `<tr><td><strong>Binding Files Found</strong></td><td>${meta.bindingFilesFound}</td></tr>` : ''}
            <tr><td><strong>Files with Parse Errors</strong></td><td>${meta.filesWithParseErrors}</td></tr>
            <tr><td><strong>Scan Duration</strong></td><td>${(meta.scanDurationMs / 1000).toFixed(2)}s</td></tr>
            <tr><td><strong>Tool Version</strong></td><td>${esc(meta.toolVersion)}</td></tr>
            <tr><td><strong>Generated At</strong></td><td>${new Date(meta.generatedAt).toLocaleString()}</td></tr>
            <tr><td><strong>Language Breakdown</strong></td><td>
              ${isRescriptProject ? `ReScript: ${languageBreakdown.rescript.files} files (${languageBreakdown.rescript.usages} usages) &nbsp;·&nbsp;` : ''}
              TypeScript: ${languageBreakdown.typescript.files} files (${languageBreakdown.typescript.usages} usages)
            </td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</main>

<script>
  // ── Tab switching ─────────────────────────────────────────────────────────
  function switchTab(id) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('tab-' + id);
    const btn   = document.querySelector('.tab-btn[data-tab="' + id + '"]');
    if (panel) panel.classList.add('active');
    if (btn)   btn.classList.add('active');
    // Resize charts if switching to overview
    if (id === 'overview') {
      setTimeout(() => {
        if (window._topChart) window._topChart.resize();
        if (window._adoptChart) window._adoptChart.resize();
        if (window._migrChart) window._migrChart.resize();
      }, 10);
    }
  }

  // ── Cross-tab component deep linking ─────────────────────────────────────
  // Intercept all href="#comp-X" clicks — switch to Components tab, then scroll
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#comp-"]');
    if (!link) return;
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1); // "comp-Button"
    switchTab('components');
    requestAnimationFrame(function() {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Chart data ────────────────────────────────────────────────────────────
  const topData   = ${topChartData};
  const adoptData = ${adoptionChartData};
  const migrData  = ${migrationChartData};

  window._topChart = new Chart(document.getElementById('topChart'), {
    type: 'bar',
    data: {
      labels: topData.map(d => d.name),
      datasets: [{
        data: topData.map(d => d.count),
        backgroundColor: '#1f6feb',
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8b949e', font: { size: 11 } }, grid: { color: '#21262d' } },
        y: { ticks: { color: '#8b949e', font: { size: 11 } }, grid: { color: '#21262d' } }
      }
    }
  });

  window._adoptChart = new Chart(document.getElementById('adoptionChart'), {
    type: 'doughnut',
    data: {
      labels: adoptData.map(d => d.label),
      datasets: [{ data: adoptData.map(d => d.value), backgroundColor: adoptData.map(d => d.color), borderWidth: 0 }]
    },
    options: { plugins: { legend: { labels: { color: '#8b949e', font: { size: 12 } } } }, cutout: '60%' }
  });

  ${
      isRescriptProject
          ? `
  window._migrChart = new Chart(document.getElementById('migrationChart'), {
    type: 'doughnut',
    data: {
      labels: migrData.map(d => d.label),
      datasets: [{ data: migrData.map(d => d.value), backgroundColor: migrData.map(d => d.color), borderWidth: 0 }]
    },
    options: { plugins: { legend: { labels: { color: '#8b949e', font: { size: 12 } } } }, cutout: '60%' }
  });`
          : ''
  }

  // ── Expand/collapse file lists ────────────────────────────────────────────
  function toggleFiles(btn) {
    const list = btn.nextElementSibling;
    const hidden = list.classList.toggle('hidden');
    btn.textContent = hidden
      ? btn.textContent.replace('▼', '▶')
      : btn.textContent.replace('▶', '▼');
  }

  // ── Component table search ────────────────────────────────────────────────
  function filterComponents(query) {
    const q = query.toLowerCase().trim();
    let visible = 0;
    document.querySelectorAll('#comp-tbody .comp-row').forEach(row => {
      const name = row.dataset.name || '';
      const show = !q || name.includes(q);
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const countEl = document.getElementById('comp-count');
    if (countEl) countEl.textContent = q ? visible + ' / ${componentMetrics.length}' : '${componentMetrics.length}';
  }

  // ── File table search ─────────────────────────────────────────────────────
  function filterFiles(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('#file-tbody .file-row').forEach(row => {
      const path = row.dataset.path || '';
      row.style.display = (!q || path.includes(q)) ? '' : 'none';
    });
  }
</script>
</body>
</html>`
}

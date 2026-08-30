# Chart surfaces — next wave specs

Three chart-shaped surfaces web ChartV2 covers today aren't reachable from the
native `Chart` yet. Each has different scope and different dependencies. This
doc is the spec backlog for them.

Web reference: `apps/ascent` stories and screenshots under `Meta/Charts`.
Native parity target: same data in → same visual structure out, but with
Blend token styling everywhere Highcharts would have taken over on web.

A shared baseline for all three:

- They reuse `ChartContainer` / `ChartHeader` / `ChartLegend` from the current
  chart suite.
- They subscribe to `CHARTSV2` tokens. New slots must be added to web's token
  factories first, then mirrored here through `nativeTokenRegistry`.
- They all speak the same controlled/uncontrolled `hiddenKeys` +
  `onLegendToggle` contract the existing `Chart` uses.

---

## 1. ChartDashboard — N charts sharing one legend

**What it is.** A grid of small charts (web shows 2×4, but any columns) with a
single legend on top that toggles series across every chart in the grid at
once. Tapping "Overall" fades/re-hides the line in all 8 panels.

**Why the existing `Chart` can't do this.** Each `Chart` owns its own legend
and its own hidden-key state. Reaching across children needs a parent that
holds the color map, the hidden-keys set, and the legend click handler. That's
a wrapper component, not a chart type.

### Props

```ts
export type ChartDashboardSeries = {
    /** Legend key. Same name across every panel it appears in. */
    name: string
    /** Color shared across the dashboard. Defaults to palette. */
    color?: string
}

export type ChartDashboardPanel = {
    /** Panel title — 'MOTO', 'THREE_DS', etc. */
    title: string
    /** Series this panel renders. Names must exist in dashboard `series`. */
    seriesNames: string[]
    /** Chart type for this panel (line/area/column/scatter). */
    type?: ChartType
    /** Per-panel data for each series. */
    data: ChartSeries[]
    /** Optional per-panel header. */
    header?: React.ReactNode
}

export type ChartDashboardProps = {
    /** All series the dashboard legend enumerates, in legend order. */
    series: ChartDashboardSeries[]
    /** Panels to render. */
    panels: ChartDashboardPanel[]
    /** Grid columns per breakpoint (native: fixed or via hook). Default 2. */
    columns?: number
    /** Panel aspect/height. Default 200. */
    panelHeight?: number
    /** Header shown above the dashboard (not per panel). */
    header?: React.ReactNode
    /** Controlled hidden keys — affects every panel's render. */
    hiddenKeys?: string[]
    onLegendToggle?: (key: string) => void
    /** Custom legend (defaults to ChartLegend with shared series). */
    renderLegend?: (state: {
        items: ChartLegendItem[]
        onToggle: (key: string) => void
    }) => React.ReactNode
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
```

### Behavioral notes

- Hidden keys apply to **all** panels; a panel whose every series is hidden
  still renders its header and an empty box, not removed. (Sanity check for
  toggle-off-then-back-on UX.)
- Colors are resolved **once at the dashboard level**. Each panel receives a
  pre-colored `ChartSeries[]` — the dashboard is where palette rotation
  happens, not inside each `Chart`. Otherwise the same series shows up under
  different colors in different panels.
- Cross-chart interactions like "highlight series on press-and-hold" are out
  of scope for v1.

### Implementation sketch

```
ChartDashboard
  ├─ ChartContainer
  │   ├─ ChartHeader (dashboard-level)
  │   ├─ ChartLegend (shared, controlled by dashboard's hiddenKeys)
  │   └─ View flexDirection=row flexWrap=wrap
  │       └─ panels.map(panel =>
  │              <View style={{ width: `${100 / columns}%`, padding: gap }}>
  │                  <Chart
  │                      type={panel.type ?? 'line'}
  │                      series={colorize(panel.data, dashboardSeq)}
  │                      hiddenKeys={hiddenKeys}
  │                      showLegend={false}   // ← the dashboard owns it
  │                      showXAxis={false}    // panels are compact
  │                      showYAxis={false}
  │                      showGrid={false}
  │                      height={panelHeight}
  │                  />
  │              </View>)
```

Colors: `paletteColor(index)` from the existing `chart.types.ts`, indexed by
global series position (not per-panel). Cache the assignment via `useMemo`.

### Tests to write

- Toggling a legend key hides that series in every panel that has it.
- A panel containing only hidden series still renders its title.
- Controlled + uncontrolled `hiddenKeys` both drive the panels.
- Empty panels / empty `series` / empty `panels` render correctly.
- Skeleton renders once (not N nested skeletons).

### Est. scope

Medium. ~1–2 days + tests. Victory handles each panel; the wrapper is the
work.

---

## 2. SankeyChart — flow visualization

**What it is.** A node-link diagram where the _width_ of each ribbon is data.
Web gets this for free from `Highcharts.sankey`. Victory has no sankey.

**Why this is hard on RN.** The visual is a stack of cubic-bezier SVG paths
whose geometry (band thickness, cubic control points, layering) is computed
from a graph layout. You need:

1. A layout step (assign nodes to columns, compute ribbon start/end y ranges,
   sort to reduce crossings).
2. An SVG rendering step (`Path` for each ribbon, `Rect` for each node).
3. Optional interactivity (tap node → highlight its in/out ribbon set).

`react-native-svg` is already a transitive dep of Victory, so we don't add a
dependency. But the layout logic is the bulk of the work.

### Props

```ts
export type SankeyNode = {
    /** Unique id referenced by links. */
    id: string
    /**
     * Optional column override (0, 1, 2, ...). Without it, computed from
     * topological sort. Set this when you have a product-meaningful column
     * layout ('Start' | 'Step 1' | 'Step 2' | 'End').
     */
    column?: number
    /** Display name ≤ 12 chars renders next to the node; longer truncates. */
    label?: string
    /** Color override. Defaults per-column palette or per-node cycle. */
    color?: string
}

export type SankeyLink = {
    source: string // node id
    target: string // node id
    /** Ribbon width is proportional to `value`. */
    value: number
    /** Color override; defaults to the source node's color. */
    color?: string
}

export type SankeyChartProps = {
    nodes: SankeyNode[]
    links: SankeyLink[]
    /** Canvas height. Default 400. Width is measured via onLayout. */
    height?: number
    /** Fraction of canvas each column-band takes, 0–1. Default 0.6. */
    bandWidth?: number
    /** Ribbon corner curvature, highcharts' `curveFactor`. Default 0.5. */
    curveFactor?: number
    /** Highlight on tap: 'flow' | 'in' | 'out' | 'none'. Default 'flow'. */
    focusBehavior?: 'flow' | 'in' | 'out' | 'none'
    /** Callback for a node/ribbon press. type hints what was pressed. */
    onPress?: (target: { kind: 'node' | 'link'; id: string }) => void
    /** Selected id (controlled focus). */
    selectedId?: string
    /** Empty state. */
    noData?: { title?: string; subtitle?: string }
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
```

### Behavioral notes

- Layout is **deterministic**: nodes sorted within a column by descending
  outgoing value (so wide ribbons don't collide); crossing count is
  acceptable for v1.
- Node height = `bandWidth * columnHeight * (share of column total)`. A node
  with no outgoing links gets a minimum visible height (4pt) — same as a
  0-value link shows a faint ribbon for context.
- The header dropdowns in your screenshot ("Transaction Success Rate",
  "Top 5", "Hourly", "…") are **outside** the SankeyChart component — they
  belong to the host app, not the chart primitive. Same for the back chevron.
  ChartHeader is the slot that holds them.
- Default colors come from the same rotating `paletteColor` used for pie.

### Implementation sketch

```
SankeyChart (forwardRef<RNView>)
  ├─ ChartContainer
  │   ├─ ChartHeader (consumer-supplied)
  │   └─ Layout-{responsive}
  │       ├─ (empty state / skeleton)
  │       └─ Svg
  │           ├─ links (Path, fill-opacity 0.4)
  │           ├─ links (highlighted Path, full opacity if focused)
  │           ├─ nodes (Rect with rounded-2 corners)
  │           └─ node labels (SvgText)
```

The layout function is pure — `computeSankeyLayout(nodes, links, opts)`
returns `{ nodes: PositionedNode[], links: PositionedLink[] }` and is
unit-testable without rendering.

### Tests to write

- Layout: nodes land in the right column based on topology; overrides respect
  `column`.
- Layout: ribbon widths sum correctly within a column.
- Render: 0 links → noData; 0 nodes → noData.
- Press on node fires `onPress` with the right id; sets `selectedId` when
  uncontrolled.
- Skeleton renders.
- A link between nonexistent node ids throws a dev-mode error (or logs +
  drops silently; pick one and document).

### Est. scope

Large. 3–5 days including graph layout polish. Worth gating on a real
product need before building — purely decorative sankeys lower the ROI.

---

## 3. BulletChart — goal/actual segmented bar

**What it is.** The "Bank of America / Central Bank of India" rows in the
third screenshot: one horizontal bar per entity, split into colored segments
along a fixed scale, with a marker line for the target. Web renders this with
`Highcharts.bullet` or stacked columns with zero spacing.

**Why this isn't a Victory type either.** A bullet chart is one bar broken
into segments with semantic colors (typically red/yellow/green ranges), plus
one marker line across it. It _looks_ like a stacked bar, but the semantics
are different:

- Stacked bar = three independent values summing to the bar width.
- Bullet = one actual value against range boundaries (e.g. `<60` red,
  `60-90` yellow, `>90` green), bar fills up to the actual, the colored
  bands are background.

Can't be faked with existing chart types. It's a small primitive.

### Props

```ts
export type BulletRange = {
    /** Display color for this range band. */
    color: string
    /** End of this range on the value scale. Start is prev range's end (or 0). */
    end: number
    /** Optional label shown under the range on first render. */
    label?: string
}

export type Bullet = {
    /** Row label — 'Bank of America'. */
    label: string
    /** The actual value. */
    value: number
    /** Optional target marker — vertical line drawn at this x. */
    target?: number
}

export type BulletChartProps = {
    /** The category ranges, in ascending `end` order. */
    ranges: BulletRange[]
    /** Bars to render. */
    bullets: Bullet[]
    /** Canvas height per bar. Default 24. Total height = bars × height. */
    barHeight?: number
    /** Bar spacing. Default 12. */
    gap?: number
    /** Optional unit suffix shown next to labels (e.g. '%'). */
    unit?: string
    /** Labels above the bars (default) or to the left for wide viewports. */
    labelPosition?: 'top' | 'left'
    /** Highlight specific range by segment (long press). */
    onRangePress?: (bullet: Bullet, rangeIndex: number) => void
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    noData?: { title?: string; subtitle?: string }
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
```

### Behavioral notes

- Value scale is 0 → `ranges[last].end`. No auto-scale across rows; rows
  share a scale so they're comparable.
- Bar fill width is `value / max` of the canvas. The bands are solid
  background rectangles; the bar itself is a darker variant of the active
  band's color (or the brand color).
- Target marker: a 2px-wide darker line drawn at `target / max * width`,
  rendered above the bands but below the label text.
- Labels: web shows them as pill-shaped tags attached above each bar. For
  parity, use `Block` with `border` + `borderRadius` from foundation tokens
  — not a new token slot.

### Implementation sketch

This is a leaf component, not a chart. It does NOT need Victory. Render:

```
BulletChart
  └─ ChartContainer (optional wrapper for grid contexts)
      └─ View flexDirection=column gap
          └─ bullets.map(bullet =>
              <View>
                <Text>{bullet.label}</Text>
                <View height={barHeight}>
                  {ranges.map(r => <View>… background band
                  <View width={`${(bullet.value / max) * 100}%`} background: fill
                  {bullet.target != null && <View position absolute left={…} />
                </View>
              </View>)
```

No measurement needed — width is `100%` and Yoga lays it out. The only math
is the relative widths per band, which is derivable from `ranges` alone.

### Tests to write

- Left labels vs top labels.
- `value` beyond last range's end clamps to the bar end with a warning in
  dev.
- Target < value / > value renders on the correct side.
- onRangePress fires with the right range index for taps in each segment.
- Skeleton + noData states.
- Long list of bullets scrolls correctly (consumer wraps in ScrollView).

### Est. scope

Small. **1 day** including tests and a spec. Easiest of the three to ship,
highest immediate utility — the screenshot's Transaction Success Rate header

- this bullet chart + a normal `Chart` is the full page.

---

## Cross-cutting concerns

### New token slots needed

| Slot                                             | Why                               |
| ------------------------------------------------ | --------------------------------- |
| `CHARTSV2.sankey.node.{fill,borderRadius,label}` | Node rectangle + label styling.   |
| `CHARTSV2.sankey.link.{opacity,focusedOpacity}`  | Ribbon fill opacity.              |
| `CHARTSV2.bullet.barHeight/borderRadius/label`   | Bullet bar chrome.                |
| `CHARTSV2.dashboard.panelBackground/gap`         | Panel surface padding + grid gap. |

Each addition requires:

1. `packages/blend/lib/components/ChartsV2/chartV2.tokens.types.ts` — types.
2. `chartV2.light.tokens.ts` and `.dark.tokens.ts` — values.
3. `lib/node.ts` — export the new factory pieces if they're a fresh function.
4. `packages/blend-native/src/theme/nativeTokenRegistry.ts` — already wired to
   `getChartV2Tokens`, no change; new fields flow through.
5. `check-dist.mjs` — no change unless we add new exports.

### Shared infra these all depend on

- A `<ChartSubheader>` prop on `Chart` would absorb the "← UPI Outage Trend"
  sub-navigation row in screenshot 3. Right now `header` is the only slot.
  Add a second, optional one — small change.
- A shared "press-and-hold tooltip" pattern. Right now Chart has no tooltips.
  All three new surfaces (and the existing charts) need the same primitive
  for tap-and-hold data callouts. Recommend doing this as a separate spec
  before any of the three above ships without it.

### Suggested order

1. **BulletChart** — smallest, self-contained, unblocks the screenshot-3
   redesign.
2. **ChartDashboard** — medium, high visual value, quotable on the marketing
   website.
3. **SankeyChart** — biggest, spec-wide. Gate on a concrete product roadmap
   commitment; otherwise it's a lot of code for a single infographic.

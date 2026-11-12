# RFC 0008: Internationalization (i18n)

## Summary

Add locale support to Blend through a provider-level `t()` function with per-prop overrides, plus `Intl`-based date, time and number formatting. Blend ships English defaults and a typed key catalog; it ships no translated locale files and takes no i18n library dependency. No existing prop is renamed, removed, retyped, or has its default changed.

## Motivation

### Problem Statement

Blend has no locale support at all. An audit of all 86 directories in `packages/blend/lib/components` found:

- 88 static `aria-label="…"` string literals, plus more assembled by template literal
- 25 hardcoded `en-US` / `en-IN` locale tags and 36 `toLocale*` calls
- Three independent English month and weekday tables, which have drifted: one picker can show a translated month in its trigger and an English month in its grid
- English-only pluralization at a dozen or more sites — `${n} file${n !== 1 ? 's' : ''}` and `file(s)` parentheticals, which are English grammar compiled into JSX
- Accessible names built by concatenation (`', selected'`, `', today'`, `Step ${n} of ${title}`), whose word order is not portable

Two reported examples had no override of any kind: `text="Browse Files"` (`Upload/components/DefaultState.tsx`, `InputsV2/UploadV2/UploadContainerV2.tsx`) and `text="Cancel"` / `text="Apply Date"` (`DateRangePicker/components/ActionButtons.tsx`).

### Goals

- One mechanism for every user-visible string in the library
- Locale-aware dates, times and numbers, not just strings
- Zero behaviour change for existing consumers who set nothing
- Generated ReScript bindings stay clean
- A gate that stops the problem recurring

### Non-Goals

These are explicitly out of scope, and stating so is the point of listing them:

- **Right-to-left (RTL) layout.** Mirroring the component library is a separate, larger body of work.
- **Localized input parsing.** Accepting an ambiguous `11/12/2025` or non-Latin digits typed into a date field is materially harder than rendering, and a half-implementation ships a date-parsing bug. Blend renders localized output; it continues to parse only the formats it parses today.
- **Shipping translations.** Blend owns the English source of truth and the key contract. It does not own translation QA for any language.

## Proposed Solution

### Key Changes

- Three new optional props on the existing `ThemeProvider`: `locale`, `t`, `firstDayOfWeek`
- A new `lib/i18n/` leaf subtree: the resolver, the message catalog, and React-free `Intl` formatters
- A `createTranslator(...layers)` helper for consumers with no i18n runtime
- Two ESLint guards and a catalog coverage test

### Technical Details

#### Three-tier resolution

For any one string, in order:

1. **The explicit prop**, if the consumer passed one. The roughly 30 existing `*Text` / `*Label` / `*Placeholder` props become this tier, unchanged.
2. **The provider's `t(key, vars)`**, if it returned something usable.
3. **Blend's built-in English default**, from the component's catalog fragment.

```ts
export type BlendLocale = string

export type BlendTranslate = (
    key: string,
    vars?: Record<string, string>
) => string | undefined
```

Three choices in that signature are load-bearing:

- **It returns `string | undefined`.** The `undefined` is the miss signal that makes tier 3 work. The resolver also treats an empty string, and a value equal to the key, as a miss, because i18n libraries differ on which they return for an unknown key. Without that rule, a consumer whose `t` echoes unknown keys would ship raw `upload-v2.action.browse-files` text to users.
- **`vars` values are pre-stringified.** Numbers run through `Intl.NumberFormat` before interpolation, so the dictionary stays `string => string`.
- **Blend always interpolates the returned string itself.** A `t` that ignores `vars` still works, and an ICU-capable `t` that substituted first is idempotent, because no placeholder remains for Blend's pass to find.

A `t` that throws is treated as a miss and warned about once. It is consumer code running in React's render phase, so an uncaught throw would white-screen the consumer's subtree.

#### Why the props live on `ThemeProvider`, in a separate context

The consumer does not use Blend directly; they use `@juspay/rescript-blend`, generated deterministically from Blend's shipped TypeScript declarations by `@juspay/rescript-bindgen`, with versions kept 1:1. Verified generator behaviour:

| TypeScript                    | Generated ReScript                                    | Verdict                                      |
| ----------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| `text?: string`               | `text?: string`                                       | Clean                                        |
| `(key: string) => string`     | `string => string`                                    | Clean                                        |
| `labels?: { apply?: string }` | a record with a generated name such as `__typeUx2o03` | Unstable and noisy at every call site        |
| `string \| React.ReactNode`   | an `@unboxed` variant                                 | Awkward; the generator marks it `// ⓘ was …` |

`ThemeProvider` is already bound as a component, so props added to it are picked up by the next generator run with no hand-written binding. That makes extending the existing provider strictly cheaper than introducing a new required one, and it rules out nested object props and `string | ReactNode` for anything new.

The values live in their own `I18nContext`, **not** in the theme context value. This is not tidiness. React context has no selector, so any change to a context value re-renders every consumer of it, and `themeContextValue` is what all ~85 token slots subscribe to. Consumers routinely build `t` inline (`t={(k) => i18n.t(k)}`), giving it a new identity on every render, so in a shared value the entire token-consuming tree would re-render on every parent render — including components like DataTable that subscribe from hundreds of cells.

To be precise about the cost: it is re-render fan-out, **not** recomputing tokens. `resolvedComponentTokens` has its own `useMemo` keyed on `componentTokens`/`foundationTokens`/`theme`, which `t` is not part of, so `initTokens` would not re-run either way. `__tests__/context/ThemeProvider.i18n.test.tsx` asserts the context value's identity stays stable; its `initTokens` call-count check is a regression guard rather than evidence for the split.

A second, smaller reason: `ThemeContext`'s `createContext` default eagerly invokes ~100 token factories at module load so components work unprovided. The i18n default needs that same property and costs three scalars, so keeping them separate keeps it free.

Components keep working with no provider mounted: `createContext`'s default argument is a fully materialised value whose `translate` is `undefined`, which the resolver reads as "use the English default". This copies the technique `ThemeContext.tsx` already uses.

#### The dictionary path

The provider takes no `messages` object prop, because roughly 500 optional properties would come out of the generator as an unstable record type at every call site. Consumers without an i18n runtime use a helper instead:

```tsx
<ThemeProvider locale="fr-FR" t={createTranslator(frenchOverrides)}>
```

`createTranslator` applies override layers with the existing `mergeTokenTree` rather than object spread. Spread copies an explicit `undefined` over a real value; `mergeTokenTree` skips it. That is the same override semantics `ThemeProvider` already gives component tokens, and it keeps one merge implementation in the repo.

It deliberately does **not** merge onto `BLEND_MESSAGES`. Doing so would put the aggregate catalog in `createTranslator`'s runtime graph, so every consumer calling it would ship all ~500 strings. It returns `undefined` for unknown keys and lets tier 3 do the defaulting.

#### The message catalog

One flat `as const` fragment per component family, with the key union derived rather than hand-maintained:

```ts
// lib/i18n/catalog/uploadV2.messages.ts — keep this module import-free.
// Components import THIS fragment, never catalog/index.ts.
export const UPLOAD_V2_MESSAGES = {
    'upload-v2.action.browse-files': 'Browse Files',
    'upload-v2.a11y.remove-file': 'Remove {name}',
    'upload-v2.a11y.show-more-files.one': 'Show {count} more file',
    'upload-v2.a11y.show-more-files.other': 'Show {count} more files',
} as const
```

This follows the form `packages/blend-native/src/theme/nativeTokenRegistry.ts` already uses for token slots, and for the same stated reason: one `as const` object, the key union derived with `keyof typeof`, one file to edit per new string, and no `switch` to forget. Adding a component token slot on web still needs three files changed in lockstep; a message catalog is structurally the same key-to-default problem and should not repeat that.

Fragments rather than one monolith is what preserves tree-shaking: a consumer who never renders UploadV2 never ships its strings.

#### Key convention

```
{component}.{group}.{item}[.{modifier}][.{plural-category}]
```

Kebab-case segments, dot-delimited, 3 to 5 segments. `group` is a closed vocabulary: `action`, `label`, `placeholder`, `status`, `empty`, `error`, `preset`, `unit`, `a11y`. Reserving `a11y` makes "which accessible names are localized yet" a one-line grep.

Keys are flat, not nested, precisely so `keyof typeof` is the literal union directly, with no recursive path-extraction helper.

#### Interpolation and pluralization

Named `{placeholder}` interpolation plus CLDR-category key suffixes — not ICU parsing, which would mean shipping a message parser or taking a dependency. An unknown placeholder is left literal rather than blanked, so a missing variable is visible in development.

Pluralization uses `Intl.PluralRules`: correct CLDR categories, already in the platform, no dependency. English fragments declare `.one` and `.other`; a Polish or Arabic translator supplies `.few`, `.many`, `.zero` or `.two` in their own dictionary. The resolver asks for `{key}.{category}` only when the English fragment declares it, and otherwise falls back to `.other` — which is right, because the English catalog has nothing better to offer for that category.

#### Locale-aware formatting

Everything in `lib/i18n/format/` is React-free and takes `locale` as an explicit argument. Pure modules never read context, which is what lets `@juspay/blend-native` and the `./node` entry share one implementation.

`components/shared/datetime/timeCore.ts` already establishes the caching pattern and states the reason — constructing an `Intl.DateTimeFormat` costs roughly 15x what formatting with one does — along with a warn-once discipline for bad input. `formatterCache.ts` generalises it, **keyed by preset name rather than by an options object**: an options-keyed cache grows without bound if a caller builds options inline, and `JSON.stringify(options)` is sensitive to key order. The hard rule is that every `Intl` constructor in `lib/` goes through that module, so the bad-tag fallback and the warning exist in exactly one place.

Two sites are deliberately exempt and must stay exempt: `timeCore.ts` and `DateRangePicker/utils.ts` each build an `'en-US'`, `hour12: false` formatter whose output is consumed by `formatToParts` to decompose an instant into numeric parts. They display nothing, and the `'en-US'` is load-bearing for the part keying.

`getMonthNames` and `getWeekdayNames` replace the three duplicate tables, built by formatting fixed reference dates. `timeZone: 'UTC'` is mandatory when building them: without it, a machine west of UTC renders month index 0 as "December".

Two formatting decisions preserve current behaviour:

- **`locale` defaults to the explicit string `'en-US'`, never `undefined`.** Leaving it undefined lets `Intl` fall back to the host locale, which would silently change rendered dates and numbers for every existing consumer who never sets one. With an explicit default the visual diff for current users is zero.
- **`firstDayOfWeek` defaults to `1` (Monday), not locale-derived.** `Intl.Locale.prototype.getWeekInfo()` is unavailable in Firefox and older Safari/JSC, so deriving it by default would make identical props render differently per browser. `resolveFirstDayOfWeek(locale)` is exposed, feature-detected, for consumers who want CLDR behaviour. Note it converts numbering: CLDR is 1–7 with 7 = Sunday, Blend is 0–6 with 0 = Sunday.

Currency must become a prop or column config, never a locale derivation. Locale does not determine currency, and silently reformatting an INR amount as USD because the locale is `en-US` would be a data-integrity bug.

### Example Usage

```tsx
const { m, mp, pick } = useMessages(UPLOAD_V2_MESSAGES)

// Tier 1 if the consumer passed browseFilesText, else tiers 2-3.
<ButtonV2 text={pick(browseFilesText, 'upload-v2.action.browse-files')} />

// Plural, with count injected already formatted for the locale.
<span>{mp('upload-v2.a11y.show-more-files', hiddenCount)}</span>
```

`pick` tests `!== undefined`, not truthiness. `||` would make an explicit `text=""` fall through to the default and break the legitimate "render no label here" case.

A pure utility takes a resolver parameter rather than becoming a hook, since it is called from non-React code:

```ts
export const getPresetLabel = (
    preset: DateRangePreset,
    i18n?: BlendI18nHandle
): string => { … }
```

Existing one-argument callers get English, unchanged.

## Alternatives Considered

### Option 1: Slash-delimited keys, matching RFC 0005

RFC 0005 establishes `{category}/{group}/{item}` for design tokens, and this RFC deliberately diverges by using dots.

Rejected because message keys and token paths have different consumers. Tokens are paths into a tree, and slashes read naturally. Message keys are consumed by third-party translation pipelines — i18next, FormatJS, Crowdin, Lokalise — all of which key on dots. Matching 0005 would mean every consumer transforming keys on the way into their tooling. The hierarchy and the kebab-case segment style are kept; only the delimiter differs.

### Option 2: `eslint-plugin-i18next`'s `no-literal-string` rule

A published rule for exactly this problem.

Rejected for now. It works, but it needs `callees` and `words` configuration to understand Blend's `text=` and `label=` props anyway, and it adds a dependency. The repo already writes its own gates in `scripts/check-circular.mjs` and `scripts/check-dist.mjs`, so a local rule is consistent with existing practice. Worth revisiting if the local rule outgrows roughly 150 lines.

### Option 3: A `messages` object prop on the provider

The obvious API: `<ThemeProvider messages={frenchMessages}>`.

Rejected because roughly 500 optional properties generate an unstable ReScript record type at every call site. `createTranslator` gives the same ergonomics while keeping the generated bindings clean, and keeping messages off the provider is the single biggest contributor to that.

### Option 4: Putting `locale` and `t` in the existing theme context

Simpler — one context, one value.

Rejected because React context has no selector: it would put `t`'s ever-changing identity into the value all ~85 token slots subscribe to, re-rendering the whole token-consuming tree on every parent render. Note this is a re-render cost, not a token-recomputation cost — `initTokens` has its own memo that `t` would not be a dependency of.

## Impact Analysis

### Breaking Changes

None. No existing prop is renamed, removed, retyped, or has its default changed.

### Backward Compatibility

A consumer who sets no i18n props sees byte-identical output. `locale` defaults to `'en-US'`, which is what the hardcoded sites already use. Components render English with no provider mounted at all, exactly as today.

`DateRangePicker`'s pre-existing per-call `DateFormatConfig.locale` keeps its `'en-US'` destructuring default and remains the highest-precedence tier: `config.locale` → provider `locale` → `'en-US'`.

### Performance Impact

Formatters are cached per locale and preset, so the ~15x construction cost is paid once. The two-context split means a changing `t` re-renders only string consumers, not every token consumer.

### Bundle Size Impact

Roughly 500 strings is about 15 KB raw, or 4 KB gzipped, if it all shipped as one object. Per-fragment catalogs plus `"sideEffects": false` mean a consumer pays only for the components they render, and the resolver is about 1 KB.

The trap is a single wrong import: one aggregate import inside a component makes every fragment reachable from that chunk and the whole saving disappears. That is why the `no-restricted-imports` guard is load-bearing rather than stylistic.

A second-order caveat: Blend's components import each other heavily, so real tree-shaking granularity is coarser than the file layout suggests — rendering any part of DataTable likely pulls most of its fragment regardless. Measure the delta rather than assuming it.

### Migration Effort

One PR per component family. Infrastructure first, then the families the audit named, then the long tail.

## Migration Guide

### Before

```tsx
<ButtonV2 … text="Browse Files" />
```

### After

```tsx
const { pick } = useMessages(UPLOAD_V2_MESSAGES)
…
<ButtonV2 … text={pick(browseFilesText, 'upload-v2.action.browse-files')} />
```

Plus `browseFilesText?: string` in the component's types file.

### Rules that apply every time

- Add a new prop only where none exists for that string, and only as an optional `string`.
- Never a nested `labels={{…}}` prop, and never `string | ReactNode` on anything new.
- Only literals whose current default is hardcoded English get a key. A prop that currently defaults to `undefined` and renders nothing must keep rendering nothing.
- A string already overridable by a prop still gets a key, so `t` works for consumers who do not pass that prop.
- Never concatenate translated fragments. Whole-sentence keys with placeholders, because word order is not portable.
- Accessible names get a catalog key under the `a11y` group and **no** new prop. Eighty-eight new props is API bloat nobody asked for, and the provider `t` already gives full override power. One exception: where a visible-text prop already exists and the accessible name mirrors it, derive both from the same resolved string, so a consumer setting the visible prop fixes the accessible name automatically.
- `role`, `aria-labelledby`, `aria-controls` and `data-*` are identifiers and are never localized.
- Where one derived value feeds both a `data-*` attribute and visible text, compute it **twice** rather than localizing in place. `createCalendarMonthData` returns `monthName` (pinned English, consumed by the `data-id` on the month heading) alongside `monthLabel` (localized, rendered). Localizing the single field would have silently changed every non-English consumer's selectors; leaving it alone left an English month above localized day names, which is how the gap was reported on PR #1834.
- Grep for **every** renderer of a string before calling a family done. Two traps surfaced in review:
    - `DateRangePicker` has two footers — `components/ActionButtons.tsx` (mobile drawer, "Apply Date") and a local `FooterControls` in `DateRangePicker.tsx` (desktop, "Apply"). Both are live.
    - `formatTriggerDisplay` only runs when the consumer passes a `formatConfig`. The **default** trigger path is `formatDateDisplay`, so migrating only the former left the common case English.
- A `useCallback` or `useMemo` that resolves a message must list `locale` and `m` in its dependency array, or the first render's language sticks when the provider locale changes.

## Implementation Plan

1. **Infrastructure** — all of `lib/i18n/`, the three `ThemeProvider` props, the `main.ts` and `node.ts` exports, `test-utils` `providerProps`, the two lint guards, `__tests__/i18n/**`, this RFC, the Storybook locale toolbar.
2. **Upload and UploadV2** — the first reported example, plus consolidating three duplicate string tables that would otherwise drift.
3. **DateRangePicker, SingleDatePicker, TimePicker** — the second reported example, plus `shared/datetime`.
4. **DataTable** — the largest block, including pagination and the `en-IN` formatters.
5. **Select and MultiSelect** — the empty-state strings and the leaked demo defaults.
6. **Charts and StatCard** — datetime labels through `Intl`, compact numbers, relative time.
7. **Enforce `no-literal-strings`** across the migrated families.
8. **Native parity** — `BlendNativeProvider`, consuming the same pure modules through `./node`.

Infrastructure lands its provider props even though no component uses them yet, so they catch the earliest possible binding-generator run. Nothing downstream is blocked by that, because unmigrated components simply render English.

### Packaging decisions

- **Extend `./node`; do not add an `./i18n` subpath.** `mergeTokenTree` is the precedent — it lives in `node.ts` specifically so web and native share one implementation. A new subpath would need a vite entry, a `package.json#exports` block, and alias entries in seven places repo-wide.
- **Name the source directory `lib/i18n/`, and never name a vite entry `i18n`.** `dist/` mirrors the source tree for declarations, so `lib/i18n/` emits `dist/i18n/*.d.ts`. An entry named `i18n` would emit `dist/i18n.d.ts` beside that directory, and in TypeScript module resolution a file always beats a directory — the documented issue #1556 class, guarded by `check-dist.mjs` Check 1.

## Risks and Mitigations

### Risk 1: `'AM' | 'PM'` is a data type, not display text

`timeCore.ts` has `to12Hour` returning `period: 'AM' | 'PM'`, `from12Hour(hour, period)` consuming it, and a cast of parsed input to the same union. Localizing it as if it were a label would break time parsing — the most likely way this work introduces a functional rather than cosmetic bug.

**Mitigation**: localize only the rendered label in `TimePicker/TimeColumns.tsx`, where the option list keys off a numeric index rather than the string. A loud comment on the union, plus a test that `from12Hour` is unaffected by the provider locale.

### Risk 2: SSR hydration mismatch

`Intl.PluralRules` and `Intl.NumberFormat` are universal, so availability is not the hazard. A small-ICU Node build returning English month names server-side while the browser returns French is: that produces a hydration warning on every calendar.

**Mitigation**: `Intl.DateTimeFormat.supportedLocalesOf([locale])` at the cache boundary plus a warn-once, so the mismatch is reported rather than mysterious. Note the repo declares no `engines` floor, so rely on nothing newer than Node 20 ships.

### Risk 3: Weekday header width is a real visual change

The old hardcoded table returned two-letter `'Mo'`. `Intl`'s nearest options are `'short'` (`'Mon'`) and `'narrow'` (`'M'`, where T/T and S/S collide in English).

**Mitigation**: use `'short'`, review via visual diff, and expose `weekdayFormat?: 'narrow' | 'short'`. Do **not** truncate `'short'` to two characters — that mangles CJK and Cyrillic. Relatedly, `getMonthHeight` hardcodes pixel math, so longer localized month names can wrap the header and break virtualized scroll offsets; check against `de-DE` ("September").

### Risk 4: Intl output varies across ICU versions

Day-period and short-weekday output differ subtly between Node versions — "3:45 PM" versus "3:45 p.m.".

**Mitigation**: assert structure, not exact strings. `toMatch(/\d{1,2}:\d{2}/)`, array length 12, index 0 not equal to index 11. Exact-output snapshots on `Intl` are a known flake source.

### Risk 5: ReScript binding lag

`@juspay/rescript-blend` is pinned exactly and already trails the library, so new provider props are invisible to the ReScript app until the binding package regenerates and publishes a matching version.

**Mitigation**: a schedule dependency rather than a design risk — raise with whoever owns the binding repo. After the first regeneration, grep the output for `// ⓘ was` on `t`: if `vars` degrades, narrowing to `(key: string) => string | undefined` costs nothing, because Blend interpolates the returned string itself.

## Success Metrics

- [ ] No hardcoded user-visible English literal remains in a migrated component family
- [ ] `no-literal-strings` is an error across `lib/components/**`
- [ ] A consumer setting no i18n props sees byte-identical rendered output
- [ ] The pseudo-locale Storybook toolbar shows no unbracketed English in migrated families
- [ ] Measured bundle delta for a single-component consumer stays under 2 KB gzipped

## Unresolved Questions

1. Should `getDayNames` be removed in a future major, or kept indefinitely as a deprecated alias?
2. Does any consumer rely on the exact two-letter weekday header width, such that `weekdayFormat` needs to default to `'narrow'` for them?
3. Who owns regenerating `@juspay/rescript-blend` once the provider props land?

## Related RFCs

- [RFC 0003](./0003-accessibility-standards.md) - Accessibility standards; mandates accessible names, now also requires localizing them
- [RFC 0005](./0005-token-naming-conventions.md) - Token naming conventions; the key grammar here is hierarchical in the same spirit but dot-delimited
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle size optimization; the per-fragment catalog and the import guard follow from it
- [RFC 0007](./0007-component-refactoring-standards.md) - Component refactoring standards

## References

- [Unicode CLDR Plural Rules](https://cldr.unicode.org/index/cldr-spec/plural-rules) - The plural categories `Intl.PluralRules` implements
- [MDN: Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) - Platform support
- [MDN: Intl.Locale.prototype.getWeekInfo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo) - Including the CLDR 1-7 numbering and its gaps
- [DTCG specification](https://tr.designtokens.org/) - Referenced by RFC 0005

---

**Discussion**: TBD

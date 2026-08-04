# TODOs

- [ ] In the next major release, formally deprecate and remove the legacy `MultiSelect` and `MultiSelectV2` per-item `onChange` callbacks. Provide migration guidance to use `onSelectionChange`, which returns the complete resulting selection once per user gesture.
- [ ] Try swapping vitest's `environment` from `jsdom` to `happy-dom` for suite speed. `happy-dom` is generally faster than `jsdom` but has looser DOM-spec fidelity — would need a full green run (all 174+ files) plus a check that jest-axe, styled-components, and Radix portal-based components (Popover/Menu/Dropdown) still behave correctly before adopting. Deferred from the vitest concurrency/speed pass on `fix-parallel-test-flakes` (see `.context/test-time-loop.md`).

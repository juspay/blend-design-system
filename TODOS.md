# TODOs

- [ ] In the next major release, formally deprecate and remove the legacy `MultiSelect` and `MultiSelectV2` per-item `onChange` callbacks. Provide migration guidance to use `onSelectionChange`, which returns the complete resulting selection once per user gesture.
- [ ] **Priority:** P0 — `SingleSelectV2.test.tsx > filters virtualized list via search input` times out at 5000ms under the full parallel `pnpm test:blend:run` suite, but passes cleanly in isolation (1.9s). Neither the test nor `SingleSelectV2` source were touched by `multiselect-selection-callback`; last touched by Mihir Jaiswal. Noticed by `/ship` on the `multiselect-selection-callback` branch — investigate whether this is worker-contention flakiness or a real intermittent bug in the virtualized filter.
    ```
    Error: Test timed out in 5000ms.
    ❯ __tests__/components/SingleSelectV2/SingleSelectV2.test.tsx:121:5
    ```

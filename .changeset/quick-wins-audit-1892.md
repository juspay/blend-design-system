---
'@juspay/blend-design-system': patch
---

Apply the quick wins from the audit in #1892: remove the debug className from Alert and AlertV2 and the shipped console.log from the Sidebar, drop the unused @types/styled-components v5 dependency, list package.json exports types-first with a package.json subpath, replace sideEffects:false with an explicit list, strip the demo defaults from Select, add the missing BUTTON_GROUP and MOBILE_NAVIGATION entries to the v1 deprecation map, remove the dead getPositionPropName helper, the unreachable useTheme guard, the duplicate transition entries in Block and the unused testResponsiveBreakpoints helper, and export the Group enums as values.

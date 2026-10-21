---
'blend-native': patch
---

`SideDrawer` (and the `Sidebar` mobile drawer built on it) now stays mounted while closed — inert, with no touches and hidden from assistive tech — instead of mounting on open. A large drawer used to take longer to mount than the 400ms enter animation, so it appeared fully open with no slide; it now slides in from the first frame.

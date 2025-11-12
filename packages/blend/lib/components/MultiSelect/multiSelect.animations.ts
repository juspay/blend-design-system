const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

// Reusable opacity keyframes
const opacityKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`

// Reusable transform keyframes
const transformKeyframes = `
  @keyframes slideUp {
    from { transform: translateY(8px); }
    to { transform: translateY(0); }
  }

  @keyframes slideDown {
    from { transform: translateY(-8px); }
    to { transform: translateY(0); }
  }

  @keyframes slideLeft {
    from { transform: translateX(8px); }
    to { transform: translateX(0); }
  }

  @keyframes slideRight {
    from { transform: translateX(-8px); }
    to { transform: translateX(0); }
  }
`

/**
 * Main dropdown content animations
 * Applied based on the dropdown's position (data-side attribute)
 */
export const dropdownContentAnimations = `
  ${opacityKeyframes}
  ${transformKeyframes}

  /* Side-aware opening animations */
  &[data-state="open"][data-side="top"] {
    animation: fadeIn 550ms ${easing}, slideDown 350ms ${easing};
  }

  &[data-state="open"][data-side="bottom"] {
    animation: fadeIn 550ms ${easing}, slideUp 350ms ${easing};
  }

  &[data-state="open"][data-side="left"] {
    animation: fadeIn 550ms ${easing}, slideRight 350ms ${easing};
  }

  &[data-state="open"][data-side="right"] {
    animation: fadeIn 550ms ${easing}, slideLeft 350ms ${easing};
  }

  /* Side-aware closing animations */
  &[data-state="closed"][data-side="top"] {
    animation: fadeOut 350ms ${easing}, slideUp 250ms ${easing};
  }

  &[data-state="closed"][data-side="bottom"] {
    animation: fadeOut 350ms ${easing}, slideDown 250ms ${easing};
  }

  &[data-state="closed"][data-side="left"] {
    animation: fadeOut 350ms ${easing}, slideLeft 250ms ${easing};
  }

  &[data-state="closed"][data-side="right"] {
    animation: fadeOut 350ms ${easing}, slideRight 250ms ${easing};
  }

  /* Initial state */
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
`

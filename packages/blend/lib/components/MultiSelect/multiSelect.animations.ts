/**
 * MultiSelect Dropdown Animations
 *
 * Shadcn-style animations with zoom + slide + fade
 * - Combined animation in single keyframe
 * - Side-aware based on dropdown position
 * - Smooth spring easing
 */

const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Main dropdown content animations (Shadcn-style)
 */
export const dropdownContentAnimations = `
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  /* Opening animations - Shadcn style with zoom */
  &[data-side='bottom'][data-state='open'] {
    animation: slideInFromTop 200ms ${easing};
  }
  &[data-side='bottom'][data-state='closed'] {
    animation: slideOutToTop 200ms ${easing};
  }

  &[data-side='top'][data-state='open'] {
    animation: slideInFromBottom 200ms ${easing};
  }
  &[data-side='top'][data-state='closed'] {
    animation: slideOutToBottom 200ms ${easing};
  }

  &[data-side='right'][data-state='open'] {
    animation: slideInFromLeft 200ms ${easing};
  }
  &[data-side='right'][data-state='closed'] {
    animation: slideOutToLeft 200ms ${easing};
  }

  &[data-side='left'][data-state='open'] {
    animation: slideInFromRight 200ms ${easing};
  }
  &[data-side='left'][data-state='closed'] {
    animation: slideOutToRight 200ms ${easing};
  }

  /* Shadcn-style keyframes with zoom + slide + fade */
  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideOutToTop {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideOutToBottom {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(8px) scale(0.95);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes slideOutToLeft {
    from {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(-8px) scale(0.95);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes slideOutToRight {
    from {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(8px) scale(0.95);
    }
  }
`

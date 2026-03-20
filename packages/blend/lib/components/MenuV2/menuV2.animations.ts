const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

export const menuV2ContentAnimations = `
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  &[data-side='bottom'][data-state='open'] {
    animation: menuV2SlideInFromTop 400ms ${easing};
  }
  &[data-side='bottom'][data-state='closed'] {
    animation: menuV2SlideOutToTop 300ms ${easing};
  }

  &[data-side='top'][data-state='open'] {
    animation: menuV2SlideInFromBottom 400ms ${easing};
  }
  &[data-side='top'][data-state='closed'] {
    animation: menuV2SlideOutToBottom 300ms ${easing};
  }

  &[data-side='right'][data-state='open'] {
    animation: menuV2SlideInFromLeft 400ms ${easing};
  }
  &[data-side='right'][data-state='closed'] {
    animation: menuV2SlideOutToLeft 300ms ${easing};
  }

  &[data-side='left'][data-state='open'] {
    animation: menuV2SlideInFromRight 400ms ${easing};
  }
  &[data-side='left'][data-state='closed'] {
    animation: menuV2SlideOutToRight 300ms ${easing};
  }

  @keyframes menuV2SlideInFromTop {
    from { opacity: 0; transform: translateY(-8px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes menuV2SlideOutToTop {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(-8px) scale(0.95); }
  }
  @keyframes menuV2SlideInFromBottom {
    from { opacity: 0; transform: translateY(8px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes menuV2SlideOutToBottom {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(8px) scale(0.95); }
  }
  @keyframes menuV2SlideInFromLeft {
    from { opacity: 0; transform: translateX(-8px) scale(0.95); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes menuV2SlideOutToLeft {
    from { opacity: 1; transform: translateX(0) scale(1); }
    to { opacity: 0; transform: translateX(-8px) scale(0.95); }
  }
  @keyframes menuV2SlideInFromRight {
    from { opacity: 0; transform: translateX(8px) scale(0.95); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes menuV2SlideOutToRight {
    from { opacity: 1; transform: translateX(0) scale(1); }
    to { opacity: 0; transform: translateX(8px) scale(0.95); }
  }
`

export const menuV2SubmenuContentAnimations = `
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  &[data-side='right'][data-state='open'] {
    animation: menuV2SlideInFromLeft 400ms ${easing};
  }
  &[data-side='right'][data-state='closed'] {
    animation: menuV2SlideOutToLeft 300ms ${easing};
  }
  &[data-side='left'][data-state='open'] {
    animation: menuV2SlideInFromRight 400ms ${easing};
  }
  &[data-side='left'][data-state='closed'] {
    animation: menuV2SlideOutToRight 300ms ${easing};
  }
`

import { WCAGCriterion, WCAGLevel, WCAGPrinciple } from './types'

export const WCAG_CRITERIA: WCAGCriterion[] = [
    // PERCEIVABLE - Level A
    {
        id: '1.1.1',
        number: '1.1.1',
        name: 'Non-text Content',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.PERCEIVABLE,
        description: 'All non-text content has a text alternative',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content',
        checkpoints: [
            'Images have alt text',
            'Icons have accessible labels',
            'Decorative images marked with aria-hidden or empty alt',
            'Complex images have detailed descriptions',
        ],
    },
    {
        id: '1.3.1',
        number: '1.3.1',
        name: 'Info and Relationships',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Information, structure, and relationships can be programmatically determined',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships',
        checkpoints: [
            'Semantic HTML elements used correctly',
            'ARIA roles match the component purpose',
            'Headings used to structure content',
            'Lists marked up properly',
            'Form labels properly associated',
        ],
    },
    {
        id: '1.3.2',
        number: '1.3.2',
        name: 'Meaningful Sequence',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Reading sequence is correct when content is presented sequentially',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence',
        checkpoints: [
            'Tab order follows visual order',
            'DOM order is logical',
            'CSS positioning does not break reading order',
        ],
    },
    {
        id: '1.3.3',
        number: '1.3.3',
        name: 'Sensory Characteristics',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Instructions do not rely solely on sensory characteristics',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics',
        checkpoints: [
            'Instructions not based solely on shape',
            'Instructions not based solely on size',
            'Instructions not based solely on visual location',
            'Instructions not based solely on orientation',
            'Instructions not based solely on sound',
        ],
    },
    {
        id: '1.4.1',
        number: '1.4.1',
        name: 'Use of Color',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Color is not the only visual means of conveying information',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color',
        checkpoints: [
            'Error states indicated by icon/text, not just color',
            'Required fields marked with asterisk/text, not just color',
            'Link text underlined or has indicator beyond color',
            'Status indicators use text/icons in addition to color',
        ],
    },
    {
        id: '1.4.2',
        number: '1.4.2',
        name: 'Audio Control',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.PERCEIVABLE,
        description: 'Mechanism to pause, stop, or control volume for audio',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-control',
        checkpoints: [
            'Auto-playing audio can be paused',
            'Auto-playing audio can be stopped',
            'Audio volume can be controlled',
        ],
    },

    // PERCEIVABLE - Level AA
    {
        id: '1.4.3',
        number: '1.4.3',
        name: 'Contrast (Minimum)',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Text has contrast ratio of at least 4.5:1 (3:1 for large text)',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum',
        checkpoints: [
            'Normal text (< 18pt) has 4.5:1 contrast ratio',
            'Large text (>= 18pt or >= 14pt bold) has 3:1 contrast ratio',
            'Text over images has sufficient contrast',
            'Placeholder text has sufficient contrast',
        ],
    },
    {
        id: '1.4.4',
        number: '1.4.4',
        name: 'Resize Text',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Text can be resized up to 200% without loss of content or functionality',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text',
        checkpoints: [
            'Text can scale to 200% without horizontal scrolling',
            'No loss of content when text is zoomed',
            'No loss of functionality when text is zoomed',
            'Relative units used for text sizing',
        ],
    },
    {
        id: '1.4.5',
        number: '1.4.5',
        name: 'Images of Text',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Text used instead of images of text, except for customizable or essential cases',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text',
        checkpoints: [
            'Text rendered as text, not images',
            'CSS used for text styling instead of images',
            'SVG text used when vector graphics needed',
        ],
    },
    {
        id: '1.4.10',
        number: '1.4.10',
        name: 'Reflow',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Content reflows to single column at 320px width without loss of information',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow',
        checkpoints: [
            'Content adapts to 320px width',
            'No horizontal scrolling at 400% zoom',
            'All functionality available when reflowed',
            'Responsive design implemented',
        ],
    },
    {
        id: '1.4.11',
        number: '1.4.11',
        name: 'Non-text Contrast',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description: 'UI components and graphics have 3:1 contrast ratio',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast',
        checkpoints: [
            'Interactive elements have 3:1 contrast with background',
            'Focus indicators have 3:1 contrast',
            'Form field borders have 3:1 contrast',
            'Icons and graphics have 3:1 contrast',
        ],
    },
    {
        id: '1.4.12',
        number: '1.4.12',
        name: 'Text Spacing',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Content is readable and functional when text spacing is increased',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing',
        checkpoints: [
            'Line height at least 1.5x font size',
            'Paragraph spacing at least 2x font size',
            'Letter spacing at least 0.12x font size',
            'Word spacing at least 0.16x font size',
        ],
    },
    {
        id: '1.4.13',
        number: '1.4.13',
        name: 'Content on Hover or Focus',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Additional content on hover/focus is dismissible, hoverable, and persistent',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus',
        checkpoints: [
            'Hover content can be dismissed without moving pointer',
            'Pointer can move over hover content',
            'Hover content remains visible until dismissed',
        ],
    },

    // PERCEIVABLE - Level AAA
    {
        id: '1.4.6',
        number: '1.4.6',
        name: 'Contrast (Enhanced)',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description:
            'Text has contrast ratio of at least 7:1 (4.5:1 for large text)',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced',
        checkpoints: [
            'Normal text has 7:1 contrast ratio',
            'Large text has 4.5:1 contrast ratio',
            'All interactive text meets enhanced contrast',
        ],
    },
    {
        id: '1.4.8',
        number: '1.4.8',
        name: 'Visual Presentation',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.PERCEIVABLE,
        description: 'Visual presentation of text allows customization',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation',
        checkpoints: [
            'Foreground and background colors can be selected',
            'Width is no more than 80 characters',
            'Text is not fully justified',
            'Line spacing is at least 1.5 within paragraphs',
            'Paragraph spacing is at least 1.5x larger than line spacing',
            'Text can be resized without assistive technology up to 200%',
        ],
    },

    // OPERABLE - Level A
    {
        id: '2.1.1',
        number: '2.1.1',
        name: 'Keyboard',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'All functionality available from keyboard',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard',
        checkpoints: [
            'All interactive elements keyboard accessible',
            'No keyboard traps',
            'Custom controls have keyboard support',
            'Keyboard shortcuts documented',
        ],
    },
    {
        id: '2.1.2',
        number: '2.1.2',
        name: 'No Keyboard Trap',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Keyboard focus can always be moved away from component',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap',
        checkpoints: [
            'Tab key can move focus out of component',
            'Escape key exits modal/overlay',
            'Standard keyboard navigation always works',
            'Documentation provided for non-standard keyboard methods',
        ],
    },
    {
        id: '2.1.4',
        number: '2.1.4',
        name: 'Character Key Shortcuts',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Single character shortcuts can be turned off or remapped',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts',
        checkpoints: [
            'Single key shortcuts can be disabled',
            'Single key shortcuts can be remapped',
            'Single key shortcuts only active when component has focus',
        ],
    },
    {
        id: '2.2.1',
        number: '2.2.1',
        name: 'Timing Adjustable',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Time limits can be turned off, adjusted, or extended',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable',
        checkpoints: [
            'User can turn off time limit',
            'User can adjust time limit before encountering it',
            'User can extend time limit',
            'Time limit is at least 20 hours',
        ],
    },
    {
        id: '2.2.2',
        number: '2.2.2',
        name: 'Pause, Stop, Hide',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description:
            'Moving, blinking, scrolling content can be paused, stopped, or hidden',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide',
        checkpoints: [
            'Auto-updating content can be paused',
            'Animations can be stopped',
            'Carousels can be paused',
            'Scrolling content can be paused',
        ],
    },
    {
        id: '2.3.1',
        number: '2.3.1',
        name: 'Three Flashes or Below Threshold',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'No content flashes more than 3 times per second',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold',
        checkpoints: [
            'No flashing content above 3 times per second',
            'Flash below general flash threshold',
            'Animations do not trigger seizures',
        ],
    },
    {
        id: '2.4.1',
        number: '2.4.1',
        name: 'Bypass Blocks',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Mechanism to bypass repeated blocks of content',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks',
        checkpoints: [
            'Skip links provided',
            'Proper heading structure',
            'Landmark regions used',
        ],
    },
    {
        id: '2.4.2',
        number: '2.4.2',
        name: 'Page Titled',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Pages have descriptive titles',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/page-titled',
        checkpoints: [
            'Page has title element',
            'Title describes page content',
            'Title is concise and descriptive',
        ],
    },
    {
        id: '2.4.3',
        number: '2.4.3',
        name: 'Focus Order',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description:
            'Focusable components receive focus in meaningful sequence',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-order',
        checkpoints: [
            'Tab order is logical',
            'Focus order preserves meaning',
            'Focus order matches visual order',
            'Modal focus management is correct',
        ],
    },
    {
        id: '2.4.4',
        number: '2.4.4',
        name: 'Link Purpose (In Context)',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description:
            'Purpose of each link can be determined from link text or context',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context',
        checkpoints: [
            'Link text describes destination',
            'Links have accessible names',
            'Context provides link purpose',
        ],
    },
    {
        id: '2.5.1',
        number: '2.5.1',
        name: 'Pointer Gestures',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description:
            'Multi-point or path-based gestures have single-pointer alternative',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures',
        checkpoints: [
            'Multi-finger gestures have single-pointer alternative',
            'Path-based gestures have alternative',
            'Drag operations have click alternative',
        ],
    },
    {
        id: '2.5.2',
        number: '2.5.2',
        name: 'Pointer Cancellation',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Actions can be undone or aborted',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation',
        checkpoints: [
            'Up-event used for activation',
            'Down-event can be aborted',
            'Undo mechanism available',
        ],
    },
    {
        id: '2.5.3',
        number: '2.5.3',
        name: 'Label in Name',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Accessible name contains visible label text',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name',
        checkpoints: [
            'Accessible name includes visible label',
            'Visible label matches accessible name',
            'Icon buttons have labels',
        ],
    },
    {
        id: '2.5.4',
        number: '2.5.4',
        name: 'Motion Actuation',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Motion-based functionality has UI alternative',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation',
        checkpoints: [
            'Shake gestures have UI alternative',
            'Tilt gestures have UI alternative',
            'Motion can be disabled',
        ],
    },

    // OPERABLE - Level AA
    {
        id: '2.4.5',
        number: '2.4.5',
        name: 'Multiple Ways',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Multiple ways to locate pages within a set',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways',
        checkpoints: [
            'Search functionality available',
            'Site map provided',
            'Navigation menu available',
            'Breadcrumbs provided',
        ],
    },
    {
        id: '2.4.6',
        number: '2.4.6',
        name: 'Headings and Labels',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Headings and labels describe topic or purpose',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels',
        checkpoints: [
            'Headings are descriptive',
            'Labels are descriptive',
            'Headings and labels are unique',
        ],
    },
    {
        id: '2.4.7',
        number: '2.4.7',
        name: 'Focus Visible',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Keyboard focus indicator is visible',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible',
        checkpoints: [
            'Focus indicator has sufficient contrast',
            'Focus indicator is visible on all focusable elements',
            'Focus indicator is not obscured',
        ],
    },
    {
        id: '2.5.7',
        number: '2.5.7',
        name: 'Dragging Movements',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Dragging movements have single pointer alternative',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements',
        checkpoints: [
            'Drag and drop has click alternative',
            'Reordering has button alternative',
            'Slider has input field alternative',
        ],
    },
    {
        id: '2.5.8',
        number: '2.5.8',
        name: 'Target Size (Minimum)',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Interactive targets are at least 24x24 CSS pixels',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum',
        checkpoints: [
            'Buttons are at least 24x24px',
            'Links are at least 24x24px',
            'Form controls are at least 24x24px',
            'Touch targets have adequate spacing',
        ],
    },

    // OPERABLE - Level AAA
    {
        id: '2.1.3',
        number: '2.1.3',
        name: 'Keyboard (No Exception)',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description:
            'All functionality available from keyboard without exceptions',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception',
        checkpoints: [
            'All functionality keyboard accessible',
            'No exceptions for timing or path',
        ],
    },
    {
        id: '2.2.3',
        number: '2.2.3',
        name: 'No Timing',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'No time limits unless essential',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/no-timing',
        checkpoints: [
            'No time limits on interactions',
            'Time limits are essential only',
        ],
    },
    {
        id: '2.4.8',
        number: '2.4.8',
        name: 'Location',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Information about user location within a set of pages',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/location',
        checkpoints: [
            'Breadcrumbs show location',
            'Current page highlighted in navigation',
            'Site map available',
        ],
    },
    {
        id: '2.4.9',
        number: '2.4.9',
        name: 'Link Purpose (Link Only)',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Link purpose can be identified from link text alone',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only',
        checkpoints: [
            'Link text is descriptive on its own',
            'No generic "click here" or "read more"',
        ],
    },
    {
        id: '2.4.10',
        number: '2.4.10',
        name: 'Section Headings',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Section headings organize content',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/section-headings',
        checkpoints: [
            'Headings used to organize content',
            'Heading hierarchy is logical',
        ],
    },
    {
        id: '2.5.5',
        number: '2.5.5',
        name: 'Target Size (Enhanced)',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Interactive targets are at least 44x44 CSS pixels',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced',
        checkpoints: [
            'Buttons are at least 44x44px',
            'Links are at least 44x44px',
            'Form controls are at least 44x44px',
        ],
    },
    {
        id: '2.5.6',
        number: '2.5.6',
        name: 'Concurrent Input Mechanisms',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.OPERABLE,
        description: 'Content does not restrict use of input modalities',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms',
        checkpoints: [
            'Touch and mouse can be used interchangeably',
            'Keyboard and pointer can be used interchangeably',
            'No input modality restrictions',
        ],
    },

    // UNDERSTANDABLE - Level A
    {
        id: '3.1.1',
        number: '3.1.1',
        name: 'Language of Page',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description:
            'Default human language can be programmatically determined',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-page',
        checkpoints: [
            'html element has lang attribute',
            'lang attribute is valid',
        ],
    },
    {
        id: '3.2.1',
        number: '3.2.1',
        name: 'On Focus',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Focus does not trigger unexpected context changes',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/on-focus',
        checkpoints: [
            'Receiving focus does not submit forms',
            'Receiving focus does not open new windows',
            'Receiving focus does not change context',
        ],
    },
    {
        id: '3.2.2',
        number: '3.2.2',
        name: 'On Input',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Input does not trigger unexpected context changes',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/on-input',
        checkpoints: [
            'Changing settings does not automatically submit',
            'Input changes are predictable',
            'User is warned before context changes',
        ],
    },
    {
        id: '3.3.1',
        number: '3.3.1',
        name: 'Error Identification',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Input errors are identified and described to user',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/error-identification',
        checkpoints: [
            'Errors are clearly identified',
            'Error messages are descriptive',
            'Errors announced to screen readers',
        ],
    },
    {
        id: '3.3.2',
        number: '3.3.2',
        name: 'Labels or Instructions',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Labels or instructions provided when input is required',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions',
        checkpoints: [
            'Form fields have labels',
            'Required fields are indicated',
            'Input format is described',
            'Instructions are clear',
        ],
    },

    // UNDERSTANDABLE - Level AA
    {
        id: '3.1.2',
        number: '3.1.2',
        name: 'Language of Parts',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description:
            'Language of each passage can be programmatically determined',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts',
        checkpoints: [
            'Foreign language passages have lang attribute',
            'Multi-language content marked up correctly',
        ],
    },
    {
        id: '3.2.3',
        number: '3.2.3',
        name: 'Consistent Navigation',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Navigation mechanisms are consistent',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation',
        checkpoints: [
            'Navigation order is consistent',
            'Navigation placement is consistent',
        ],
    },
    {
        id: '3.2.4',
        number: '3.2.4',
        name: 'Consistent Identification',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description:
            'Components with same functionality are identified consistently',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification',
        checkpoints: [
            'Icons used consistently',
            'Labels used consistently',
            'Same functionality has same labels',
        ],
    },
    {
        id: '3.3.3',
        number: '3.3.3',
        name: 'Error Suggestion',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Error correction suggestions provided when known',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion',
        checkpoints: [
            'Suggestions provided for errors',
            'Suggestions are specific',
            'Suggestions help fix errors',
        ],
    },
    {
        id: '3.3.4',
        number: '3.3.4',
        name: 'Error Prevention (Legal, Financial, Data)',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Submissions can be reversed, checked, or confirmed',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data',
        checkpoints: [
            'Reversible submissions',
            'Data checked before submission',
            'Confirmation step provided',
        ],
    },

    // UNDERSTANDABLE - Level AAA
    {
        id: '3.1.3',
        number: '3.1.3',
        name: 'Unusual Words',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Mechanism for identifying specific definitions of words',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/unusual-words',
        checkpoints: [
            'Jargon is defined',
            'Technical terms are explained',
            'Idioms are explained',
        ],
    },
    {
        id: '3.2.5',
        number: '3.2.5',
        name: 'Change on Request',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Context changes only occur on user request',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/change-on-request',
        checkpoints: [
            'No automatic context changes',
            'User initiates all changes',
            'User can turn off automatic changes',
        ],
    },
    {
        id: '3.3.5',
        number: '3.3.5',
        name: 'Help',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'Context-sensitive help is available',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/help',
        checkpoints: [
            'Help text available',
            'Instructions provided',
            'Examples given',
        ],
    },
    {
        id: '3.3.6',
        number: '3.3.6',
        name: 'Error Prevention (All)',
        level: WCAGLevel.AAA,
        principle: WCAGPrinciple.UNDERSTANDABLE,
        description: 'All submissions can be reversed, checked, or confirmed',
        wcagUrl:
            'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all',
        checkpoints: [
            'All submissions are reversible',
            'All data is checked',
            'All submissions have confirmation',
        ],
    },

    // ROBUST - Level A
    {
        id: '4.1.1',
        number: '4.1.1',
        name: 'Parsing',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.ROBUST,
        description: 'Markup can be reliably parsed',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/parsing',
        checkpoints: [
            'No duplicate IDs',
            'Elements have complete tags',
            'Elements are properly nested',
            'Attributes are not duplicated',
        ],
    },
    {
        id: '4.1.2',
        number: '4.1.2',
        name: 'Name, Role, Value',
        level: WCAGLevel.A,
        principle: WCAGPrinciple.ROBUST,
        description:
            'Name and role can be determined; states and values can be set',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value',
        checkpoints: [
            'All UI components have accessible names',
            'All UI components have appropriate roles',
            'States are programmatically available',
            'Values are programmatically available',
            'ARIA attributes used correctly',
        ],
    },
    {
        id: '4.1.3',
        number: '4.1.3',
        name: 'Status Messages',
        level: WCAGLevel.AA,
        principle: WCAGPrinciple.ROBUST,
        description:
            'Status messages can be determined by assistive technology',
        wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages',
        checkpoints: [
            'Success messages use aria-live',
            'Error messages use aria-live or role=alert',
            'Progress updates announced',
            'Status changes announced',
        ],
    },
]

export const getCriteriaByLevel = (level: WCAGLevel): WCAGCriterion[] => {
    return WCAG_CRITERIA.filter((criterion) => criterion.level === level)
}

export const getCriteriaByPrinciple = (
    principle: WCAGPrinciple
): WCAGCriterion[] => {
    return WCAG_CRITERIA.filter(
        (criterion) => criterion.principle === principle
    )
}

export const getCriterionById = (id: string): WCAGCriterion | undefined => {
    return WCAG_CRITERIA.find((criterion) => criterion.id === id)
}

import React from "react";
import { figma } from "@figma/code-connect";
import { ButtonV2, ButtonTypeV2, ButtonSizeV2, ButtonSubTypeV2 } from "blend-v1";

/**
 * FIGMA CODE CONNECT FOR BUTTONV2 COMPONENT
 * 
 * PROP MAPPING DOCUMENTATION
 * 
 * Figma vs Code Property Differences:
 * 
 * 1. DIRECT MAPPINGS (same in both):
 *    - text → text
 *    - buttonType → buttonType
 * 
 * 2. SIZE MAPPING:
 *    - Figma: 'sm', 'md', 'lg'
 *    - Code: ButtonSizeV2.SMALL, ButtonSizeV2.MEDIUM, ButtonSizeV2.LARGE
 * 
 * 3. STATE vs DISABLED:
 *    - Figma: Uses 'state' variant (default, hover, active, focussed, disabled)
 *    - Code: Uses boolean 'disabled' prop
 *    - Mapping: Only 'disabled' state maps to true
 * 
 * 4. BOOLEAN TO COMPONENT MAPPINGS:
 *    - hasLeftIcon → leftIcon (boolean to React component)
 *    - hasRightIcon → rightIcon (boolean to React component)
 * 
 * 5. FIGMA-ONLY PROPERTIES:
 *    - plainIcon: Exists in Figma subType but not in code
 *    - hover/active/focussed states: Visual only in Figma
 * 
 * 6. CODE-ONLY PROPERTIES:
 *    - loading: Boolean prop for loading state
 *    - fullWidth: Boolean prop for full width buttons
 *    - buttonGroupPosition: For button group styling
 *    - justifyContent: For content alignment
 *    - onClick: Functional prop
 */

figma.connect(
  ButtonV2,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=14667-834&t=IFWLvwV2QQMus9fh-11',
  {
    props: {
      // Direct text mapping
      text: figma.string('text'),
      
      // Button type mapping - direct correlation
      buttonType: figma.enum('buttonType', {
        'primary': ButtonTypeV2.PRIMARY,
        'secondary': ButtonTypeV2.SECONDARY,
        'danger': ButtonTypeV2.DANGER,
        'success': ButtonTypeV2.SUCCESS
      }),
      
      // Size mapping - Figma uses lowercase, code uses uppercase enum
      size: figma.enum('size', {
        'sm': ButtonSizeV2.SMALL,
        'md': ButtonSizeV2.MEDIUM,
        'lg': ButtonSizeV2.LARGE
      }),
      
      // SubType mapping - NOTE: 'plainIcon' exists in Figma but not in code
      subType: figma.enum('subType', {
        'default': ButtonSubTypeV2.DEFAULT,
        'iconOnly': ButtonSubTypeV2.ICON_ONLY,
        'inline': ButtonSubTypeV2.INLINE
        // 'plainIcon' is intentionally excluded - Figma only variant
      }),
      
      // State to disabled mapping - Figma uses variant, code uses boolean
      disabled: figma.enum('state', {
        'disabled': true,    // Only disabled state maps to true
        'default': false,    // All other states map to false
        'hover': false,      // Hover is visual only in Figma
        'active': false,     // Active is visual only in Figma
        'focussed': false    // Focus is visual only in Figma
      }),
      
      // Icon mappings - Figma uses boolean, code needs component instance
      leftIcon: figma.boolean('hasLeftIcon', {
        true: figma.instance('leftIcon'),  // When true, use the icon instance
        false: undefined                    // When false, no icon
      }),
      
      rightIcon: figma.boolean('hasRightIcon', {
        true: figma.instance('rightIcon'), // When true, use the icon instance
        false: undefined                    // When false, no icon
      }),
      
      // Note: loading is not in Figma yet
      // Note: fullWidth is not in Figma yet
      // Note: buttonGroupPosition is not needed in Figma (layout concern)
      // Note: justifyContent is not needed in Figma (layout concern)
    },
    
    example: ({ text, buttonType, size, subType, disabled, leftIcon, rightIcon }) => (
      <ButtonV2
        text={text}
        buttonType={buttonType}
        size={size}
        subType={subType}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    ),
    
    imports: ["import { ButtonV2 } from 'blend-v1'"],
    
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/ButtonV2"
      },
      {
        name: "Storybook", 
        url: "https://juspay.design/storybook/?path=/docs/components-button-buttonv2--docs"
      }
    ]
  }
);

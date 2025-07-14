import React from "react";
import { figma } from "@figma/code-connect";
import { Tag, TagVariant, TagColor, TagSize, TagShape } from "blend-v1";

/**
 * FIGMA CODE CONNECT FOR TAGS COMPONENT
 * 
 * PROP MAPPING DOCUMENTATION
 * 
 * Figma vs Code Property Differences:
 * 
 * 1. DIRECT MAPPINGS (same in both):
 *    - variant → variant
 *    - size → size  
 *    - text → text
 *    - color → color
 *    - shape → shape
 * 
 * 2. BOOLEAN TO COMPONENT MAPPINGS:
 *    - hasLeftSlot → leftSlot (boolean to React component)
 *    - hasRightSlot → rightSlot (boolean to React component)
 * 
 * 3. FIGMA-ONLY PROPERTIES:
 *    - hasLabel: In code, if text is not passed, it represents false state of hasLabel
 * 
 * 4. CODE-ONLY PROPERTIES:
 *    - splitTagPosition: Not required in Figma (layout concern)
 *    - onClick: Functional prop, not visual
 */

figma.connect(
  Tag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2021-8332&t=sYsSZjUUTRwdGryv-11',
  {
    props: {
      // Direct text mapping
      text: figma.string('text'),
      
      // Variant mapping - direct correlation
      variant: figma.enum('variant', {
        'noFill': TagVariant.NO_FILL,
        'attentive': TagVariant.ATTENTIVE,
        'subtle': TagVariant.SUBTLE
      }),
      
      // Size mapping - direct correlation
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      
      // Color mapping - direct correlation
      color: figma.enum('color', {
        'neutral': TagColor.NEUTRAL,
        'primary': TagColor.PRIMARY,
        'success': TagColor.SUCCESS,
        'error': TagColor.ERROR,
        'warning': TagColor.WARNING,
        'purple': TagColor.PURPLE
      }),
      
      // Shape mapping - direct correlation
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      
      // Slot mappings - Figma uses boolean flags, code needs actual components
      leftSlot: figma.boolean('hasLeftSlot', {
        true: figma.instance('leftSlot'),
        false: undefined
      }),
      
      rightSlot: figma.boolean('hasRightSlot', {
        true: figma.instance('rightSlot'),
        false: undefined
      }),
      
      // Note: hasLabel is handled implicitly - if text is provided, hasLabel is true
      // Note: splitTagPosition is not needed in Figma (code-only layout concern)
    },
    
    example: ({ text, variant, size, color, shape, leftSlot, rightSlot }) => (
      <Tag
        text={text}
        variant={variant}
        size={size}
        color={color}
        shape={shape}
        leftSlot={leftSlot}
        rightSlot={rightSlot}
      />
    ),
    
    imports: ["import { Tag } from 'blend-v1'"],
    
    links: [
      {
        name: "GitHub",
        url: "https://github.com/design-juspay/cloved/tree/main/packages/blend/lib/components/Tags"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-tags-tag--docs"
      }
    ]
  }
);

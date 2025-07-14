import React from "react";
import { figma } from "@figma/code-connect";
import { SplitTag, TagSize, TagShape, TagColor } from "blend-v1";

/**
 * FIGMA CODE CONNECT FOR SPLITTAG COMPONENT
 * 
 * PROP MAPPING DOCUMENTATION
 * 
 * Figma vs Code Property Differences:
 * 
 * 1. DIRECT MAPPINGS (same in both):
 *    - shape → shape
 *    - size → size
 * 
 * 2. FIGMA-ONLY PROPERTIES:
 *    - color: Exists in Figma but not in code
 *      Note: Color is handled at the individual tag level (primaryTag.color, secondaryTag.color)
 * 
 * 3. CODE-ONLY PROPERTIES:
 *    - primaryTag: Complex object prop containing tag configuration
 *    - secondaryTag: Complex object prop containing tag configuration  
 *    - leadingSlot: React node for leading content
 *    - trailingSlot: React node for trailing content
 * 
 * 4. IMPLEMENTATION NOTES:
 *    - In Figma, the SplitTag is a single component with all props
 *    - In code, SplitTag is a wrapper that combines two Tag components
 *    - The primaryTag always uses TagVariant.NO_FILL
 *    - The secondaryTag always uses TagVariant.ATTENTIVE
 *    - Color customization happens through the individual tag props
 *    - Developers need to manually add text and icon content
 */

figma.connect(
  SplitTag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=5864-8098&t=HPQqtn0EtUTcjC70-11',
  {
    variant: { "color": "primary" },
    props: {
      // Shape mapping - direct correlation
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      
      // Size mapping - direct correlation
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      
      // Fixed primaryTag configuration
      primaryTag: {
        text: "Label",
        color: TagColor.NEUTRAL
      },
      
      // Fixed secondaryTag configuration with primary color
      secondaryTag: {
        text: "Value",
        color: TagColor.PRIMARY
      }
    },
    
    example: ({ shape, size, primaryTag, secondaryTag }) => (
      <SplitTag
        shape={shape}
        size={size}
        primaryTag={primaryTag}
        secondaryTag={secondaryTag}
      />
    ),
    
    imports: ["import { SplitTag, TagColor } from 'blend-v1'"]
  }
);

// Additional variants for different colors
figma.connect(
  SplitTag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=5864-8098&t=HPQqtn0EtUTcjC70-11',
  {
    variant: { "color": "success" },
    props: {
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      primaryTag: {
        text: "Label",
        color: TagColor.NEUTRAL
      },
      secondaryTag: {
        text: "Value",
        color: TagColor.SUCCESS
      }
    },
    example: ({ shape, size, primaryTag, secondaryTag }) => (
      <SplitTag
        shape={shape}
        size={size}
        primaryTag={primaryTag}
        secondaryTag={secondaryTag}
      />
    ),
    imports: ["import { SplitTag, TagColor } from 'blend-v1'"]
  }
);

figma.connect(
  SplitTag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=5864-8098&t=HPQqtn0EtUTcjC70-11',
  {
    variant: { "color": "error" },
    props: {
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      primaryTag: {
        text: "Label",
        color: TagColor.NEUTRAL
      },
      secondaryTag: {
        text: "Value",
        color: TagColor.ERROR
      }
    },
    example: ({ shape, size, primaryTag, secondaryTag }) => (
      <SplitTag
        shape={shape}
        size={size}
        primaryTag={primaryTag}
        secondaryTag={secondaryTag}
      />
    ),
    imports: ["import { SplitTag, TagColor } from 'blend-v1'"]
  }
);

figma.connect(
  SplitTag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=5864-8098&t=HPQqtn0EtUTcjC70-11',
  {
    variant: { "color": "warning" },
    props: {
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      primaryTag: {
        text: "Label",
        color: TagColor.NEUTRAL
      },
      secondaryTag: {
        text: "Value",
        color: TagColor.WARNING
      }
    },
    example: ({ shape, size, primaryTag, secondaryTag }) => (
      <SplitTag
        shape={shape}
        size={size}
        primaryTag={primaryTag}
        secondaryTag={secondaryTag}
      />
    ),
    imports: ["import { SplitTag, TagColor } from 'blend-v1'"]
  }
);

figma.connect(
  SplitTag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=5864-8098&t=HPQqtn0EtUTcjC70-11',
  {
    variant: { "color": "purple" },
    props: {
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      primaryTag: {
        text: "Label",
        color: TagColor.NEUTRAL
      },
      secondaryTag: {
        text: "Value",
        color: TagColor.PURPLE
      }
    },
    example: ({ shape, size, primaryTag, secondaryTag }) => (
      <SplitTag
        shape={shape}
        size={size}
        primaryTag={primaryTag}
        secondaryTag={secondaryTag}
      />
    ),
    imports: ["import { SplitTag, TagColor } from 'blend-v1'"]
  }
);

figma.connect(
  SplitTag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=5864-8098&t=HPQqtn0EtUTcjC70-11',
  {
    variant: { "color": "neutral" },
    props: {
      shape: figma.enum('shape', {
        'rounded': TagShape.ROUNDED,
        'squarical': TagShape.SQUARICAL
      }),
      size: figma.enum('size', {
        'xs': TagSize.XS,
        'sm': TagSize.SM,
        'md': TagSize.MD,
        'lg': TagSize.LG
      }),
      primaryTag: {
        text: "Label",
        color: TagColor.NEUTRAL
      },
      secondaryTag: {
        text: "Value",
        color: TagColor.NEUTRAL
      }
    },
    example: ({ shape, size, primaryTag, secondaryTag }) => (
      <SplitTag
        shape={shape}
        size={size}
        primaryTag={primaryTag}
        secondaryTag={secondaryTag}
      />
    ),
    imports: ["import { SplitTag, TagColor } from 'blend-v1'"]
  }
);

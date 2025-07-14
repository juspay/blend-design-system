import React from "react";
import type { Meta } from "@storybook/react";
import figma from "@figma/code-connect";
import {
  Plus,
  Download,
  Settings,
  Search,
  Edit,
  Heart,
  Star,
  Trash2,
  ChevronDown,
  ChevronRight,
  X,
  Check,
} from "lucide-react";

const meta: Meta = {
  title: "Components/Icons",
  parameters: {
    design: {
      type: "figma",
    },
    docs: {
      description: {
        component: `
Icons used throughout the design system. These icons are from the lucide-react library and are connected to Figma components for Code Connect integration.

## Usage

\`\`\`tsx
import { Plus, Download, Settings } from 'lucide-react';

// Use with default size (24px)
<Plus />

// Use with custom size
<Plus size={16} />
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// Plus Icon
export const PlusIcon = {
  parameters: {
    design: {
      url: "YOUR_PLUS_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Plus size={16} />,
};

// Download Icon
export const DownloadIcon = {
  parameters: {
    design: {
      url: "YOUR_DOWNLOAD_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Download size={16} />,
};

// Settings Icon
export const SettingsIcon = {
  parameters: {
    design: {
      url: "YOUR_SETTINGS_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Settings size={16} />,
};

// Search Icon
export const SearchIcon = {
  parameters: {
    design: {
      url: "YOUR_SEARCH_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Search size={16} />,
};

// Edit Icon
export const EditIcon = {
  parameters: {
    design: {
      url: "YOUR_EDIT_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Edit size={16} />,
};

// Heart Icon
export const HeartIcon = {
  parameters: {
    design: {
      url: "YOUR_HEART_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Heart size={16} />,
};

// Star Icon
export const StarIcon = {
  parameters: {
    design: {
      url: "YOUR_STAR_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Star size={16} />,
};

// Trash Icon
export const Trash2Icon = {
  parameters: {
    design: {
      url: "YOUR_TRASH2_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Trash2 size={16} />,
};

// Chevron Down Icon
export const ChevronDownIcon = {
  parameters: {
    design: {
      url: "YOUR_CHEVRON_DOWN_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <ChevronDown size={16} />,
};

// Chevron Right Icon
export const ChevronRightIcon = {
  parameters: {
    design: {
      url: "YOUR_CHEVRON_RIGHT_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <ChevronRight size={16} />,
};

// X (Close) Icon
export const XIcon = {
  parameters: {
    design: {
      url: "YOUR_X_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <X size={16} />,
};

// Check Icon
export const CheckIcon = {
  parameters: {
    design: {
      url: "YOUR_CHECK_ICON_FIGMA_URL", // TODO: Replace with actual Figma icon URL
    },
  },
  render: () => <Check size={16} />,
};

// Icon Showcase
export const IconShowcase = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Plus size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Plus</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Download size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Download</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Settings size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Settings</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Search size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Search</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Edit size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Edit</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Heart size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Heart</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Star size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Star</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Trash2 size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Trash</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <ChevronDown size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Chevron Down</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <ChevronRight size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Chevron Right</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <X size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Close</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Check size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Check</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A showcase of all available icons in the design system.",
      },
    },
  },
};

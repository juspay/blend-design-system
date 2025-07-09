import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "light",
  brandTitle: "Blend Design System",
  brandUrl: "https://your-docs-site.web.app",
  brandImage: undefined, // Add your logo URL here if you have one
  brandTarget: "_self",

  colorPrimary: "#3b82f6",
  colorSecondary: "#6366f1",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e5e7eb",
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Text colors
  textColor: "#1f2937",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#6b7280",
  barSelectedColor: "#3b82f6",
  barBg: "#f9fafb",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#d1d5db",
  inputTextColor: "#1f2937",
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
  panelPosition: "bottom",
  selectedPanel: "controls",
});

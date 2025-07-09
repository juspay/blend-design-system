import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const alertMeta: ComponentMeta = {
  componentName: "Alert",
  componentDescription:
    "A versatile alert component for displaying important messages, notifications, and status updates with various styles and action buttons.",
  features: [
    "Multiple variants (primary, success, warning, error, purple, orange, neutral)",
    "Two visual styles (subtle, no-fill)",
    "Primary and secondary action buttons",
    "Closable alerts with onClose callback",
    "Custom icon support",
    "Flexible action placement (bottom, right)",
    "Responsive design",
  ],
  usageExamples: [
    {
      title: "Basic Success Alert",
      description: "Simple success alert with heading and description",
      code: `<Alert
  heading="Success!"
  description="Your changes have been saved successfully."
  variant={AlertVariant.SUCCESS}
/>`,
    },
    {
      title: "Error Alert with Actions",
      description: "Error alert with primary and secondary actions",
      code: `<Alert
  heading="Error occurred"
  description="Failed to save your changes. Please try again."
  variant={AlertVariant.ERROR}
  primaryAction={{
    label: "Retry",
    onClick: () => handleRetry()
  }}
  secondaryAction={{
    label: "Cancel",
    onClick: () => handleCancel()
  }}
/>`,
    },
    {
      title: "Warning Alert with Custom Icon",
      description: "Warning alert with custom icon and close button",
      code: `<Alert
  heading="Warning"
  description="This action cannot be undone."
  variant={AlertVariant.WARNING}
  icon={<WarningIcon />}
  onClose={() => handleClose()}
  style={AlertStyle.SUBTLE}
/>`,
    },
    {
      title: "Alert with Bottom Actions",
      description: "Alert with actions placed at the bottom",
      code: `<Alert
  heading="Confirmation Required"
  description="Are you sure you want to delete this item?"
  variant={AlertVariant.NEUTRAL}
  actionPlacement={AlertActionPlacement.BOTTOM}
  primaryAction={{
    label: "Delete",
    onClick: () => handleDelete()
  }}
  secondaryAction={{
    label: "Cancel",
    onClick: () => handleCancel()
  }}
/>`,
    },
  ],
  props: [
    {
      propName: "heading",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The main heading text of the alert",
      llmContext: "The main heading text of the alert",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "description",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "The description text providing more details about the alert",
      llmContext: "The description text providing more details about the alert",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "variant",
      propType: "AlertVariant",
      typeDefinition: `enum AlertVariant {
        PRIMARY = "primary",
        SUCCESS = "success",
        WARNING = "warning",
        ERROR = "error",
        PURPLE = "purple",
        ORANGE = "orange",
        NEUTRAL = "neutral",
      }`,
      propDescription:
        "The visual variant of the alert determining its color scheme",
      llmContext:
        "The visual variant of the alert determining its color scheme",
      propDefault: "AlertVariant.PRIMARY",
      category: "Appearance",
      required: false,
    },
    {
      propName: "style",
      propType: "AlertStyle",
      typeDefinition: `enum AlertStyle {
        SUBTLE = "subtle",
        NO_FILL = "noFill",
      }`,
      propDescription: "The visual style of the alert",
      llmContext: "The visual style of the alert",
      propDefault: "undefined",
      category: "Appearance",
      required: false,
    },
    {
      propName: "primaryAction",
      propType: "AlertAction",
      typeDefinition: `type AlertAction = {
        label: string;
        onClick: () => void;
      }`,
      propDescription: "Primary action button configuration",
      llmContext: "Primary action button configuration",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "secondaryAction",
      propType: "AlertAction",
      typeDefinition: `type AlertAction = {
        label: string;
        onClick: () => void;
      }`,
      propDescription: "Secondary action button configuration",
      llmContext: "Secondary action button configuration",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "onClose",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Callback function called when the alert is closed",
      llmContext: "Callback function called when the alert is closed",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "icon",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom icon to display in the alert",
      llmContext: "Custom icon to display in the alert",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "actionPlacement",
      propType: "AlertActionPlacement",
      typeDefinition: `enum AlertActionPlacement {
        BOTTOM = "bottom",
        RIGHT = "right",
      }`,
      propDescription: "Placement of action buttons within the alert",
      llmContext: "Placement of action buttons within the alert",
      propDefault: "AlertActionPlacement.RIGHT",
      category: "Layout",
      required: false,
    },
  ],
};

export default alertMeta;

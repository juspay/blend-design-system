import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const snackbarMeta: ComponentMeta = {
  componentName: "Snackbar",
  componentDescription:
    "A toast notification system for displaying temporary messages with multiple variants, action buttons, and automatic dismissal functionality.",
  features: [
    "Four notification variants (info, success, warning, error)",
    "Automatic dismissal with customizable duration",
    "Action button support for user interactions",
    "Manual close functionality",
    "Toast queue management",
    "Accessible design with proper ARIA attributes",
    "Responsive positioning",
    "Custom styling support",
    "Programmatic toast creation",
    "Event callbacks for user actions",
  ],
  usageExamples: [
    {
      title: "Basic Toast Notifications",
      description: "Simple toast notifications with different variants",
      code: `import { addToast } from 'blend-v1';

// Success notification
addToast({
  header: "Success!",
  description: "Your changes have been saved successfully.",
  variant: SnackbarVariant.SUCCESS
});

// Error notification
addToast({
  header: "Error occurred",
  description: "Failed to save changes. Please try again.",
  variant: SnackbarVariant.ERROR
});`,
    },
    {
      title: "Toast with Action Button",
      description: "Toast notification with an action button",
      code: `addToast({
  header: "File uploaded",
  description: "Your file has been uploaded successfully.",
  variant: SnackbarVariant.INFO,
  actionButton: {
    label: "View File",
    onClick: () => {
      // Navigate to file or open preview
      window.open('/files/uploaded-file.pdf');
    }
  }
});`,
    },
    {
      title: "Toast with Custom Close Handler",
      description: "Toast with custom logic when closed",
      code: `addToast({
  header: "Session expiring",
  description: "Your session will expire in 5 minutes.",
  variant: SnackbarVariant.WARNING,
  onClose: () => {
    // Log the dismissal or trigger other actions
    console.log('Session warning dismissed');
    trackEvent('session_warning_dismissed');
  },
  actionButton: {
    label: "Extend Session",
    onClick: () => {
      extendUserSession();
    }
  }
});`,
    },
    {
      title: "Multiple Toast Notifications",
      description: "Creating multiple toasts in sequence",
      code: `// Queue multiple notifications
const showProgressToasts = () => {
  addToast({
    header: "Processing started",
    description: "Your request is being processed...",
    variant: SnackbarVariant.INFO
  });
  
  setTimeout(() => {
    addToast({
      header: "Processing complete",
      description: "Your request has been processed successfully.",
      variant: SnackbarVariant.SUCCESS,
      actionButton: {
        label: "View Results",
        onClick: () => showResults()
      }
    });
  }, 3000);
};`,
    },
  ],
  props: [
    {
      propName: "header",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The main heading text of the toast notification",
      llmContext: "The main heading text of the toast notification",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "description",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional descriptive text for the toast notification",
      llmContext: "Additional descriptive text for the toast notification",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "variant",
      propType: "SnackbarVariant",
      typeDefinition: `enum SnackbarVariant {
        INFO = "info",
        SUCCESS = "success",
        WARNING = "warning",
        ERROR = "error",
      }`,
      propDescription:
        "The visual variant determining the toast's appearance and icon",
      llmContext:
        "The visual variant determining the toast's appearance and icon",
      propDefault: "SnackbarVariant.INFO",
      category: "Appearance",
      required: false,
    },
    {
      propName: "onClose",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription: "Callback function called when the toast is closed",
      llmContext: "Callback function called when the toast is closed",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "actionButton",
      propType: "ActionButton",
      typeDefinition: `type ActionButton = {
        label: string;
        onClick: () => void;
      }`,
      propDescription:
        "Configuration for an optional action button in the toast",
      llmContext: "Configuration for an optional action button in the toast",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "label",
      propType: "string",
      typeDefinition: "string",
      propDescription:
        "Text label for the action button (ActionButton property)",
      llmContext: "Text label for the action button (ActionButton property)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "onClick",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription:
        "Click handler for the action button (ActionButton property)",
      llmContext: "Click handler for the action button (ActionButton property)",
      propDefault: "-",
      category: "Events",
      required: true,
    },
  ],
};

export default snackbarMeta;

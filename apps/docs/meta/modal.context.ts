import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const modalMeta: ComponentMeta = {
  componentName: "Modal",
  componentDescription:
    "A flexible modal dialog component for displaying content in an overlay with customizable header, footer, and action buttons.",
  features: [
    "Controlled open/close state",
    "Customizable header with title and subtitle",
    "Primary and secondary action buttons",
    "Custom header and footer slots",
    "Backdrop click to close option",
    "Optional close button",
    "Header divider option",
    "Flexible content area",
    "Responsive design",
  ],
  usageExamples: [
    {
      title: "Basic Modal",
      description: "Simple modal with title and content",
      code: `<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
</Modal>`,
    },
    {
      title: "Modal with Actions",
      description: "Modal with primary and secondary action buttons",
      code: `<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Delete Item"
  subtitle="This action cannot be undone"
  primaryAction={{
    text: "Delete",
    buttonType: ButtonTypeV2.DANGER,
    onClick: () => handleDelete()
  }}
  secondaryAction={{
    text: "Cancel",
    buttonType: ButtonTypeV2.SECONDARY,
    onClick: () => setIsModalOpen(false)
  }}
>
  <p>Are you sure you want to delete this item?</p>
</Modal>`,
    },
    {
      title: "Modal with Custom Header",
      description: "Modal with custom header content",
      code: `<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  customHeader={
    <div className="flex items-center gap-2">
      <Icon name="warning" />
      <h2>Custom Header</h2>
    </div>
  }
  showDivider={true}
>
  <p>Modal content with custom header</p>
</Modal>`,
    },
    {
      title: "Modal with Header Slot",
      description: "Modal with additional content in header right slot",
      code: `<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Settings"
  headerRightSlot={
    <Button 
      text="Reset" 
      buttonType={ButtonTypeV2.SECONDARY}
      size={ButtonSizeV2.SMALL}
    />
  }
>
  <div>Settings content here</div>
</Modal>`,
    },
  ],
  props: [
    {
      propName: "isOpen",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Controls whether the modal is open or closed",
      llmContext: "Controls whether the modal is open or closed",
      propDefault: "-",
      category: "State",
      required: true,
    },
    {
      propName: "onClose",
      propType: "() => void",
      typeDefinition: "() => void",
      propDescription:
        "Callback function called when the modal should be closed",
      llmContext: "Callback function called when the modal should be closed",
      propDefault: "-",
      category: "Events",
      required: true,
    },
    {
      propName: "title",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The title text displayed in the modal header",
      llmContext: "The title text displayed in the modal header",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "subtitle",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The subtitle text displayed below the title",
      llmContext: "The subtitle text displayed below the title",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "children",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "The content to be displayed in the modal body",
      llmContext: "The content to be displayed in the modal body",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "primaryAction",
      propType: "ModalButtonAction",
      typeDefinition: `type ModalButtonAction = Omit<ButtonV2Props, "buttonGroupPosition">`,
      propDescription: "Configuration for the primary action button",
      llmContext: "Configuration for the primary action button",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "secondaryAction",
      propType: "ModalButtonAction",
      typeDefinition: `type ModalButtonAction = Omit<ButtonV2Props, "buttonGroupPosition">`,
      propDescription: "Configuration for the secondary action button",
      llmContext: "Configuration for the secondary action button",
      propDefault: "undefined",
      category: "Actions",
      required: false,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional CSS class names for the modal",
      llmContext: "Additional CSS class names for the modal",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "showCloseButton",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show the close button in the header",
      llmContext: "Whether to show the close button in the header",
      propDefault: "true",
      category: "Behavior",
      required: false,
    },
    {
      propName: "showHeader",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show the modal header",
      llmContext: "Whether to show the modal header",
      propDefault: "true",
      category: "Layout",
      required: false,
    },
    {
      propName: "showFooter",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show the modal footer with action buttons",
      llmContext: "Whether to show the modal footer with action buttons",
      propDefault: "true",
      category: "Layout",
      required: false,
    },
    {
      propName: "closeOnBackdropClick",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether clicking the backdrop should close the modal",
      llmContext: "Whether clicking the backdrop should close the modal",
      propDefault: "true",
      category: "Behavior",
      required: false,
    },
    {
      propName: "customHeader",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom content to replace the default header",
      llmContext: "Custom content to replace the default header",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "customFooter",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom content to replace the default footer",
      llmContext: "Custom content to replace the default footer",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "headerRightSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Additional content to display on the right side of the header",
      llmContext:
        "Additional content to display on the right side of the header",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "showDivider",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show a divider line below the header",
      llmContext: "Whether to show a divider line below the header",
      propDefault: "false",
      category: "Styling",
      required: false,
    },
  ],
};

export default modalMeta;

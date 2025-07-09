import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const tabsMeta: ComponentMeta = {
  componentName: "Tabs",
  componentDescription:
    "A flexible tabs component built on Radix UI primitives, providing multiple visual variants and customizable tab triggers with content panels.",
  features: [
    "Three visual variants (boxed, floating, underline)",
    "Two sizes (medium, large)",
    "Left and right slot support for tab triggers",
    "Expandable tab list option",
    "Built on Radix UI for accessibility",
    "Keyboard navigation support",
    "Controlled and uncontrolled modes",
    "Customizable styling",
  ],
  usageExamples: [
    {
      title: "Basic Tabs",
      description: "Simple tabs with underline variant",
      code: `<Tabs defaultValue="tab1" variant={TabsVariant.UNDERLINE}>
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Details</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Overview content here</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Details content here</p>
  </TabsContent>
  <TabsContent value="tab3">
    <p>Settings content here</p>
  </TabsContent>
</Tabs>`,
    },
    {
      title: "Boxed Tabs with Icons",
      description: "Boxed variant tabs with left slot icons",
      code: `<Tabs defaultValue="dashboard" variant={TabsVariant.BOXED} size={TabsSize.LG}>
  <TabsList>
    <TabsTrigger 
      value="dashboard" 
      leftSlot={<DashboardIcon />}
    >
      Dashboard
    </TabsTrigger>
    <TabsTrigger 
      value="analytics" 
      leftSlot={<AnalyticsIcon />}
    >
      Analytics
    </TabsTrigger>
    <TabsTrigger 
      value="reports" 
      leftSlot={<ReportsIcon />}
      rightSlot={<Badge>3</Badge>}
    >
      Reports
    </TabsTrigger>
  </TabsList>
  <TabsContent value="dashboard">Dashboard content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="reports">Reports content</TabsContent>
</Tabs>`,
    },
    {
      title: "Floating Tabs",
      description: "Floating variant with expanded list",
      code: `<Tabs defaultValue="home" variant={TabsVariant.FLOATING}>
  <TabsList expanded={true}>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="products">Products</TabsTrigger>
    <TabsTrigger value="services">Services</TabsTrigger>
    <TabsTrigger value="contact">Contact</TabsTrigger>
  </TabsList>
  <TabsContent value="home">Home page content</TabsContent>
  <TabsContent value="products">Products page content</TabsContent>
  <TabsContent value="services">Services page content</TabsContent>
  <TabsContent value="contact">Contact page content</TabsContent>
</Tabs>`,
    },
    {
      title: "Controlled Tabs",
      description: "Controlled tabs with state management",
      code: `const [activeTab, setActiveTab] = useState("profile");

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList variant={TabsVariant.UNDERLINE}>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile settings</TabsContent>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="notifications">Notification settings</TabsContent>
</Tabs>`,
    },
  ],
  props: [
    {
      propName: "variant",
      propType: "TabsVariant",
      typeDefinition: `enum TabsVariant {
        BOXED = 'boxed',
        FLOATING = 'floating',
        UNDERLINE = 'underline',
      }`,
      propDescription: "The visual variant of the tabs",
      llmContext: "The visual variant of the tabs",
      propDefault: "TabsVariant.UNDERLINE",
      category: "Appearance",
      required: false,
    },
    {
      propName: "size",
      propType: "TabsSize",
      typeDefinition: `enum TabsSize {
        MD = 'md',
        LG = 'lg',
      }`,
      propDescription: "The size of the tabs",
      llmContext: "The size of the tabs",
      propDefault: "TabsSize.MD",
      category: "Appearance",
      required: false,
    },
    {
      propName: "defaultValue",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The default active tab value (uncontrolled mode)",
      llmContext: "The default active tab value (uncontrolled mode)",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "value",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The active tab value (controlled mode)",
      llmContext: "The active tab value (controlled mode)",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onValueChange",
      propType: "(value: string) => void",
      typeDefinition: "(value: string) => void",
      propDescription: "Callback fired when the active tab changes",
      llmContext: "Callback fired when the active tab changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "orientation",
      propType: "'horizontal' | 'vertical'",
      typeDefinition: "'horizontal' | 'vertical'",
      propDescription: "The orientation of the tabs",
      llmContext: "The orientation of the tabs",
      propDefault: "'horizontal'",
      category: "Layout",
      required: false,
    },
    {
      propName: "dir",
      propType: "'ltr' | 'rtl'",
      typeDefinition: "'ltr' | 'rtl'",
      propDescription: "The reading direction of the tabs",
      llmContext: "The reading direction of the tabs",
      propDefault: "'ltr'",
      category: "Layout",
      required: false,
    },
    {
      propName: "activationMode",
      propType: "'automatic' | 'manual'",
      typeDefinition: "'automatic' | 'manual'",
      propDescription:
        "Whether tabs are activated automatically on focus or manually",
      llmContext:
        "Whether tabs are activated automatically on focus or manually",
      propDefault: "'automatic'",
      category: "Behavior",
      required: false,
    },
    {
      propName: "expanded",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether the tab list should expand to fill available space (TabsList prop)",
      llmContext:
        "Whether the tab list should expand to fill available space (TabsList prop)",
      propDefault: "false",
      category: "Layout",
      required: false,
    },
    {
      propName: "leftSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Content to display on the left side of tab trigger (TabsTrigger prop)",
      llmContext:
        "Content to display on the left side of tab trigger (TabsTrigger prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "rightSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription:
        "Content to display on the right side of tab trigger (TabsTrigger prop)",
      llmContext:
        "Content to display on the right side of tab trigger (TabsTrigger prop)",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "children",
      propType: "string | number",
      typeDefinition: "string | number",
      propDescription: "The text content of the tab trigger (TabsTrigger prop)",
      llmContext: "The text content of the tab trigger (TabsTrigger prop)",
      propDefault: "-",
      category: "Content",
      required: true,
    },
  ],
};

export default tabsMeta;

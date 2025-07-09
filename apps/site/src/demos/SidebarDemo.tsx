  import { useState } from "react";
import ButtonDemo from "./ButtonDemo";
import {
  Tag as TagIcon,
  Menu as MenuIcon,
  BarChart2,
  Type,
  Calendar as CalendarIcon,
  ListFilter,
  User as UserIcon,
  Info,
  FormInput,
  AlertCircle,
  Bell as BellIcon,
  Square,
  Users,
  Layout,
  FileText,
  List,
  Grid,
  Box,
  IndianRupee,
  Table,
  Palette,
  MessageCircle,
  CircleDot as Radio,
  Weight,
  DecimalsArrowRightIcon,
} from "lucide-react";
import { FOUNDATION_THEME, Sidebar } from "blend-v1";
import ButtonGroupDemo from "./ButtonGroupDemo";
import TagDemo from "./TagDemo";
import AvatarDemo from "./AvatarDemo";
import BreadcrumbDemo from "./BreadcrumbDemo";
import InputDemo from "./TextInputDemo";
import UnitInputDemo from "./UnitInputDemo";
import type { DirectoryData } from "../../../../packages/blend/dist/components/Directory/types";
import NumberInputDemo from "./NumberInputDemo";
import TextAreaDemo from "./TextAreaDemo";
import AlertDemo from "./AlertDemo";
import TabsDemo from "./TabsDemo";
import AccordionDemo from "./AccordionDemo";
import StatCardDemo from "./StatCardDemo";


const SidebarDemo = () => {
  const [activeComponent, setActiveComponent] = useState<
    | "buttons"
    | "tooltips"
    | "tags"
    | "splitTags"
    | "breadcrumb"
    | "tabs"
    | "checkbox"
    | "radio"
    | "switch"
    | "textInput"
    | "alerts"
    | "avatarGroup"
    | "charts"
    | "chartsV2"
    | "fonts"
    | "datePicker"
    | "selectors"
    | "buttonGroups"
    | "avatars"
    | "menu"
    | "dropdown"
    | "accordion"
    | "statCard"
    | "modal"
    | "input"
    | "unitInput"
    | "numberInput"
    | "textArea"  
    | "snackbar"
    | "dataTable"
    | "colorPalette"
    | "popover"
    | "theme"
    | "salesKpiDashboard"
    | "transactionAnalyticsDashboard"
  >("alerts");

  const [activeTenant, setActiveTenant] = useState<string>("Juspay");
  const [activeMerchant, setActiveMerchant] = useState<string | undefined>(
    "Design System"
  );

  const tenants = [
    {
      label: "Juspay",
      icon: (
        <IndianRupee
          style={{ width: "16px", height: "16px" }}
          color={FOUNDATION_THEME.colors.gray[600]}
        />
      ),
      id: "juspay",
    },
    {
      label: "Razorpay",
      icon: (
        <UserIcon
          style={{ width: "16px", height: "16px" }}
          color={FOUNDATION_THEME.colors.gray[600]}
        />
      ),
      id: "razorpay",
    },
  ];

  const merchants = [
    {
      label: "Design System",
      icon: <UserIcon style={{ width: "16px", height: "16px" }} />,
      id: "design-system",
    },
    {
      label: "Design System 2",
      icon: <UserIcon style={{ width: "16px", height: "16px" }} />,
      id: "design-system-2",
    },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case "buttons":
        return <ButtonDemo />;
      case "buttonGroups":
        return <ButtonGroupDemo />;
      case "tags":
        return <TagDemo />;
      case "avatars":
        return <AvatarDemo />;
      case "breadcrumb":
        return <BreadcrumbDemo />;
      case "input":
        return <InputDemo />;
      case "unitInput":
        return <UnitInputDemo />;
      case "numberInput":
        return <NumberInputDemo />;
      case "textArea":
        return <TextAreaDemo />;
      case "alerts":
        return <AlertDemo />;
      case "tabs":
        return <TabsDemo />;
      case "accordion":
        return <AccordionDemo />;
      case "statCard":
        return <StatCardDemo />;
      default:
        return <div>No component selected</div>;
    }
  };

  const sampleData: DirectoryData[] = [
    {
      label: "Basic Components",
      isCollapsible: false,
      items: [
        {
          label: "Button",
          leftSlot: <Square style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("buttons"),
        },
        {
          label: "Button Group",
          leftSlot: <Grid style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("buttonGroups"),
        },
        {
          label: "Tag",
          leftSlot: <TagIcon style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("tags"),
        },
        {
          label: "Avatar",
          leftSlot: <Users style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("avatars"),
        },
        {
          label: "Avatar Group",
          leftSlot: <Users style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("avatarGroup"),
        },
        {
          label: "Breadcrumb",
          leftSlot: <Grid style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("breadcrumb"),
        },
      ],
    },
    {
      label: "Inputs",
      isCollapsible: false,
      items: [
        {
          label: "Text Input",
          leftSlot: <FormInput style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("input"),
        },
        {
          label: "Unit Input",
          leftSlot: <Weight style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("unitInput"),
        },
        {
          label: "Number Input",
          leftSlot: <DecimalsArrowRightIcon style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("numberInput"),
        },
        {
          label: "Text Area",
          leftSlot: <FileText style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("textArea"),
        },
      ],
    },
    {
      label: "Navigation",
      items: [
        {
          label: "Menu",
          leftSlot: <MenuIcon style={{ width: "16px", height: "16px" }} />,
          items: [
            {
              label: "Item 1",
              leftSlot: <Square style={{ width: "16px", height: "16px" }} />,
              onClick: () => setActiveComponent("menu"),
              items: [
                {
                  label: "Item 1.1",
                  leftSlot: (
                    <Square style={{ width: "16px", height: "16px" }} />
                  ),
                  onClick: () => setActiveComponent("menu"),
                  items: [
                    {
                      label: "Item 1.1.1",
                      leftSlot: (
                        <Square style={{ width: "16px", height: "16px" }} />
                      ),
                      onClick: () => setActiveComponent("menu"),
                    },
                  ],
                },
              ],
            },
            {
              label: "Item 2",
              leftSlot: <Square style={{ width: "16px", height: "16px" }} />,
            },
          ],
        },
        {
          label: "Tabs",
          leftSlot: <Layout style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("tabs"),
        },
        {
          label: "Accordion",
          leftSlot: <List style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("accordion"),
        },
      ],
    },
    {
      label: "Feedback",
      items: [
        {
          label: "Alert",
          leftSlot: <AlertCircle style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("alerts"),
        },
        {
          label: "Snackbar",
          leftSlot: <BellIcon style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("snackbar"),
        },
        {
          label: "Tooltip",
          leftSlot: <Info style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("tooltips"),
        },
        {
          label: "Modal",
          leftSlot: <Box style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("modal"),
        },
        {
          label: "Popover",
          leftSlot: <MessageCircle style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("popover"),
        },
      ],
    },
    {
      label: "Data Display",
      isCollapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "Chart",
          leftSlot: <BarChart2 style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("charts"),
        },
        {
          label: "Stat Card",
          leftSlot: <FileText style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("statCard"),
        },
        {
          label: "Data Table",
          leftSlot: <Table style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("dataTable"),
        },
      ],
    },
    {
      label: "Form Elements",
      isCollapsible: true,
      defaultOpen: false,
      items: [
        {
          label: "Date Picker",
          leftSlot: <CalendarIcon style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("datePicker"),
        },
        {
          label: "Radio",
          leftSlot: <Radio style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("radio"),
        },
        {
          label: "Checkbox",
          leftSlot: <Square style={{ width: "16px", height: "16px" }} />, // Using Square as a placeholder icon
          onClick: () => setActiveComponent("checkbox"),
        },
        {
          label: "Switch",
          leftSlot: <Square style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("switch"),
        },
        {
          label: "Selectors",
          leftSlot: <ListFilter style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("selectors"),
        },
      ],
    },
    {
      label: "Typography",
      items: [
        {
          label: "Fonts",
          leftSlot: <Type style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("fonts"),
        },
      ],
    },
    {
      label: "Design System",
      items: [
        {
          label: "Color Palette",
          leftSlot: <Palette style={{ width: "16px", height: "16px" }} />,
          onClick: () => setActiveComponent("colorPalette"),
        },
      ],
    },
  ];

  return (
    <div className="w-screen h-screen">
      <Sidebar
        activeTenant={activeTenant}
        setActiveTenant={setActiveTenant}
        tenants={tenants}
        activeMerchant={activeMerchant}
        setActiveMerchant={setActiveMerchant}
        merchants={merchants}
        data={sampleData}
        topbar={<div>Topbar</div>}
      >
        <div className="w-full h-full">{renderContent()}</div>
      </Sidebar>
    </div>
  );
};

export default SidebarDemo;

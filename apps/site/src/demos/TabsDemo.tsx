  import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsVariant,
  TabsSize,
  SingleSelect,
  Switch,
} from "blend-v1";
import {
  Home,
  User,
  Settings,
  FileText,
  BarChart3,
  Mail,
  Bell,
  Star,
  Heart,
  Download,
  Upload,
  Trash2,
} from "lucide-react";

const TabsDemo = () => {
  // Playground state
  const [playgroundVariant, setPlaygroundVariant] = useState<TabsVariant>(
    TabsVariant.UNDERLINE
  );
  const [playgroundSize, setPlaygroundSize] = useState<TabsSize>(TabsSize.MD);
  const [expanded, setExpanded] = useState(false);
  const [fitContent, setFitContent] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showRightSlot, setShowRightSlot] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  // Options for selects
  const variantOptions = [
    { value: TabsVariant.BOXED, label: "Boxed" },
    { value: TabsVariant.FLOATING, label: "Floating" },
    { value: TabsVariant.UNDERLINE, label: "Underline" },
  ];

  const sizeOptions = [
    { value: TabsSize.MD, label: "Medium" },
    { value: TabsSize.LG, label: "Large" },
  ];

  const getIconForTab = (tabId: string) => {
    switch (tabId) {
      case "tab1":
        return <Home size={16} />;
      case "tab2":
        return <User size={16} />;
      case "tab3":
        return <Settings size={16} />;
      case "tab4":
        return <FileText size={16} />;
      default:
        return <Home size={16} />;
    }
  };

  const getRightSlotForTab = (tabId: string) => {
    switch (tabId) {
      case "tab1":
        return <Star size={14} />;
      case "tab2":
        return <Heart size={14} />;
      case "tab3":
        return <Bell size={14} />;
      case "tab4":
        return <Mail size={14} />;
      default:
        return <Star size={14} />;
    }
  };

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SingleSelect
              label="Variant"
              items={[{ items: variantOptions }]}
              selected={playgroundVariant}
              onSelect={(value) => setPlaygroundVariant(value as TabsVariant)}
              placeholder="Select variant"
            />

            <SingleSelect
              label="Size"
              items={[{ items: sizeOptions }]}
              selected={playgroundSize}
              onSelect={(value) => setPlaygroundSize(value as TabsSize)}
              placeholder="Select size"
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Switch
              label="Expanded"
              checked={expanded}
              onChange={() => setExpanded(!expanded)}
            />
            <Switch
              label="Fit Content"
              checked={fitContent}
              onChange={() => setFitContent(!fitContent)}
            />
            <Switch
              label="Show Icons"
              checked={showIcons}
              onChange={() => setShowIcons(!showIcons)}
            />
            <Switch
              label="Show Right Slot"
              checked={showRightSlot}
              onChange={() => setShowRightSlot(!showRightSlot)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-4">
            <div className="w-full max-w-2xl">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList
                  variant={playgroundVariant}
                  size={playgroundSize}
                  expanded={expanded}
                  fitContent={fitContent}
                >
                  <TabsTrigger
                    value="tab1"
                    variant={playgroundVariant}
                    size={playgroundSize}
                    leftSlot={showIcons ? getIconForTab("tab1") : undefined}
                    rightSlot={showRightSlot ? getRightSlotForTab("tab1") : undefined}
                  >
                    Home
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab2"
                    variant={playgroundVariant}
                    size={playgroundSize}
                    leftSlot={showIcons ? getIconForTab("tab2") : undefined}
                    rightSlot={showRightSlot ? getRightSlotForTab("tab2") : undefined}
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab3"
                    variant={playgroundVariant}
                    size={playgroundSize}
                    leftSlot={showIcons ? getIconForTab("tab3") : undefined}
                    rightSlot={showRightSlot ? getRightSlotForTab("tab3") : undefined}
                  >
                    Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab4"
                    variant={playgroundVariant}
                    size={playgroundSize}
                    leftSlot={showIcons ? getIconForTab("tab4") : undefined}
                    rightSlot={showRightSlot ? getRightSlotForTab("tab4") : undefined}
                  >
                    Documents
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tab1" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Home Content</h3>
                    <p className="text-gray-600">
                      This is the home tab content. You can put any content here including forms, 
                      lists, or other components.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab2" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Profile Content</h3>
                    <p className="text-gray-600">
                      This is the profile tab content. Here you can display user information, 
                      preferences, or account settings.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab3" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Settings Content</h3>
                    <p className="text-gray-600">
                      This is the settings tab content. You can include configuration options, 
                      preferences, or system settings here.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab4" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Documents Content</h3>
                    <p className="text-gray-600">
                      This is the documents tab content. You can display file lists, 
                      document management tools, or file upload interfaces here.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Variants */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Tabs Variants</h2>
        <div className="space-y-8">
          {Object.values(TabsVariant).map((variant) => (
            <div key={variant} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{variant} Variant</h3>
              <Tabs defaultValue="tab1">
                <TabsList variant={variant}>
                  <TabsTrigger value="tab1">Overview</TabsTrigger>
                  <TabsTrigger value="tab2">Analytics</TabsTrigger>
                  <TabsTrigger value="tab3">Reports</TabsTrigger>
                  <TabsTrigger value="tab4">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="tab1" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Overview</h4>
                    <p className="text-gray-600">
                      This is the overview content for the {variant} variant.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab2" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Analytics</h4>
                    <p className="text-gray-600">
                      Analytics content for the {variant} variant.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab3" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Reports</h4>
                    <p className="text-gray-600">
                      Reports content for the {variant} variant.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab4" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Settings</h4>
                    <p className="text-gray-600">
                      Settings content for the {variant} variant.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Sizes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Tabs Sizes</h2>
        <div className="space-y-8">
          {Object.values(TabsSize).map((size) => (
            <div key={size} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{size} Size</h3>
              <Tabs defaultValue="tab1">
                <TabsList size={size}>
                  <TabsTrigger value="tab1" size={size}>Dashboard</TabsTrigger>
                  <TabsTrigger value="tab2" size={size}>Users</TabsTrigger>
                  <TabsTrigger value="tab3" size={size}>Products</TabsTrigger>
                </TabsList>

                <TabsContent value="tab1" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Dashboard</h4>
                    <p className="text-gray-600">
                      Dashboard content with {size} size tabs.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab2" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Users</h4>
                    <p className="text-gray-600">
                      Users content with {size} size tabs.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tab3" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Products</h4>
                    <p className="text-gray-600">
                      Products content with {size} size tabs.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs with Icons */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Tabs with Icons</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Left Icons</h3>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1" leftSlot={<Home size={16} />}>
                  Home
                </TabsTrigger>
                <TabsTrigger value="tab2" leftSlot={<User size={16} />}>
                  Profile
                </TabsTrigger>
                <TabsTrigger value="tab3" leftSlot={<Settings size={16} />}>
                  Settings
                </TabsTrigger>
                <TabsTrigger value="tab4" leftSlot={<FileText size={16} />}>
                  Documents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Home</h4>
                  <p className="text-gray-600">Home tab with left icon.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Profile</h4>
                  <p className="text-gray-600">Profile tab with left icon.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Settings</h4>
                  <p className="text-gray-600">Settings tab with left icon.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab4" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Documents</h4>
                  <p className="text-gray-600">Documents tab with left icon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Right Icons</h3>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1" rightSlot={<Star size={14} />}>
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="tab2" rightSlot={<Heart size={14} />}>
                  Likes
                </TabsTrigger>
                <TabsTrigger value="tab3" rightSlot={<Bell size={14} />}>
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="tab4" rightSlot={<Mail size={14} />}>
                  Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Favorites</h4>
                  <p className="text-gray-600">Favorites tab with right icon.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Likes</h4>
                  <p className="text-gray-600">Likes tab with right icon.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Notifications</h4>
                  <p className="text-gray-600">Notifications tab with right icon.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab4" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Messages</h4>
                  <p className="text-gray-600">Messages tab with right icon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Both Icons</h3>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger 
                  value="tab1" 
                  leftSlot={<Download size={16} />}
                  rightSlot={<Star size={14} />}
                >
                  Downloads
                </TabsTrigger>
                <TabsTrigger 
                  value="tab2" 
                  leftSlot={<Upload size={16} />}
                  rightSlot={<Heart size={14} />}
                >
                  Uploads
                </TabsTrigger>
                <TabsTrigger 
                  value="tab3" 
                  leftSlot={<Trash2 size={16} />}
                  rightSlot={<Bell size={14} />}
                >
                  Trash
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Downloads</h4>
                  <p className="text-gray-600">Downloads tab with both icons.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Uploads</h4>
                  <p className="text-gray-600">Uploads tab with both icons.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Trash</h4>
                  <p className="text-gray-600">Trash tab with both icons.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Layout Options */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Layout Options</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Expanded Tabs</h3>
            <Tabs defaultValue="tab1">
              <TabsList expanded>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Reports</TabsTrigger>
                <TabsTrigger value="tab4">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Overview</h4>
                  <p className="text-gray-600">Expanded tabs distribute space evenly.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Analytics</h4>
                  <p className="text-gray-600">Each tab takes equal width.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Reports</h4>
                  <p className="text-gray-600">Perfect for navigation menus.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab4" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Settings</h4>
                  <p className="text-gray-600">Centered text in each tab.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fit Content</h3>
            <Tabs defaultValue="tab1">
              <TabsList fitContent>
                <TabsTrigger value="tab1">Short</TabsTrigger>
                <TabsTrigger value="tab2">Medium Length</TabsTrigger>
                <TabsTrigger value="tab3">Very Long Tab Name</TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Short</h4>
                  <p className="text-gray-600">Tabs fit their content width.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Medium Length</h4>
                  <p className="text-gray-600">Each tab is sized to its content.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Very Long Tab Name</h4>
                  <p className="text-gray-600">Longer tabs get more space as needed.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dashboard Tabs</h3>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview" leftSlot={<BarChart3 size={16} />}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="analytics" leftSlot={<BarChart3 size={16} />}>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" leftSlot={<FileText size={16} />}>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="settings" leftSlot={<Settings size={16} />}>
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="p-6 bg-white border rounded-lg">
                  <h4 className="text-xl font-semibold mb-4">Overview Dashboard</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-800">Total Users</h5>
                      <p className="text-2xl font-bold text-blue-600">1,234</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-semibold text-green-800">Active Sessions</h5>
                      <p className="text-2xl font-bold text-green-600">567</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-semibold text-purple-800">Revenue</h5>
                      <p className="text-2xl font-bold text-purple-600">$12,345</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <div className="p-6 bg-white border rounded-lg">
                  <h4 className="text-xl font-semibold mb-4">Analytics</h4>
                  <p className="text-gray-600">
                    Detailed analytics and metrics would be displayed here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-4">
                <div className="p-6 bg-white border rounded-lg">
                  <h4 className="text-xl font-semibold mb-4">Reports</h4>
                  <p className="text-gray-600">
                    Generated reports and data exports would be available here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <div className="p-6 bg-white border rounded-lg">
                  <h4 className="text-xl font-semibold mb-4">Settings</h4>
                  <p className="text-gray-600">
                    Configuration options and preferences would be managed here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsDemo; 
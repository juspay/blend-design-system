import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionType,
  AccordionChevronPosition,
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
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const AccordionDemo = () => {
  // Playground state
  const [playgroundType, setPlaygroundType] = useState<AccordionType>(
    AccordionType.NO_BORDER
  );
  const [playgroundChevronPosition, setPlaygroundChevronPosition] = useState<AccordionChevronPosition>(
    AccordionChevronPosition.RIGHT
  );
  const [isMultiple, setIsMultiple] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showRightSlot, setShowRightSlot] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeItems, setActiveItems] = useState<string[]>(["item1"]);

  // Options for selects
  const typeOptions = [
    { value: AccordionType.NO_BORDER, label: "No Border" },
    { value: AccordionType.BORDER, label: "Border" },
  ];

  const chevronPositionOptions = [
    { value: AccordionChevronPosition.RIGHT, label: "Right" },
    { value: AccordionChevronPosition.LEFT, label: "Left" },
  ];

  const getIconForItem = (itemId: string) => {
    switch (itemId) {
      case "item1":
        return <Home size={16} />;
      case "item2":
        return <User size={16} />;
      case "item3":
        return <Settings size={16} />;
      case "item4":
        return <FileText size={16} />;
      default:
        return <Home size={16} />;
    }
  };

  const getRightSlotForItem = (itemId: string) => {
    switch (itemId) {
      case "item1":
        return <Star size={14} />;
      case "item2":
        return <Heart size={14} />;
      case "item3":
        return <Bell size={14} />;
      case "item4":
        return <Mail size={14} />;
      default:
        return <Star size={14} />;
    }
  };

  const handleValueChange = (value: string | string[]) => {
    if (isMultiple) {
      setActiveItems(Array.isArray(value) ? value : [value]);
    } else {
      setActiveItems(Array.isArray(value) ? value : [value]);
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
              label="Type"
              items={[{ items: typeOptions }]}
              selected={playgroundType}
              onSelect={(value) => setPlaygroundType(value as AccordionType)}
              placeholder="Select type"
            />

            <SingleSelect
              label="Chevron Position"
              items={[{ items: chevronPositionOptions }]}
              selected={playgroundChevronPosition}
              onSelect={(value) => setPlaygroundChevronPosition(value as AccordionChevronPosition)}
              placeholder="Select chevron position"
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Switch
              label="Multiple Selection"
              checked={isMultiple}
              onChange={() => setIsMultiple(!isMultiple)}
            />
            <Switch
              label="Show Icons"
              checked={showIcons}
              onChange={() => setShowIcons(!showIcons)}
            />
            <Switch
              label="Show Subtext"
              checked={showSubtext}
              onChange={() => setShowSubtext(!showSubtext)}
            />
            <Switch
              label="Show Right Slot"
              checked={showRightSlot}
              onChange={() => setShowRightSlot(!showRightSlot)}
            />
            <Switch
              label="Disabled"
              checked={isDisabled}
              onChange={() => setIsDisabled(!isDisabled)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-4">
            <div className="w-full max-w-2xl">
              <Accordion
                accordionType={playgroundType}
                isMultiple={isMultiple}
                value={isMultiple ? activeItems : activeItems[0]}
                onValueChange={handleValueChange}
              >
                <AccordionItem
                  value="item1"
                  title="General Information"
                  subtext={showSubtext ? "Basic details and overview" : undefined}
                  leftSlot={showIcons ? getIconForItem("item1") : undefined}
                  rightSlot={showRightSlot ? getRightSlotForItem("item1") : undefined}
                  chevronPosition={playgroundChevronPosition}
                  isDisabled={isDisabled}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">General Information</h4>
                    <p className="text-gray-600 mb-3">
                      This section contains general information about the system, including 
                      basic configuration details and overview of features.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm">System is running normally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info size={16} className="text-blue-500" />
                        <span className="text-sm">Last updated: 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item2"
                  title="User Settings"
                  subtext={showSubtext ? "Personal preferences and account settings" : undefined}
                  leftSlot={showIcons ? getIconForItem("item2") : undefined}
                  rightSlot={showRightSlot ? getRightSlotForItem("item2") : undefined}
                  chevronPosition={playgroundChevronPosition}
                  isDisabled={isDisabled}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">User Settings</h4>
                    <p className="text-gray-600 mb-3">
                      Manage your personal preferences, account settings, and profile information.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email notifications</span>
                        <div className="w-8 h-4 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dark mode</span>
                        <div className="w-8 h-4 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item3"
                  title="System Configuration"
                  subtext={showSubtext ? "Advanced system settings and configuration" : undefined}
                  leftSlot={showIcons ? getIconForItem("item3") : undefined}
                  rightSlot={showRightSlot ? getRightSlotForItem("item3") : undefined}
                  chevronPosition={playgroundChevronPosition}
                  isDisabled={isDisabled}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">System Configuration</h4>
                    <p className="text-gray-600 mb-3">
                      Advanced system settings, performance configurations, and technical details.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-yellow-500" />
                        <span className="text-sm">Performance optimization recommended</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm">All services running</span>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item4"
                  title="Documentation"
                  subtext={showSubtext ? "Help guides and documentation" : undefined}
                  leftSlot={showIcons ? getIconForItem("item4") : undefined}
                  rightSlot={showRightSlot ? getRightSlotForItem("item4") : undefined}
                  chevronPosition={playgroundChevronPosition}
                  isDisabled={isDisabled}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <p className="text-gray-600 mb-3">
                      Access help guides, tutorials, and comprehensive documentation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        <span className="text-sm">User Guide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        <span className="text-sm">API Documentation</span>
                      </div>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Accordion Types</h2>
        <div className="space-y-8">
          {Object.values(AccordionType).map((type) => (
            <div key={type} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">
                {type === AccordionType.NO_BORDER ? "No Border" : "Border"} Type
              </h3>
              <Accordion accordionType={type} defaultValue="item1">
                <AccordionItem
                  value="item1"
                  title="Getting Started"
                  subtext="Learn the basics and get up to speed quickly"
                  leftSlot={<Home size={16} />}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Getting Started</h4>
                    <p className="text-gray-600">
                      Welcome to the platform! This guide will help you get started with the basic features.
                    </p>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item2"
                  title="Advanced Features"
                  subtext="Explore advanced functionality and customization options"
                  leftSlot={<Settings size={16} />}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Advanced Features</h4>
                    <p className="text-gray-600">
                      Discover advanced features that can help you work more efficiently.
                    </p>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item3"
                  title="Troubleshooting"
                  subtext="Common issues and their solutions"
                  leftSlot={<AlertCircle size={16} />}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Troubleshooting</h4>
                    <p className="text-gray-600">
                      Find solutions to common problems and learn how to resolve issues.
                    </p>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Chevron Positions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Chevron Positions</h2>
        <div className="space-y-8">
          {Object.values(AccordionChevronPosition).map((position) => (
            <div key={position} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{position} Chevron</h3>
              <Accordion defaultValue="item1">
                <AccordionItem
                  value="item1"
                  title="Dashboard Overview"
                  chevronPosition={position}
                  leftSlot={<BarChart3 size={16} />}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Dashboard Overview</h4>
                    <p className="text-gray-600">
                      View your key metrics and important information at a glance.
                    </p>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item2"
                  title="User Management"
                  chevronPosition={position}
                  leftSlot={<User size={16} />}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">User Management</h4>
                    <p className="text-gray-600">
                      Manage user accounts, permissions, and access controls.
                    </p>
                  </div>
                </AccordionItem>

                <AccordionItem
                  value="item3"
                  title="File Management"
                  chevronPosition={position}
                  leftSlot={<FileText size={16} />}
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">File Management</h4>
                    <p className="text-gray-600">
                      Organize and manage your files and documents efficiently.
                    </p>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Multiple Selection */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Multiple Selection</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Multiple Items Open</h3>
          <Accordion isMultiple defaultValue={["item1", "item3"]}>
            <AccordionItem
              value="item1"
              title="Account Settings"
              subtext="Manage your account preferences"
              leftSlot={<User size={16} />}
              rightSlot={<Star size={14} />}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Account Settings</h4>
                <p className="text-gray-600">
                  Configure your account preferences, security settings, and personal information.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              value="item2"
              title="Notifications"
              subtext="Configure notification preferences"
              leftSlot={<Bell size={16} />}
              rightSlot={<Heart size={14} />}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Notifications</h4>
                <p className="text-gray-600">
                  Set up your notification preferences and manage alert settings.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              value="item3"
              title="Data & Privacy"
              subtext="Manage your data and privacy settings"
              leftSlot={<Settings size={16} />}
              rightSlot={<Mail size={14} />}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Data & Privacy</h4>
                <p className="text-gray-600">
                  Control your data sharing preferences and privacy settings.
                </p>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Disabled State */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Disabled State</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Disabled Accordion Items</h3>
          <Accordion defaultValue="item1">
            <AccordionItem
              value="item1"
              title="Active Item"
              subtext="This item is enabled and can be opened"
              leftSlot={<CheckCircle size={16} />}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Active Item</h4>
                <p className="text-gray-600">
                  This accordion item is enabled and can be interacted with normally.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              value="item2"
              title="Disabled Item"
              subtext="This item is disabled and cannot be opened"
              leftSlot={<AlertCircle size={16} />}
              isDisabled={true}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Disabled Item</h4>
                <p className="text-gray-600">
                  This content would be shown if the item was enabled.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              value="item3"
              title="Another Active Item"
              subtext="This item is also enabled"
              leftSlot={<Info size={16} />}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Another Active Item</h4>
                <p className="text-gray-600">
                  This accordion item is also enabled and functional.
                </p>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">FAQ Section</h3>
            <Accordion accordionType={AccordionType.BORDER} defaultValue="faq1">
              <AccordionItem
                value="faq1"
                title="How do I reset my password?"
                subtext="Learn how to securely reset your account password"
                leftSlot={<AlertCircle size={16} />}
              >
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Password Reset Process</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Go to the login page and click "Forgot Password"</li>
                    <li>Enter your email address</li>
                    <li>Check your email for a reset link</li>
                    <li>Click the link and create a new password</li>
                    <li>Log in with your new password</li>
                  </ol>
                </div>
              </AccordionItem>

              <AccordionItem
                value="faq2"
                title="How do I enable two-factor authentication?"
                subtext="Secure your account with 2FA"
                leftSlot={<Settings size={16} />}
              >
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Two-Factor Authentication Setup</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Go to Account Settings</li>
                    <li>Navigate to Security section</li>
                    <li>Click "Enable Two-Factor Authentication"</li>
                    <li>Scan the QR code with your authenticator app</li>
                    <li>Enter the verification code to complete setup</li>
                  </ol>
                </div>
              </AccordionItem>

              <AccordionItem
                value="faq3"
                title="What payment methods do you accept?"
                subtext="Learn about supported payment options"
                leftSlot={<Download size={16} />}
              >
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Accepted Payment Methods</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Credit/Debit Cards (Visa, Mastercard, American Express)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>PayPal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Bank Transfers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Digital Wallets (Apple Pay, Google Pay)</span>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionDemo; 
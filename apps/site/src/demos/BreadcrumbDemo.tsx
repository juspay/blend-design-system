import {
  Breadcrumb,
  type BreadcrumbItemType,
} from "blend-v1";
import { Switch } from "blend-v1";
import { Home, Folder, File, Settings, User, Database, Globe, Star } from "lucide-react";
import { useState } from "react";

const BreadcrumbDemo = () => {
  const [playgroundItems] = useState<BreadcrumbItemType[]>([
    {
      label: "Home",
      href: "/",
      leftSlot: <Home size={16} />,
    },
    {
      label: "Products",
      href: "/products",
      leftSlot: <Folder size={16} />,
    },
    {
      label: "Electronics",
      href: "/products/electronics",
      leftSlot: <Database size={16} />,
      
    },
    {
      label: "Smartphones",
      href: "/products/electronics/smartphones",
      leftSlot: <Globe size={16} />,
    },
  ]);

  const [showSlots, setShowSlots] = useState(false);

  // Sample breadcrumb data for different scenarios
  const simpleBreadcrumb: BreadcrumbItemType[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  const mediumBreadcrumb: BreadcrumbItemType[] = [
    { label: "Home", href: "/", leftSlot: <Home size={16} /> },
    { label: "Products", href: "/products", leftSlot: <Folder size={16} /> },
    { label: "Electronics", href: "/products/electronics", leftSlot: <Database size={16} /> },
    { label: "Smartphones", href: "/products/electronics/smartphones", leftSlot: <Globe size={16} /> },
  ];

  const longBreadcrumb: BreadcrumbItemType[] = [
    { label: "Home", href: "/", leftSlot: <Home size={16} /> },
    { label: "Products", href: "/products", leftSlot: <Folder size={16} /> },
    { label: "Electronics", href: "/products/electronics", leftSlot: <Database size={16} /> },
    { label: "Smartphones", href: "/products/electronics/smartphones", leftSlot: <Globe size={16} /> },
    { label: "Apple", href: "/products/electronics/smartphones/apple", leftSlot: <Star size={16} /> },
    { label: "iPhone", href: "/products/electronics/smartphones/apple/iphone", leftSlot: <File size={16} /> },
    { label: "iPhone 15", href: "/products/electronics/smartphones/apple/iphone/15", leftSlot: <Settings size={16} /> },
  ];

  const breadcrumbWithSlots: BreadcrumbItemType[] = [
    { 
      label: "Home", 
      href: "/", 
      leftSlot: <Home size={16} />,
      rightSlot: <Star size={12} />
    },
    { 
      label: "Settings", 
      href: "/settings", 
      leftSlot: <Settings size={16} />,
      rightSlot: <User size={12} />
    },
    { 
      label: "Profile", 
      href: "/settings/profile", 
      leftSlot: <User size={16} />,
      rightSlot: <Star size={12} />
    },
  ];

  const ecommerceBreadcrumb: BreadcrumbItemType[] = [
    { label: "Home", href: "/", leftSlot: <Home size={16} /> },
    { label: "Shop", href: "/shop", leftSlot: <Folder size={16} /> },
    { label: "Clothing", href: "/shop/clothing", leftSlot: <Database size={16} /> },
    { label: "Men", href: "/shop/clothing/men", leftSlot: <User size={16} /> },
    { label: "Shirts", href: "/shop/clothing/men/shirts", leftSlot: <File size={16} /> },
  ];

  const fileSystemBreadcrumb: BreadcrumbItemType[] = [
    { label: "Root", href: "/", leftSlot: <Home size={16} /> },
    { label: "Documents", href: "/documents", leftSlot: <Folder size={16} /> },
    { label: "Work", href: "/documents/work", leftSlot: <Folder size={16} /> },
    { label: "Projects", href: "/documents/work/projects", leftSlot: <Folder size={16} /> },
    { label: "Design System", href: "/documents/work/projects/design-system", leftSlot: <Folder size={16} /> },
    { label: "Components", href: "/documents/work/projects/design-system/components", leftSlot: <Folder size={16} /> },
    { label: "Breadcrumb.tsx", href: "/documents/work/projects/design-system/components/breadcrumb", leftSlot: <File size={16} /> },
  ];


  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Switch
              label="Show Slots"
              checked={showSlots}
              onChange={() => setShowSlots(!showSlots)}
            />
          </div>

          <div className="min-h-20 rounded-2xl w-full flex items-center p-4 outline-1 outline-gray-200">
            <Breadcrumb
              items={showSlots ? breadcrumbWithSlots : playgroundItems}
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>Click on any breadcrumb item to see navigation feedback.</p>
          </div>
        </div>
      </div>

      {/* Basic Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Basic Examples</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Simple Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={simpleBreadcrumb} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Icons</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={mediumBreadcrumb} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Slots</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={breadcrumbWithSlots} />
            </div>
          </div>
        </div>
      </div>

      {/* Long Navigation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Long Navigation (With Overflow)</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">E-commerce Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={ecommerceBreadcrumb} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">File System Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={fileSystemBreadcrumb} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Deep Product Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={longBreadcrumb} />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Clickable Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb 
                items={mediumBreadcrumb.map(item => ({
                  ...item,
                  href: `#${item.href}`,
                }))}
              />
            </div>
            <p className="text-sm text-gray-600">
              Each breadcrumb item is clickable and will show navigation feedback.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Right Slots</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={breadcrumbWithSlots} />
            </div>
            <p className="text-sm text-gray-600">
              Breadcrumb items can have both left and right slots for additional context.
            </p>
          </div>
        </div>
      </div>

      {/* Different Scenarios */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Different Scenarios</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Website Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={[
                { label: "Home", href: "/", leftSlot: <Home size={16} /> },
                { label: "Blog", href: "/blog", leftSlot: <File size={16} /> },
                { label: "Technology", href: "/blog/technology", leftSlot: <Database size={16} /> },
                { label: "AI", href: "/blog/technology/ai", leftSlot: <Globe size={16} /> },
              ]} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Admin Panel</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={[
                { label: "Dashboard", href: "/dashboard", leftSlot: <Home size={16} /> },
                { label: "Users", href: "/dashboard/users", leftSlot: <User size={16} /> },
                { label: "Settings", href: "/dashboard/users/settings", leftSlot: <Settings size={16} /> },
              ]} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documentation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={[
                { label: "Docs", href: "/docs", leftSlot: <File size={16} /> },
                { label: "Components", href: "/docs/components", leftSlot: <Folder size={16} /> },
                { label: "Breadcrumb", href: "/docs/components/breadcrumb", leftSlot: <File size={16} /> },
              ]} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Settings Navigation</h3>
            <div className="p-4 border rounded-lg">
              <Breadcrumb items={[
                { label: "Settings", href: "/settings", leftSlot: <Settings size={16} /> },
                { label: "Account", href: "/settings/account", leftSlot: <User size={16} /> },
                { label: "Security", href: "/settings/account/security", leftSlot: <Star size={16} /> },
              ]} />
            </div>
          </div>
        </div>
      </div>

      {/* All Combinations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Combinations</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Different Icon Combinations</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border rounded-lg">
                <Breadcrumb items={[
                  { label: "Home", href: "/", leftSlot: <Home size={16} /> },
                  { label: "Products", href: "/products", leftSlot: <Folder size={16} /> },
                  { label: "Electronics", href: "/products/electronics", leftSlot: <Database size={16} /> },
                ]} />
              </div>
              <div className="p-4 border rounded-lg">
                <Breadcrumb items={[
                  { label: "Home", href: "/", leftSlot: <Home size={16} />, rightSlot: <Star size={12} /> },
                  { label: "Settings", href: "/settings", leftSlot: <Settings size={16} />, rightSlot: <User size={12} /> },
                  { label: "Profile", href: "/settings/profile", leftSlot: <User size={16} />, rightSlot: <Star size={12} /> },
                ]} />
              </div>
              <div className="p-4 border rounded-lg">
                <Breadcrumb items={[
                  { label: "Root", href: "/", leftSlot: <Home size={16} /> },
                  { label: "Documents", href: "/documents", leftSlot: <Folder size={16} /> },
                  { label: "Work", href: "/documents/work", leftSlot: <Folder size={16} /> },
                  { label: "Projects", href: "/documents/work/projects", leftSlot: <Folder size={16} /> },
                ]} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Usage Guidelines</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Use breadcrumbs for hierarchical navigation with 2 or more levels</li>
              <li>• Include icons (leftSlot) for better visual hierarchy</li>
              <li>• Keep labels concise and descriptive</li>
              <li>• The last item should represent the current page</li>
              <li>• Use rightSlot sparingly for additional context or actions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Breadcrumbs provide clear navigation context for screen readers</li>
              <li>• Each item is properly linked for keyboard navigation</li>
              <li>• Visual separators (/) help distinguish between levels</li>
              <li>• Overflow handling ensures all items remain accessible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbDemo; 
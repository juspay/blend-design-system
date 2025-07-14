import React from "react";
import { Breadcrumb } from "blend-v1";
import figma from "@figma/code-connect";

/**
 * Breadcrumb Figma Code Connect
 * 
 * Props mapping:
 * - label: exists in both Figma and code
 * - states: Figma only (interaction states)
 * - hasLeftSlot: Figma only (determines if leftSlot is shown)
 * - hasRightSlot: Figma only (determines if rightSlot is shown)
 * - leftSlot: exists in both when hasLeftSlot is true
 * - rightSlot: exists in both when hasRightSlot is true
 * - href: code only (not needed in Figma)
 */

// Note: The Breadcrumb component in code expects an array of items,
// but in Figma we're connecting individual BreadcrumbItem instances.
// This integration shows how a single item would be used within the Breadcrumb component.

figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  props: {
    // Map the label directly
    label: figma.string("label"),
    
    // Map slots based on hasLeftSlot/hasRightSlot booleans
    leftSlot: figma.boolean("hasLeftSlot", {
      true: figma.instance("leftSlot"),
      false: undefined,
    }),
    
    rightSlot: figma.boolean("hasRightSlot", {
      true: figma.instance("rightSlot"),
      false: undefined,
    }),
    
    // states prop is Figma only - used for visual states
    // href is added in code implementation
  },
  
  example: ({ label, leftSlot, rightSlot }) => {
    // Create a breadcrumb item object
    const breadcrumbItem = {
      label,
      href: "#", // Default href for example
      leftSlot,
      rightSlot,
    };
    
    // Show how this item would be used in a Breadcrumb component
    return (
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Category", href: "/category" },
          breadcrumbItem, // The configured item
        ]} 
      />
    );
  },
});

// Variant for item with left slot only
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  variant: { hasLeftSlot: true, hasRightSlot: false },
  props: {
    label: figma.string("label"),
    leftSlot: figma.instance("leftSlot"),
  },
  example: ({ label, leftSlot }) => (
    <Breadcrumb 
      items={[
        { label: "Home", href: "/" },
        { 
          label,
          href: "#",
          leftSlot,
        },
      ]} 
    />
  ),
});

// Variant for item with right slot only
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  variant: { hasLeftSlot: false, hasRightSlot: true },
  props: {
    label: figma.string("label"),
    rightSlot: figma.instance("rightSlot"),
  },
  example: ({ label, rightSlot }) => (
    <Breadcrumb 
      items={[
        { label: "Home", href: "/" },
        { 
          label,
          href: "#",
          rightSlot,
        },
      ]} 
    />
  ),
});

// Variant for item with both slots
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  variant: { hasLeftSlot: true, hasRightSlot: true },
  props: {
    label: figma.string("label"),
    leftSlot: figma.instance("leftSlot"),
    rightSlot: figma.instance("rightSlot"),
  },
  example: ({ label, leftSlot, rightSlot }) => (
    <Breadcrumb 
      items={[
        { label: "Home", href: "/" },
        { 
          label,
          href: "#",
          leftSlot,
          rightSlot,
        },
      ]} 
    />
  ),
});

// Variant for simple item (no slots)
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  variant: { hasLeftSlot: false, hasRightSlot: false },
  props: {
    label: figma.string("label"),
  },
  example: ({ label }) => (
    <Breadcrumb 
      items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label, href: "#" },
      ]} 
    />
  ),
});

// Example showing a complete breadcrumb navigation
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  variant: { states: "default" },
  props: {
    label: figma.string("label"),
    leftSlot: figma.boolean("hasLeftSlot", {
      true: figma.instance("leftSlot"),
      false: undefined,
    }),
    rightSlot: figma.boolean("hasRightSlot", {
      true: figma.instance("rightSlot"),
      false: undefined,
    }),
  },
  example: ({ label, leftSlot, rightSlot }) => {
    // Example with multiple items to show typical usage
    return (
      <Breadcrumb 
        items={[
          { 
            label: "Dashboard", 
            href: "/",
            leftSlot: "🏠", // Example icon
          },
          { 
            label: "Analytics", 
            href: "/analytics" 
          },
          { 
            label: "Reports", 
            href: "/analytics/reports" 
          },
          { 
            label,
            href: "#",
            leftSlot,
            rightSlot,
          },
        ]} 
      />
    );
  },
});

// Active state variant (last item in breadcrumb)
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2159-6521", {
  variant: { states: "active" },
  props: {
    label: figma.string("label"),
    leftSlot: figma.boolean("hasLeftSlot", {
      true: figma.instance("leftSlot"),
      false: undefined,
    }),
    rightSlot: figma.boolean("hasRightSlot", {
      true: figma.instance("rightSlot"),
      false: undefined,
    }),
  },
  example: ({ label, leftSlot, rightSlot }) => (
    <Breadcrumb 
      items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { 
          label, // This will be the active (last) item
          href: "#", // href is ignored for active items
          leftSlot,
          rightSlot,
        },
      ]} 
    />
  ),
});

/**
 * Complete Breadcrumb Component
 * This connects to the full breadcrumb component that contains multiple BreadcrumbItems
 */

// Full Breadcrumb component - base example
figma.connect(Breadcrumb, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2169-255", {
  example: () => (
    <Breadcrumb 
      items={[
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Subcategory", href: "/category/subcategory" },
        { label: "Product", href: "#" },
      ]} 
    />
  ),
});

// Note: Figma Code Connect currently doesn't support dynamic generation based on 
// the actual number of nested components. The above example shows a typical 
// breadcrumb structure. In your implementation, adjust the items array based 
// on your specific navigation hierarchy.

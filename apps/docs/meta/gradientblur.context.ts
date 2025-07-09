import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const gradientblurMeta: ComponentMeta = {
  componentName: "GradientBlur",
  componentDescription:
    "A decorative gradient blur background component that creates animated, colorful gradient effects for visual enhancement and modern UI aesthetics.",
  features: [
    "Animated gradient background effects",
    "Multiple gradient layers for depth",
    "CSS-based animations for performance",
    "No configuration required",
    "Lightweight and performant",
    "Modern visual aesthetics",
    "Responsive design",
    "Easy integration",
  ],
  usageExamples: [
    {
      title: "Basic Gradient Blur",
      description: "Simple gradient blur background effect",
      code: `<div style={{ position: 'relative', minHeight: '400px' }}>
  <GradientBlur />
  <div style={{ position: 'relative', zIndex: 1 }}>
    <h1>Content over gradient blur</h1>
    <p>This content appears above the gradient blur effect.</p>
  </div>
</div>`,
    },
    {
      title: "Hero Section with Gradient Blur",
      description: "Using gradient blur as a hero section background",
      code: `<section style={{ position: 'relative', height: '100vh' }}>
  <GradientBlur />
  <div style={{ 
    position: 'relative', 
    zIndex: 1, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center'
  }}>
    <div>
      <h1>Welcome to Our Platform</h1>
      <p>Experience the future of design</p>
      <Button text="Get Started" />
    </div>
  </div>
</section>`,
    },
    {
      title: "Card with Gradient Blur Background",
      description: "Gradient blur as a card background",
      code: `<div style={{ 
  position: 'relative', 
  borderRadius: '12px', 
  overflow: 'hidden',
  padding: '2rem'
}}>
  <GradientBlur />
  <div style={{ position: 'relative', zIndex: 1 }}>
    <h3>Featured Content</h3>
    <p>This card has a beautiful gradient blur background.</p>
  </div>
</div>`,
    },
    {
      title: "Modal Backdrop with Gradient Blur",
      description: "Using gradient blur as a modal backdrop",
      code: `<div style={{ 
  position: 'fixed', 
  inset: 0, 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
}}>
  <GradientBlur />
  <div style={{ 
    position: 'relative', 
    zIndex: 1, 
    background: 'white', 
    borderRadius: '8px', 
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }}>
    <h2>Modal Content</h2>
    <p>Modal with gradient blur backdrop</p>
  </div>
</div>`,
    },
  ],
  props: [],
};

export default gradientblurMeta;

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    CodeBlock,
    CodeBlockVariant,
    DiffLineType,
    ThemeProvider,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { Theme } from '../../../../../../packages/blend/lib/context/theme.enum'

const meta: Meta<typeof CodeBlock> = {
    title: 'Components/CodeBlock',
    component: CodeBlock,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for content components
        a11y: getA11yConfig('content'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A code block component for displaying syntax-highlighted code with support for multiple languages, line numbers, diff views, and copy functionality.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { CodeBlock, CodeBlockVariant } from '@juspay/blend-design-system';

function MyCodeBlock() {
  return (
    <CodeBlock
      code="const greeting = 'Hello, World!';"
      language="javascript"
      showLineNumbers
      showCopyButton
    />
  );
}
\`\`\`
## Features
- **Syntax Highlighting**: Support for multiple programming languages
- **Line Numbers**: Optional line number display
- **Diff View**: Side-by-side diff comparison mode
- **Copy to Clipboard**: One-click code copying
- **Multiple Variants**: Default, no-gutter, and diff variants
- **Custom Headers**: Customizable header with slots
- **Auto Formatting**: Optional automatic code formatting

## Accessibility

**WCAG Compliance**: 2.2 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Semantic HTML structure (\`<pre>\`, \`<code>\`)
- Proper text contrast (4.5:1 minimum)
- Text resizable up to 200% without loss of functionality
- Keyboard accessible copy button
- Screen reader support for code content

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception)
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: 2.5.5 Target Size - copy button needs 44x44px minimum for AAA

**Key Accessibility Features**:
- Semantic HTML structure with \`<pre>\` and \`<code>\` elements
- Keyboard accessible copy button with proper ARIA labels
- Proper focus indicators on interactive elements
- Text content is readable by screen readers
- Line numbers are non-selectable (user-select: none) to prevent confusion
- Code content maintains logical reading order

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report
                `,
            },
        },
    },
    argTypes: {
        code: {
            control: 'text',
            description: 'The code content to display',
        },
        variant: {
            control: 'select',
            options: Object.values(CodeBlockVariant),
            description: 'Visual variant of the code block',
        },
        showLineNumbers: {
            control: 'boolean',
            description: 'Whether to show line numbers',
        },
        showHeader: {
            control: 'boolean',
            description: 'Whether to show the header',
        },
        header: {
            control: 'text',
            description: 'Header text',
        },
        showCopyButton: {
            control: 'boolean',
            description: 'Whether to show the copy button',
        },
        autoFormat: {
            control: 'boolean',
            description: 'Whether to auto-format the code',
        },
        language: {
            control: 'select',
            options: [
                'javascript',
                'typescript',
                'jsx',
                'tsx',
                'json',
                'css',
                'html',
                'markdown',
                'yaml',
                'python',
                'rust',
                'haskell',
            ],
            description: 'Programming language for syntax highlighting',
        },
        headerLeftSlot: {
            control: false,
            description:
                'Custom content to display on the left side of the header. Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Header',
            },
        },
        headerRightSlot: {
            control: false,
            description:
                'Custom content to display on the right side of the header. Pass a React element.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Header',
            },
        },
        diffLines: {
            control: 'object',
            description:
                'Array of diff line objects for highlighting code changes',
            table: {
                type: {
                    summary: 'DiffLine[]',
                    detail: `{
  content?: string;           // Line content
  lineNumber?: number;        // Original line number
  type: 'added' | 'removed' | 'unchanged';
}`,
                },
                category: 'Diff View',
            },
        },
        isDiffUnchangedCollapsed: {
            control: 'boolean',
            description:
                'Whether to collapse unchanged lines in diff view, showing only context lines around changes',
        },
        diffContextLines: {
            control: 'number',
            description:
                'Number of unchanged context lines to show around changed lines when isDiffUnchangedCollapsed is true',
        },
        diffExpandChunk: {
            control: 'number',
            description:
                'Number of lines to expand when clicking expand buttons in collapsed diff view',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CodeBlock>

// Default story
export const Default: Story = {
    args: {
        code: `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
        language: 'typescript',
        showLineNumbers: true,
        showHeader: true,
        header: 'example.ts',
        showCopyButton: true,
    },
}

// Without line numbers
export const NoLineNumbers: Story = {
    args: {
        code: `const data = {
  name: 'John',
  age: 30,
  city: 'New York'
};`,
        language: 'javascript',
        showLineNumbers: false,
        showHeader: true,
        header: 'data.js',
        showCopyButton: true,
    },
}

// No gutter variant
export const NoGutter: Story = {
    args: {
        code: `import React from 'react';

export const Component = () => {
  return <div>Hello World</div>;
};`,
        variant: CodeBlockVariant.NO_GUTTER,
        language: 'jsx',
        showLineNumbers: false,
        showHeader: true,
        header: 'Component.tsx',
        showCopyButton: true,
    },
}

// Diff variant
export const Diff: Story = {
    args: {
        code: '',
        variant: CodeBlockVariant.DIFF,
        diffLines: [
            {
                content: 'const oldCode = "removed";',
                type: DiffLineType.REMOVED,
            },
            {
                content: 'const unchanged = "same";',
                type: DiffLineType.UNCHANGED,
            },
            { content: 'const newCode = "added";', type: DiffLineType.ADDED },
            {
                content: 'const another = "unchanged";',
                type: DiffLineType.UNCHANGED,
            },
        ],
        showLineNumbers: true,
        showHeader: true,
        header: 'changes.diff',
        showCopyButton: true,
    },
}

// Different languages
export const JavaScript: Story = {
    args: {
        code: `// JavaScript example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        language: 'javascript',
        showLineNumbers: true,
        showHeader: true,
        header: 'fibonacci.js',
        showCopyButton: true,
    },
}

export const Python: Story = {
    args: {
        code: `# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
        language: 'python',
        showLineNumbers: true,
        showHeader: true,
        header: 'fibonacci.py',
        showCopyButton: true,
    },
}

export const JSON: Story = {
    args: {
        code: `{
  "name": "CodeBlock",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}`,
        language: 'json',
        showLineNumbers: true,
        showHeader: true,
        header: 'package.json',
        showCopyButton: true,
    },
}

// Without header
export const NoHeader: Story = {
    args: {
        code: `const message = 'Code block without header';
console.log(message);`,
        language: 'javascript',
        showLineNumbers: true,
        showHeader: false,
        showCopyButton: true,
    },
}

// Without copy button
export const NoCopyButton: Story = {
    args: {
        code: `const readOnly = 'This code cannot be copied';
// Copy button is hidden`,
        language: 'javascript',
        showLineNumbers: true,
        showHeader: true,
        header: 'readonly.js',
        showCopyButton: false,
    },
}

// Header with custom slots
export const WithHeaderSlots: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Custom Left Slot (File Icon)
                </h4>
                <CodeBlock
                    code={`const greeting = 'Hello, World!';`}
                    language="javascript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="greeting.js"
                    headerLeftSlot={<span className="text-lg">📄</span>}
                    showCopyButton={true}
                />
            </div>

            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Custom Right Slot (Status Badge)
                </h4>
                <CodeBlock
                    code={`function calculateSum(a: number, b: number): number {
  return a + b;
}`}
                    language="typescript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="math.ts"
                    headerRightSlot={
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                            Production
                        </span>
                    }
                    showCopyButton={true}
                />
            </div>

            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Both Slots (File Icon + Actions)
                </h4>
                <CodeBlock
                    code={`export const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
};`}
                    language="typescript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="config.ts"
                    headerLeftSlot={<span className="text-lg">⚙️</span>}
                    headerRightSlot={
                        <div className="flex gap-2">
                            <button className="bg-transparent border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer">
                                Edit
                            </button>
                            <button className="bg-transparent border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer">
                                Delete
                            </button>
                        </div>
                    }
                    showCopyButton={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates custom header slots for adding icons, badges, and action buttons to the code block header.',
            },
        },
    },
}

// Auto-format example
export const AutoFormat: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Without Auto-Format (Minified)
                </h4>
                <CodeBlock
                    code={`{const x=1;const y=2;const sum=x+y;console.log(sum);}`}
                    language="javascript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="minified.js"
                    autoFormat={false}
                    showCopyButton={true}
                />
            </div>

            <div>
                <h4 className="text-sm font-semibold mb-3">
                    With Auto-Format (Pretty Print)
                </h4>
                <CodeBlock
                    code={`{const x=1;const y=2;const sum=x+y;console.log(sum);}`}
                    language="javascript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="formatted.js"
                    autoFormat={true}
                    showCopyButton={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates auto-formatting capability that pretty-prints minified or poorly formatted code.',
            },
        },
    },
}

// Max height with scroll
export const MaxHeight: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Limited Height (300px) - Content Scrolls
                </h4>
                <CodeBlock
                    code={`// Line 1: Import statements
import React, { useState, useEffect } from 'react';
import { fetchUserData } from './api';

// Line 5: Interface definition
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Line 12: Component definition
export const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Line 19: Effect for data fetching
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData(userId);
        setUser(data);
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  // Line 37: Render loading state
  if (loading) {
    return <div>Loading user profile...</div>;
  }

  // Line 42: Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Line 47: Render user profile
  return (
    <div className="user-profile">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <span className="role">{user?.role}</span>
    </div>
  );
};`}
                    language="tsx"
                    showLineNumbers={true}
                    showHeader={true}
                    header="UserProfile.tsx"
                    maxHeight="300px"
                    showCopyButton={true}
                />
            </div>

            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Limited Height (200px) - More Compact
                </h4>
                <CodeBlock
                    code={`function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
const results: number[] = [];
for (let i = 0; i < 10; i++) {
  results.push(fibonacci(i));
}

console.log('Fibonacci sequence:', results);
console.log('First 10 numbers calculated successfully');`}
                    language="typescript"
                    showLineNumbers={true}
                    showHeader={true}
                    header="fibonacci.ts"
                    maxHeight="200px"
                    showCopyButton={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates maxHeight prop that limits code block height and enables scrolling while keeping the header fixed.',
            },
        },
    },
}

// Advanced diff with collapsed unchanged lines
export const AdvancedDiff: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Collapsed Unchanged Lines (GitHub-style)
                </h4>
                <CodeBlock
                    code=""
                    variant={CodeBlockVariant.DIFF}
                    diffLines={[
                        {
                            content: 'import React from "react";',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: 'import { Button } from "./Button";',
                            type: DiffLineType.UNCHANGED,
                        },
                        { content: '', type: DiffLineType.UNCHANGED },
                        {
                            content: '// Component configuration',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: 'const CONFIG = {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '  maxRetries: 3,',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content: '  maxRetries: 5,',
                            type: DiffLineType.ADDED,
                        },
                        {
                            content: '  timeout: 5000,',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '  debug: false,',
                            type: DiffLineType.UNCHANGED,
                        },
                        { content: '};', type: DiffLineType.UNCHANGED },
                        { content: '', type: DiffLineType.UNCHANGED },
                        {
                            content: '// Utility functions',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: 'const formatData = (data: any) => {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '  return JSON.stringify(data, null, 2);',
                            type: DiffLineType.UNCHANGED,
                        },
                        { content: '};', type: DiffLineType.UNCHANGED },
                        { content: '', type: DiffLineType.UNCHANGED },
                        {
                            content: 'export const App = () => {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '  const [count, setCount] = useState(0);',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content:
                                '  const [count, setCount] = useState<number>(0);',
                            type: DiffLineType.ADDED,
                        },
                        { content: '  ', type: DiffLineType.UNCHANGED },
                        {
                            content: '  const handleClick = () => {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '    setCount(count + 1);',
                            type: DiffLineType.UNCHANGED,
                        },
                        { content: '  };', type: DiffLineType.UNCHANGED },
                        { content: '  ', type: DiffLineType.UNCHANGED },
                        { content: '  return (', type: DiffLineType.UNCHANGED },
                        {
                            content: '    <div>Hello World</div>',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content: '    <div>Hello Universe</div>',
                            type: DiffLineType.ADDED,
                        },
                        { content: '  );', type: DiffLineType.UNCHANGED },
                        { content: '};', type: DiffLineType.UNCHANGED },
                    ]}
                    showLineNumbers={true}
                    showHeader={true}
                    header="config.tsx (with collapsed view)"
                    showCopyButton={true}
                    isDiffUnchangedCollapsed={true}
                    diffContextLines={2}
                    diffExpandChunk={10}
                />
            </div>

            <div>
                <h4 className="text-sm font-semibold mb-3">
                    Full Diff View (No Collapse)
                </h4>
                <CodeBlock
                    code=""
                    variant={CodeBlockVariant.DIFF}
                    diffLines={[
                        {
                            content: 'function calculateTotal(items) {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '  let total = 0;',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content:
                                '  for (let i = 0; i < items.length; i++) {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '    total += items[i].price;',
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content:
                                '    total += items[i].price * items[i].quantity;',
                            type: DiffLineType.ADDED,
                        },
                        { content: '  }', type: DiffLineType.UNCHANGED },
                        {
                            content: '  return total;',
                            type: DiffLineType.UNCHANGED,
                        },
                        { content: '}', type: DiffLineType.UNCHANGED },
                    ]}
                    showLineNumbers={true}
                    showHeader={true}
                    header="shopping-cart.js (full view)"
                    showCopyButton={true}
                    isDiffUnchangedCollapsed={false}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates advanced diff features including collapsed unchanged lines (GitHub-style), configurable context lines, and expandable chunks.',
            },
        },
    },
}

/** Container, gutter, and syntax colors under dark theme tokens. */
export const Dark: Story = {
    name: 'Dark theme',
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.DARK}>
                <div
                    style={{
                        background: '#0E121B',
                        padding: 24,
                        borderRadius: 8,
                    }}
                >
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    render: () => (
        <CodeBlock
            code={`// Dark syntax palette
function greet(name: string) {
  const message = \`Hello, \${name}!\`;
  return message.length > 0 ? message : 42;
}`}
            language="typescript"
            showLineNumbers
            showHeader
            header="greet.ts"
            showCopyButton
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Dark theme CodeBlock: container/gutter chrome and syntax map (keyword/string/comment/etc.).',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}

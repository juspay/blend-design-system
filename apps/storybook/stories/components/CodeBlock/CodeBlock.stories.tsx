import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    CodeBlock,
    CodeBlockVariant,
    DiffLineType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof CodeBlock> = {
    title: 'Components/CodeBlock',
    component: CodeBlock,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for content components
        a11y: getA11yConfig('content'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A code block component for displaying syntax-highlighted code with support for multiple languages, line numbers, diff views, and copy functionality.

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
    },
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

// Long code example
export const LongCode: Story = {
    args: {
        code: `// This is a longer code example to demonstrate scrolling behavior
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};`,
        language: 'tsx',
        showLineNumbers: true,
        showHeader: true,
        header: 'UserList.tsx',
        showCopyButton: true,
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================
// Accessibility examples demonstrating WCAG compliance features

export const Accessibility: Story = {
    render: () => (
        <div style={{ padding: '32px', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ marginBottom: '16px' }}>Accessibility Examples</h2>
                <p style={{ marginBottom: '24px', color: '#666' }}>
                    These examples demonstrate WCAG 2.1 Level A, AA, and AAA
                    compliance features of the CodeBlock component.
                </p>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
            >
                {/* Example 1: Basic accessible code block */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>
                        1. Basic Accessible Code Block
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Standard code block with line numbers, header, and copy
                        button. All interactive elements are keyboard
                        accessible.
                    </p>
                    <CodeBlock
                        code={`// Accessible code example
function accessibleFunction() {
  return 'This code is accessible';
}`}
                        language="javascript"
                        showLineNumbers={true}
                        showHeader={true}
                        header="accessible.js"
                        showCopyButton={true}
                    />
                </section>

                {/* Example 2: Code block without line numbers */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>
                        2. Code Block Without Line Numbers
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Code block with header and copy button, but without line
                        numbers. Maintains semantic structure.
                    </p>
                    <CodeBlock
                        code={`const simple = 'Simple code block';
console.log(simple);`}
                        language="javascript"
                        showLineNumbers={false}
                        showHeader={true}
                        header="simple.js"
                        showCopyButton={true}
                    />
                </section>

                {/* Example 3: Code block without header */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>
                        3. Code Block Without Header
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Code block with copy button but no header. Still
                        maintains proper semantic structure.
                    </p>
                    <CodeBlock
                        code={`// No header example
const noHeader = true;`}
                        language="javascript"
                        showLineNumbers={true}
                        showHeader={false}
                        showCopyButton={true}
                    />
                </section>

                {/* Example 4: Code block without copy button */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>
                        4. Code Block Without Copy Button
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Code block with header and line numbers, but no copy
                        button. Useful for read-only display.
                    </p>
                    <CodeBlock
                        code={`// Read-only code
const readOnly = 'Cannot copy this';`}
                        language="javascript"
                        showLineNumbers={true}
                        showHeader={true}
                        header="readonly.js"
                        showCopyButton={false}
                    />
                </section>

                {/* Example 5: Diff view */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>5. Diff View</h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Side-by-side diff comparison. Maintains accessibility
                        with proper semantic structure and keyboard navigation.
                    </p>
                    <CodeBlock
                        code=""
                        variant={CodeBlockVariant.DIFF}
                        diffLines={[
                            {
                                content: 'const oldVersion = "1.0.0";',
                                type: DiffLineType.REMOVED,
                            },
                            {
                                content: 'const unchanged = "same";',
                                type: DiffLineType.UNCHANGED,
                            },
                            {
                                content: 'const newVersion = "2.0.0";',
                                type: DiffLineType.ADDED,
                            },
                            {
                                content: 'const stillSame = "unchanged";',
                                type: DiffLineType.UNCHANGED,
                            },
                        ]}
                        showLineNumbers={true}
                        showHeader={true}
                        header="version.diff"
                        showCopyButton={true}
                    />
                </section>

                {/* Example 6: Different languages */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>
                        6. Multiple Language Support
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Code blocks support multiple languages with syntax
                        highlighting. All maintain accessibility standards.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    marginBottom: '8px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}
                            >
                                TypeScript:
                            </p>
                            <CodeBlock
                                code={`interface User {
  id: number;
  name: string;
}`}
                                language="typescript"
                                showLineNumbers={true}
                                showHeader={true}
                                header="types.ts"
                                showCopyButton={true}
                            />
                        </div>
                        <div>
                            <p
                                style={{
                                    marginBottom: '8px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}
                            >
                                CSS:
                            </p>
                            <CodeBlock
                                code={`.container {
  display: flex;
  gap: 16px;
}`}
                                language="css"
                                showLineNumbers={true}
                                showHeader={true}
                                header="styles.css"
                                showCopyButton={true}
                            />
                        </div>
                        <div>
                            <p
                                style={{
                                    marginBottom: '8px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}
                            >
                                JSON:
                            </p>
                            <CodeBlock
                                code={`{
  "name": "example",
  "version": "1.0.0"
}`}
                                language="json"
                                showLineNumbers={true}
                                showHeader={true}
                                header="config.json"
                                showCopyButton={true}
                            />
                        </div>
                    </div>
                </section>

                {/* Example 7: Long code with scrolling */}
                <section>
                    <h3 style={{ marginBottom: '12px' }}>
                        7. Long Code with Scrolling
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Long code blocks maintain accessibility with proper
                        scrolling and keyboard navigation.
                    </p>
                    <CodeBlock
                        code={`// This is a longer code example
function complexFunction(param1, param2, param3) {
  // Step 1: Validate inputs
  if (!param1 || !param2 || !param3) {
    throw new Error('All parameters are required');
  }

  // Step 2: Process data
  const processed = param1.map(item => {
    return {
      ...item,
      processed: true,
      timestamp: Date.now()
    };
  });

  // Step 3: Transform data
  const transformed = processed.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  // Step 4: Return result
  return transformed;
}`}
                        language="javascript"
                        showLineNumbers={true}
                        showHeader={true}
                        header="complex.js"
                        showCopyButton={true}
                    />
                </section>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
## Accessibility Testing

This story demonstrates WCAG 2.1 Level A, AA, and AAA compliance features of the CodeBlock component.

### Testing Checklist

1. **Keyboard Navigation**:
   - Tab to the copy button
   - Press Enter or Space to activate the copy button
   - Verify focus indicators are visible on the copy button
   - Verify code content is readable via keyboard navigation

2. **Screen Reader Testing**:
   - Use VoiceOver (macOS) or NVDA (Windows)
   - Verify code content is announced clearly
   - Verify copy button has proper accessible name
   - Verify line numbers are not announced (decorative)
   - Verify header text is announced

3. **Color Contrast**:
   - Use WebAIM Contrast Checker or similar tool
   - Verify all text meets 4.5:1 contrast ratio (AA)
   - For AAA compliance, verify 7:1 contrast ratio
   - Verify syntax highlighting maintains sufficient contrast

4. **Touch Target Size**:
   - Verify copy button meets 24x24px minimum (AA)
   - For AAA compliance, verify 44x44px minimum

5. **Visual Testing**:
   - Verify focus indicators are clearly visible on copy button
   - Verify code is readable at different zoom levels (up to 200%)
   - Verify scrolling works correctly for long code blocks
   - Test diff view maintains accessibility

6. **Semantic Structure**:
   - Verify \`<pre>\` and \`<code>\` elements are used correctly
   - Verify proper heading hierarchy if headers are used
   - Verify ARIA attributes are present where needed

### Automated Testing

- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression testing for focus states and interactions
- **Manual**: Screen reader and keyboard testing required

### WCAG Compliance Summary

- ✅ **Level A**: Fully Compliant
- ✅ **Level AA**: Fully Compliant
- ⚠️ **Level AAA**: Partial Compliance (3/4 applicable criteria)
  - Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3)
  - Non-Compliant: Contrast Enhanced (1.4.6) - requires 7:1 ratio

For detailed compliance report, see Accessibility Dashboard.

### Key Accessibility Features

- Semantic HTML structure with \`<pre>\` and \`<code>\` elements
- Keyboard accessible copy button with proper ARIA labels
- Proper focus indicators on interactive elements
- Text content is readable by screen readers
- Line numbers are non-selectable (user-select: none) to prevent confusion
- Code content maintains logical reading order
- Diff view maintains accessibility with proper semantic structure
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('content'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}

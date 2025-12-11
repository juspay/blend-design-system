import CodeBlock from '../../../CodeBlock/CodeBlock'
import { CodeBlockVariant, DiffLineType } from '../../../CodeBlock/types'

const CodeBlockLightHouse = () => {
    return (
        <div className="flex flex-col gap-8 p-8 min-h-screen">
            {/* Page Content - Visible to Lighthouse */}
            <main role="main">
                <h1>CodeBlock Accessibility Testing</h1>
                <p>
                    This page demonstrates the CodeBlock component for
                    Lighthouse accessibility auditing. Multiple code block
                    configurations are shown to test various accessibility
                    features.
                </p>
            </main>

            {/* Basic CodeBlock */}
            <section aria-labelledby="basic-codeblock-heading">
                <h2 id="basic-codeblock-heading">Basic CodeBlock</h2>
                <div style={{ padding: '20px' }}>
                    <CodeBlock
                        code={`function greet(name) {
    console.log("Hello, " + name + "!");
}`}
                        header="example.js"
                        showLineNumbers
                        showCopyButton
                        language="javascript"
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Basic code block with line numbers, header, and copy button.
                    All interactive elements have proper ARIA attributes and
                    keyboard navigation support.
                </p>
            </section>

            {/* CodeBlock without Line Numbers */}
            <section aria-labelledby="no-line-numbers-heading">
                <h2 id="no-line-numbers-heading">
                    CodeBlock without Line Numbers
                </h2>
                <div style={{ padding: '20px' }}>
                    <CodeBlock
                        code={`const x = 10;
const y = 20;
const sum = x + y;`}
                        header="math.js"
                        showLineNumbers={false}
                        showCopyButton
                        language="javascript"
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Code block without line numbers. Line number gutters are
                    hidden from screen readers with aria-hidden="true".
                </p>
            </section>

            {/* CodeBlock without Header */}
            <section aria-labelledby="no-header-heading">
                <h2 id="no-header-heading">CodeBlock without Header</h2>
                <div style={{ padding: '20px' }}>
                    <CodeBlock
                        code={`{
  "name": "example",
  "version": "1.0.0"
}`}
                        showHeader={false}
                        showCopyButton
                        language="json"
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Code block without header. The main region has aria-label
                    describing the code block.
                </p>
            </section>

            {/* CodeBlock without Copy Button */}
            <section aria-labelledby="no-copy-button-heading">
                <h2 id="no-copy-button-heading">
                    CodeBlock without Copy Button
                </h2>
                <div style={{ padding: '20px' }}>
                    <CodeBlock
                        code={`const data = {
    users: [],
    count: 0
};`}
                        header="data.js"
                        showLineNumbers
                        showCopyButton={false}
                        language="javascript"
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Code block without copy button. Code content is still
                    focusable for scrolling and selection.
                </p>
            </section>

            {/* Diff View */}
            <section aria-labelledby="diff-view-heading">
                <h2 id="diff-view-heading">Diff View</h2>
                <div style={{ padding: '20px' }}>
                    <CodeBlock
                        code=""
                        variant={CodeBlockVariant.DIFF}
                        diffLines={[
                            {
                                content: 'const old = 1;',
                                type: DiffLineType.REMOVED,
                            },
                            {
                                content: 'const new = 2;',
                                type: DiffLineType.ADDED,
                            },
                            {
                                content: 'const unchanged = 3;',
                                type: DiffLineType.UNCHANGED,
                            },
                        ]}
                        header="version.diff"
                        showLineNumbers
                        showCopyButton
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Diff view showing removed, added, and unchanged lines. Each
                    side has proper role="group" with aria-label ("Removed
                    code", "Added code").
                </p>
            </section>

            {/* Multiple Languages */}
            <section aria-labelledby="multiple-languages-heading">
                <h2 id="multiple-languages-heading">Multiple Languages</h2>
                <div style={{ padding: '20px' }}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2">
                                TypeScript
                            </h3>
                            <CodeBlock
                                code={`interface User {
  name: string;
  age: number;
}`}
                                header="types.ts"
                                language="typescript"
                                showLineNumbers
                                showCopyButton
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-2">Python</h3>
                            <CodeBlock
                                code={`def greet(name):
    print(f"Hello, {name}!")`}
                                header="main.py"
                                language="python"
                                showLineNumbers
                                showCopyButton
                            />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-600">
                    Code blocks support syntax highlighting for various
                    programming languages. All variants maintain accessibility
                    standards.
                </p>
            </section>
        </div>
    )
}

export default CodeBlockLightHouse

import { useEffect, useState } from 'react'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import {
    CodeEditor,
    CodeEditorVariant,
} from '../../../../packages/blend/lib/components/CodeEditor'
import { Modal } from '../../../../packages/blend/lib/components/Modal'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import type { SupportedLanguage } from '../../../../packages/blend/lib/components/CodeBlock/types'

const CodeEditorDemo = () => {
    // State for controls
    const [variant, setVariant] = useState<CodeEditorVariant>(
        CodeEditorVariant.DEFAULT
    )
    const [showLineNumbers, setShowLineNumbers] = useState(true)
    const [showHeader, setShowHeader] = useState(true)
    const [headerText, setHeaderText] = useState('editor.js')
    const [language, setLanguage] = useState<SupportedLanguage>('javascript')
    const [readOnly, setReadOnly] = useState(false)
    const [disabled, setDisabled] = useState(false)

    // Modal state
    const [isCodeEditorModalOpen, setIsCodeEditorModalOpen] = useState(false)

    // Code examples
    const codeExamples = {
        payment: `function getPaymentPriority(order) {
  const priorities = [];
  if (order.udf3 === 'insurance' && order.udf4 === 'health' && order.paymentMethod === 'UPI') {
    priorities.push('PAYU');
  }
  return priorities.length ? priorities : ['DEFAULT'];
}`,
        react: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}`,
        typescript: `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}`,
        json: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "active": true
}`,
        python: `# Python Example - List Comprehension & Dictionary
def process_transactions(transactions):
    # Filter and transform transactions
    valid_txns = [
        txn for txn in transactions
        if txn['amount'] > 0 and txn['status'] == 'completed'
    ]

    # Group by currency
    by_currency = {}
    for txn in valid_txns:
        currency = txn.get('currency', 'USD')
        if currency not in by_currency:
            by_currency[currency] = []
        by_currency[currency].append(txn)

    return by_currency`,
    }

    const [code, setCode] = useState(codeExamples.payment)

    // Options for selects
    const variantOptions = [
        {
            value: CodeEditorVariant.DEFAULT,
            label: 'Default (with line numbers)',
        },
        { value: CodeEditorVariant.NO_GUTTER, label: 'No Gutter' },
    ]

    const languageOptions = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'jsx', label: 'JSX' },
        { value: 'tsx', label: 'TSX' },
        { value: 'json', label: 'JSON' },
        { value: 'python', label: 'Python' },
        { value: 'css', label: 'CSS' },
        { value: 'html', label: 'HTML' },
    ]

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'auto' })
        }
    }, [])

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-3xl font-bold">
                            CodeEditor Component Demo
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Edit code with syntax highlighting and real-time
                            updates
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal Examples */}
            <div className="space-y-6" id="modal-examples">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Modal Examples</h2>
                    <p className="text-gray-600">
                        CodeEditor components can be displayed inside modals for
                        focused code editing
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button
                        text="View CodeEditor in Modal"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => setIsCodeEditorModalOpen(true)}
                    />
                </div>
            </div>

            {/* Interactive Playground */}
            <div className="space-y-6" id="playground">
                <h2 className="text-2xl font-bold">Interactive Playground</h2>
                <p className="text-gray-600">
                    Customize the code editor appearance and test different code
                    examples. Try editing the code below!
                </p>

                {/* Controls */}
                <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={variant}
                            onSelect={(value) =>
                                setVariant(value as CodeEditorVariant)
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Language"
                            items={[{ items: languageOptions }]}
                            selected={language}
                            onSelect={(value) =>
                                setLanguage(value as SupportedLanguage)
                            }
                            placeholder="Select language"
                        />

                        <TextInput
                            label="Header Text"
                            value={headerText}
                            onChange={(e) => setHeaderText(e.target.value)}
                            placeholder="Enter header text"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Show Header"
                            checked={showHeader}
                            onChange={() => setShowHeader(!showHeader)}
                        />
                        <Switch
                            label="Show Line Numbers"
                            checked={showLineNumbers}
                            onChange={() =>
                                setShowLineNumbers(!showLineNumbers)
                            }
                        />
                        <Switch
                            label="Read Only"
                            checked={readOnly}
                            onChange={() => setReadOnly(!readOnly)}
                        />
                        <Switch
                            label="Disabled"
                            checked={disabled}
                            onChange={() => setDisabled(!disabled)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Code Example Templates
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                text="Payment Function"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                onClick={() => setCode(codeExamples.payment)}
                            />
                            <Button
                                text="React Component"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                onClick={() => {
                                    setCode(codeExamples.react)
                                    setLanguage('jsx')
                                }}
                            />
                            <Button
                                text="TypeScript"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                onClick={() => {
                                    setCode(codeExamples.typescript)
                                    setLanguage('typescript')
                                }}
                            />
                            <Button
                                text="JSON"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                onClick={() => {
                                    setCode(codeExamples.json)
                                    setLanguage('json')
                                }}
                            />
                            <Button
                                text="Python"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                onClick={() => {
                                    setCode(codeExamples.python)
                                    setLanguage('python')
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <p className="text-sm text-gray-600">
                        Edit the code below to see real-time syntax highlighting
                    </p>
                    <CodeEditor
                        value={code}
                        onChange={(newCode) => setCode(newCode)}
                        variant={variant}
                        showLineNumbers={showLineNumbers}
                        showHeader={showHeader}
                        header={headerText}
                        language={language}
                        readOnly={readOnly}
                        disabled={disabled}
                        placeholder="Start typing your code..."
                        minHeight="300px"
                    />
                </div>
            </div>

            {/* Variants Showcase */}
            <div className="space-y-6" id="variants">
                <h2 className="text-2xl font-bold">Variants</h2>
                <p className="text-gray-600">
                    Different variants of the CodeEditor component
                </p>

                <div className="space-y-8">
                    {/* Default Variant */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Default (with line numbers)
                        </h3>
                        <p className="text-sm text-gray-600">
                            Shows line numbers on the left gutter for easy
                            reference while editing
                        </p>
                        <CodeEditor
                            value={codeExamples.payment}
                            onChange={() => {}}
                            variant={CodeEditorVariant.DEFAULT}
                            header="payment.js"
                            language="javascript"
                        />
                    </div>

                    {/* No Gutter Variant */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">No Gutter</h3>
                        <p className="text-sm text-gray-600">
                            Clean code editor without line numbers
                        </p>
                        <CodeEditor
                            value={codeExamples.payment}
                            onChange={() => {}}
                            variant={CodeEditorVariant.NO_GUTTER}
                            header="payment.js"
                            language="javascript"
                        />
                    </div>

                    {/* Read Only */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Read Only</h3>
                        <p className="text-sm text-gray-600">
                            Code editor in read-only mode - code is visible but
                            not editable
                        </p>
                        <CodeEditor
                            value={codeExamples.typescript}
                            onChange={() => {}}
                            variant={CodeEditorVariant.DEFAULT}
                            header="types.ts"
                            language="typescript"
                            readOnly={true}
                        />
                    </div>

                    {/* Disabled */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Disabled</h3>
                        <p className="text-sm text-gray-600">
                            Code editor in disabled state
                        </p>
                        <CodeEditor
                            value={codeExamples.python}
                            onChange={() => {}}
                            variant={CodeEditorVariant.DEFAULT}
                            header="process.py"
                            language="python"
                            disabled={true}
                        />
                    </div>
                </div>
            </div>

            {/* Height Demo */}
            <div className="space-y-6" id="height-demo">
                <h2 className="text-2xl font-bold">Height Demo</h2>
                <p className="text-gray-600">
                    Use the <code>height</code> prop to lock the editor to a
                    fixed height, or rely on <code>minHeight</code> for natural
                    expansion.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Fixed Height</h3>
                        <p className="text-sm text-gray-600">
                            The editor stays exactly 200px tall regardless of
                            the content.
                        </p>
                        <CodeEditor
                            value={codeExamples.payment}
                            onChange={() => {}}
                            variant={CodeEditorVariant.DEFAULT}
                            header="fixed-height.js"
                            language="javascript"
                            height="200px"
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Min Height</h3>
                        <p className="text-sm text-gray-600">
                            The editor starts at 180px tall and grows as the
                            content expands.
                        </p>
                        <CodeEditor
                            value={codeExamples.react}
                            onChange={() => {}}
                            variant={CodeEditorVariant.DEFAULT}
                            header="auto-grow.jsx"
                            language="jsx"
                            minHeight="180px"
                        />
                    </div>
                </div>
            </div>

            {/* Language Examples */}
            <div className="space-y-6" id="language-examples">
                <h2 className="text-2xl font-bold">Language Support</h2>
                <p className="text-gray-600">
                    CodeEditor supports syntax highlighting for multiple
                    programming languages
                </p>

                <div className="grid grid-cols-1 gap-6">
                    {/* JavaScript */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">JavaScript</h3>
                        <CodeEditor
                            value={codeExamples.payment}
                            onChange={() => {}}
                            header="payment.js"
                            language="javascript"
                        />
                    </div>

                    {/* TypeScript */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">TypeScript</h3>
                        <CodeEditor
                            value={codeExamples.typescript}
                            onChange={() => {}}
                            header="types.ts"
                            language="typescript"
                        />
                    </div>

                    {/* JSON */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">JSON</h3>
                        <CodeEditor
                            value={codeExamples.json}
                            onChange={() => {}}
                            header="config.json"
                            language="json"
                        />
                    </div>

                    {/* Python */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Python</h3>
                        <CodeEditor
                            value={codeExamples.python}
                            onChange={() => {}}
                            header="process.py"
                            language="python"
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-6" id="features">
                <h2 className="text-2xl font-bold">Features</h2>
                <p className="text-gray-600">
                    Key features of the CodeEditor component
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">
                            Real-time Syntax Highlighting
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Syntax highlighting updates as you type, supporting
                            multiple languages including JavaScript, TypeScript,
                            Python, JSON, and more.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">
                            Line Numbers
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Optional line numbers for easy code navigation and
                            reference. Can be toggled on/off via props.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">
                            Copy to Clipboard
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Built-in copy button in the header to quickly copy
                            code to clipboard with visual feedback.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">
                            Customizable Header
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Customizable header with file name, icons, and
                            custom slots for additional controls or information.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">
                            Read Only & Disabled States
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Support for read-only and disabled states for
                            displaying code without allowing edits.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">
                            Monaco Editor Powered
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Built with Monaco Editor - the same editor used in
                            VS Code - for a professional editing experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Code Editor Modal */}
            <Modal
                isOpen={isCodeEditorModalOpen}
                onClose={() => setIsCodeEditorModalOpen(false)}
                title="CodeEditor Example"
                subtitle="Edit code with syntax highlighting in a modal"
                showCloseButton={true}
                closeOnBackdropClick={true}
                minWidth="800px"
            >
                <CodeEditor
                    value={codeExamples.payment}
                    onChange={() => {}}
                    variant={CodeEditorVariant.DEFAULT}
                    showLineNumbers={true}
                    showHeader={true}
                    header="payment.js"
                    language="javascript"
                    minHeight="400px"
                />
            </Modal>
        </div>
    )
}

export default CodeEditorDemo

import { useState } from 'react'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import {
    CodeBlock,
    CodeBlockVariant,
    DiffLineType,
} from '../../../../packages/blend/lib/components/CodeBlock'
import {
    Tag,
    TagColor,
    TagSize,
    TagVariant,
    TagShape,
} from '../../../../packages/blend/lib/components/Tags'
import { Modal } from '../../../../packages/blend/lib/components/Modal'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'

const CodeBlockDemo = () => {
    // State for controls
    const [variant, setVariant] = useState<CodeBlockVariant>(
        CodeBlockVariant.DEFAULT
    )
    const [showLineNumbers, setShowLineNumbers] = useState(true)
    const [showHeader, setShowHeader] = useState(true)
    const [headerText, setHeaderText] = useState('payment.js')

    // Modal state
    const [isCodeBlockModalOpen, setIsCodeBlockModalOpen] = useState(false)
    const [isCodeDiffModalOpen, setIsCodeDiffModalOpen] = useState(false)

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
        algorithm: `function quickSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  // Partition the array
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Recursively sort and combine
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
        api: `class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    };
  }

  async get(endpoint) {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }
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

    # Calculate totals
    totals = {
        curr: sum(t['amount'] for t in txns)
        for curr, txns in by_currency.items()
    }

    return totals`,
        rust: `// Rust Example - Pattern Matching
use std::collections::HashMap;

#[derive(Debug)]
enum PaymentStatus {
    Pending,
    Processing,
    Completed(String),
    Failed { reason: String, retry: bool },
}

struct Transaction {
    id: u64,
    amount: f64,
    status: PaymentStatus,
}

impl Transaction {
    fn new(id: u64, amount: f64) -> Self {
        Self {
            id,
            amount,
            status: PaymentStatus::Pending,
        }
    }

    fn process(&mut self) -> Result<(), String> {
        match &self.status {
            PaymentStatus::Pending => {
                self.status = PaymentStatus::Processing;
                Ok(())
            }
            _ => Err("Cannot process".to_string()),
        }
    }
}`,
        haskell: `-- Haskell Example - Algebraic Data Types
module Payment where

import Data.Maybe (fromMaybe)
import qualified Data.Map as Map

data Currency = USD | EUR | GBP | INR
  deriving (Show, Eq, Ord)

data Transaction = Transaction
  { txnId :: Int
  , amount :: Double
  , currency :: Currency
  , status :: Status
  } deriving (Show)

data Status = Pending | Completed | Failed String
  deriving (Show)

type Wallet = Map.Map Currency Double

updateWallet :: Transaction -> Wallet -> Wallet
updateWallet (Transaction _ amt curr Completed) wallet =
  Map.insertWith (+) curr amt wallet
updateWallet _ wallet = wallet

fibonacci :: Int -> Int
fibonacci n
  | n <= 1    = n
  | otherwise = fibonacci (n - 1) + fibonacci (n - 2)`,
    }

    const [customCode, setCustomCode] = useState(codeExamples.payment)

    // Options for selects
    const variantOptions = [
        {
            value: CodeBlockVariant.DEFAULT,
            label: 'Default (with line numbers)',
        },
        { value: CodeBlockVariant.NO_GUTTER, label: 'No Gutter' },
        { value: CodeBlockVariant.DIFF, label: 'Diff (side-by-side)' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-3xl font-bold">
                            CodeBlock Component Demo
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Display code snippets with syntax highlighting and
                            copy functionality
                        </p>
                    </div>
                </div>
            </div>

            {/* Token Types Reference */}
            <div className="flex flex-col gap-5" id="token-types">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Syntax Token Types</h2>
                    <p className="text-gray-600">
                        The syntax highlighter recognizes the following token
                        types across all languages
                    </p>
                </div>

                <div className="bg-white p-2 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4 ">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#9810FA' }}
                            ></div>
                            <span className="font-mono text-sm">Keywords</span>
                            <span className="text-gray-500 text-xs">
                                (language-specific: if, def, fn, data, etc.)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#0561E2' }}
                            ></div>
                            <span className="font-mono text-sm">Functions</span>
                            <span className="text-gray-500 text-xs">
                                (function names)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#00C951' }}
                            ></div>
                            <span className="font-mono text-sm">Strings</span>
                            <span className="text-gray-500 text-xs">
                                ("text", 'text', `template`)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#FF6900' }}
                            ></div>
                            <span className="font-mono text-sm">Numbers</span>
                            <span className="text-gray-500 text-xs">
                                (123, 45.67)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#525866' }}
                            ></div>
                            <span className="font-mono text-sm">Operators</span>
                            <span className="text-gray-500 text-xs">
                                (+, -, =, *, etc.)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#222530' }}
                            ></div>
                            <span className="font-mono text-sm">Variables</span>
                            <span className="text-gray-500 text-xs">
                                (variable names)
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: '#99A0AE' }}
                            ></div>
                            <span className="font-mono text-sm">Comments</span>
                            <span className="text-gray-500 text-xs">
                                (// /*, #, --)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Examples */}
            <div className="space-y-6" id="modal-examples">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Modal Examples</h2>
                    <p className="text-gray-600">
                        CodeBlock components can be displayed inside modals for
                        focused code viewing
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button
                        text="View Code Block in Modal"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => setIsCodeBlockModalOpen(true)}
                    />
                    <Button
                        text="View Code Diff in Modal"
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => setIsCodeDiffModalOpen(true)}
                    />
                </div>
            </div>

            {/* Interactive Playground */}
            <div className="space-y-6" id="playground">
                <h2 className="text-2xl font-bold">Interactive Playground</h2>
                <p className="text-gray-600">
                    Customize the code block appearance and test different code
                    examples
                </p>

                {/* Controls */}
                <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={variant}
                            onSelect={(value) =>
                                setVariant(value as CodeBlockVariant)
                            }
                            placeholder="Select variant"
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
                    </div>

                    {variant !== CodeBlockVariant.DIFF && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Custom Code (edit to test)
                            </label>
                            <textarea
                                value={customCode}
                                onChange={(e) => setCustomCode(e.target.value)}
                                className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                                placeholder="Enter your code here..."
                            />
                        </div>
                    )}
                </div>

                {/* Live Preview */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <CodeBlock
                        code={
                            variant === CodeBlockVariant.DIFF ? '' : customCode
                        }
                        variant={variant}
                        showLineNumbers={showLineNumbers}
                        showHeader={showHeader}
                        header={headerText}
                        diffLines={
                            variant === CodeBlockVariant.DIFF
                                ? [
                                      {
                                          content:
                                              'function getPaymentPriority(order) {',
                                          type: DiffLineType.UNCHANGED,
                                      },
                                      {
                                          content: '  const priorities = [];',
                                          type: DiffLineType.UNCHANGED,
                                      },
                                      {
                                          content:
                                              "  if (order.udf3 === 'insurance' && order.udf4 === 'health' && order.paymentMethod === 'UPI') {",
                                          type: DiffLineType.REMOVED,
                                      },
                                      {
                                          content:
                                              "  if (order.type === 'insurance' && order.category === 'health' && order.method === 'UPI') {",
                                          type: DiffLineType.ADDED,
                                      },
                                      {
                                          content:
                                              "    priorities.push('PAYU');",
                                          type: DiffLineType.UNCHANGED,
                                      },
                                      {
                                          content: '  }',
                                          type: DiffLineType.UNCHANGED,
                                      },
                                      {
                                          content:
                                              "  return priorities.length ? priorities : ['DEFAULT'];",
                                          type: DiffLineType.REMOVED,
                                      },
                                      {
                                          content:
                                              "  return priorities.length > 0 ? priorities : ['DEFAULT'];",
                                          type: DiffLineType.ADDED,
                                      },
                                      {
                                          content: '}',
                                          type: DiffLineType.UNCHANGED,
                                      },
                                  ]
                                : undefined
                        }
                    />
                </div>
            </div>

            {/* Variants Showcase */}
            <div className="space-y-6" id="variants">
                <h2 className="text-2xl font-bold">Variants</h2>
                <p className="text-gray-600">
                    Different variants of the CodeBlock component
                </p>

                <div className="space-y-8">
                    {/* Default Variant */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Default (with line numbers)
                        </h3>
                        <p className="text-sm text-gray-600">
                            Shows line numbers on the left gutter for easy
                            reference
                        </p>
                        <CodeBlock
                            code={codeExamples.payment}
                            variant={CodeBlockVariant.DEFAULT}
                            header="payment.js"
                        />
                    </div>

                    {/* No Gutter Variant */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">No Gutter</h3>
                        <p className="text-sm text-gray-600">
                            Clean code display without line numbers
                        </p>
                        <CodeBlock
                            code={codeExamples.payment}
                            variant={CodeBlockVariant.NO_GUTTER}
                            header="payment.js"
                        />
                    </div>

                    {/* Explicit Line Numbers Control */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            No Gutter with Line Numbers Override
                        </h3>
                        <p className="text-sm text-gray-600">
                            Using showLineNumbers prop to override variant
                            behavior
                        </p>
                        <CodeBlock
                            code={codeExamples.payment}
                            variant={CodeBlockVariant.NO_GUTTER}
                            showLineNumbers={true}
                            header="payment.js"
                        />
                    </div>

                    {/* Diff Variant */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Diff Variant</h3>
                        <p className="text-sm text-gray-600">
                            Show code changes with colored gutters for additions
                            (green) and deletions (red)
                        </p>
                        <CodeBlock
                            code=""
                            variant={CodeBlockVariant.DIFF}
                            header="Code Changes"
                            headerRightSlot={
                                <div style={{ display: 'flex' }}>
                                    <Tag
                                        text="+2"
                                        color={TagColor.SUCCESS}
                                        variant={TagVariant.SUBTLE}
                                        size={TagSize.XS}
                                        shape={TagShape.ROUNDED}
                                        splitTagPosition="left"
                                    />
                                    <Tag
                                        text="-2"
                                        color={TagColor.ERROR}
                                        variant={TagVariant.SUBTLE}
                                        size={TagSize.XS}
                                        shape={TagShape.ROUNDED}
                                        splitTagPosition="right"
                                    />
                                </div>
                            }
                            diffLines={[
                                {
                                    content:
                                        'function getPaymentPriority(order) {',
                                    type: DiffLineType.UNCHANGED,
                                },
                                {
                                    content: '  const priorities = [];',
                                    type: DiffLineType.UNCHANGED,
                                },
                                {
                                    content:
                                        "  if (order.udf3 === 'insurance' && order.udf4 === 'health' && order.paymentMethod === 'UPI') {",
                                    type: DiffLineType.REMOVED,
                                },
                                {
                                    content:
                                        "  if (order.type === 'insurance' && order.category === 'health' && order.method === 'UPI') {",
                                    type: DiffLineType.ADDED,
                                },
                                {
                                    content: "    priorities.push('PAYU');",
                                    type: DiffLineType.UNCHANGED,
                                },
                                {
                                    content: '  }',
                                    type: DiffLineType.UNCHANGED,
                                },
                                {
                                    content:
                                        "  return priorities.length ? priorities : ['DEFAULT'];",
                                    type: DiffLineType.REMOVED,
                                },
                                {
                                    content:
                                        "  return priorities.length > 0 ? priorities : ['DEFAULT'];",
                                    type: DiffLineType.ADDED,
                                },
                                { content: '}', type: DiffLineType.UNCHANGED },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Syntax Highlighting Examples */}
            <div className="space-y-6" id="syntax-highlighting">
                <h2 className="text-2xl font-bold">Syntax Highlighting</h2>
                <p className="text-gray-600">
                    The CodeBlock component supports syntax highlighting for
                    various token types
                </p>

                <div className="grid grid-cols-1 gap-6">
                    {/* React Component */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            React Component
                        </h3>
                        <CodeBlock
                            code={codeExamples.react}
                            header="UserProfile.jsx"
                        />
                    </div>

                    {/* TypeScript Interface */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            TypeScript Interface
                        </h3>
                        <CodeBlock
                            code={codeExamples.typescript}
                            header="types.ts"
                        />
                    </div>

                    {/* Algorithm */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Algorithm (Quick Sort)
                        </h3>
                        <CodeBlock
                            code={codeExamples.algorithm}
                            header="quickSort.js"
                        />
                    </div>

                    {/* API Client */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            API Client Class
                        </h3>
                        <CodeBlock
                            code={codeExamples.api}
                            header="ApiClient.js"
                        />
                    </div>
                </div>
            </div>

            {/* Auto-Formatting Feature */}
            <div className="space-y-6" id="auto-formatting">
                <h2 className="text-2xl font-bold">
                    Auto-Formatting (NEW! 🎉)
                </h2>
                <p className="text-gray-600">
                    CodeBlock now supports automatic code formatting with the{' '}
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                        autoFormat
                    </code>{' '}
                    prop
                </p>

                <div className="grid grid-cols-1 gap-6">
                    {/* JSON Formatting */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            JSON Auto-Formatting
                        </h3>
                        <p className="text-sm text-gray-600">
                            Unformatted JSON is automatically formatted with
                            proper indentation
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Without autoFormat
                                </span>
                                <CodeBlock
                                    code={`{"name":"John Doe","age":30,"email":"john@example.com","address":{"city":"New York","zip":"10001"},"active":true}`}
                                    header="unformatted.json"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-green-600 uppercase">
                                    With autoFormat
                                </span>
                                <CodeBlock
                                    code={`{"name":"John Doe","age":30,"email":"john@example.com","address":{"city":"New York","zip":"10001"},"active":true}`}
                                    autoFormat={true}
                                    language="json"
                                    header="formatted.json"
                                />
                            </div>
                        </div>
                    </div>

                    {/* JavaScript Formatting */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            JavaScript Auto-Formatting
                        </h3>
                        <p className="text-sm text-gray-600">
                            Unformatted JavaScript code is automatically
                            indented
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Without autoFormat
                                </span>
                                <CodeBlock
                                    code={`function processPayment(data){const amount=data.amount;if(amount>0){console.log('Processing payment');return{success:true,amount};}return{success:false};}`}
                                    header="messy.js"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-green-600 uppercase">
                                    With autoFormat
                                </span>
                                <CodeBlock
                                    code={`function processPayment(data){const amount=data.amount;if(amount>0){console.log('Processing payment');return{success:true,amount};}return{success:false};}`}
                                    autoFormat={true}
                                    language="javascript"
                                    header="formatted.js"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CSS Formatting */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            CSS Auto-Formatting
                        </h3>
                        <p className="text-sm text-gray-600">
                            Unformatted CSS is automatically structured with
                            proper indentation
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Without autoFormat
                                </span>
                                <CodeBlock
                                    code={`.button{background:#007bff;color:white;padding:10px 20px;border-radius:5px;}.button:hover{background:#0056b3;}`}
                                    header="styles.css"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-green-600 uppercase">
                                    With autoFormat
                                </span>
                                <CodeBlock
                                    code={`.button{background:#007bff;color:white;padding:10px 20px;border-radius:5px;}.button:hover{background:#0056b3;}`}
                                    autoFormat={true}
                                    language="css"
                                    header="formatted.css"
                                />
                            </div>
                        </div>
                    </div>

                    {/* HTML Formatting */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            HTML Auto-Formatting
                        </h3>
                        <p className="text-sm text-gray-600">
                            Unformatted HTML is automatically indented with
                            proper nesting
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Without autoFormat
                                </span>
                                <CodeBlock
                                    code={`<div><header><h1>Welcome</h1></header><main><p>This is content</p></main><footer><p>Footer text</p></footer></div>`}
                                    header="index.html"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-semibold text-green-600 uppercase">
                                    With autoFormat
                                </span>
                                <CodeBlock
                                    code={`<div><header><h1>Welcome</h1></header><main><p>This is content</p></main><footer><p>Footer text</p></footer></div>`}
                                    autoFormat={true}
                                    language="html"
                                    header="formatted.html"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Multi-Language Support */}
            <div className="space-y-6" id="multi-language">
                <h2 className="text-2xl font-bold">Multi-Language Support</h2>
                <p className="text-gray-600">
                    CodeBlock supports syntax highlighting for multiple
                    programming languages including Python, Rust, and Haskell
                </p>

                <div className="grid grid-cols-1 gap-6">
                    {/* Python */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Python</h3>
                        <p className="text-sm text-gray-600">
                            Supports Python syntax: def, lambda, yield, for/in,
                            list comprehensions, # comments
                        </p>
                        <CodeBlock
                            code={codeExamples.python}
                            header="process_transactions.py"
                        />
                    </div>

                    {/* Rust */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Rust</h3>
                        <p className="text-sm text-gray-600">
                            Supports Rust syntax: fn, impl, struct, enum, match,
                            Result, Option, // comments
                        </p>
                        <CodeBlock
                            code={codeExamples.rust}
                            header="transaction.rs"
                        />
                    </div>

                    {/* Haskell */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Haskell</h3>
                        <p className="text-sm text-gray-600">
                            Supports Haskell syntax: data, type, module,
                            deriving, where, guards (|), -- comments
                        </p>
                        <CodeBlock
                            code={codeExamples.haskell}
                            header="Payment.hs"
                        />
                    </div>
                </div>
            </div>

            {/* Code Block Modal */}
            <Modal
                isOpen={isCodeBlockModalOpen}
                onClose={() => setIsCodeBlockModalOpen(false)}
                title="Code Block Example"
                subtitle="Default variant with syntax highlighting"
                showCloseButton={true}
                closeOnBackdropClick={true}
                minWidth="800px"
            >
                <CodeBlock
                    code={codeExamples.payment}
                    variant={CodeBlockVariant.DEFAULT}
                    showLineNumbers={true}
                    showHeader={true}
                    header="payment.js"
                />
            </Modal>

            {/* Code Diff Modal */}
            <Modal
                isOpen={isCodeDiffModalOpen}
                onClose={() => setIsCodeDiffModalOpen(false)}
                title="Code Diff Example"
                subtitle="Side-by-side diff comparison"
                showCloseButton={true}
                closeOnBackdropClick={true}
                minWidth="600px"
                headerRightSlot={
                    <div style={{ display: 'flex' }}>
                        <Tag
                            text="+2"
                            color={TagColor.SUCCESS}
                            variant={TagVariant.SUBTLE}
                            size={TagSize.XS}
                            shape={TagShape.ROUNDED}
                            splitTagPosition="left"
                        />
                        <Tag
                            text="-2"
                            color={TagColor.ERROR}
                            variant={TagVariant.SUBTLE}
                            size={TagSize.XS}
                            shape={TagShape.ROUNDED}
                            splitTagPosition="right"
                        />
                    </div>
                }
            >
                <CodeBlock
                    code=""
                    variant={CodeBlockVariant.DIFF}
                    showLineNumbers={true}
                    showHeader={true}
                    header="Code Changes"
                    diffLines={[
                        {
                            content: 'function getPaymentPriority(order) {',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content: '  const priorities = [];',
                            type: DiffLineType.UNCHANGED,
                        },
                        {
                            content:
                                "  if (order.udf3 === 'insurance' && order.udf4 === 'health' && order.paymentMethod === 'UPI') {",
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content:
                                "  if (order.type === 'insurance' && order.category === 'health' && order.method === 'UPI') {",
                            type: DiffLineType.ADDED,
                        },
                        {
                            content: "    priorities.push('PAYU');",
                            type: DiffLineType.UNCHANGED,
                        },
                        { content: '  }', type: DiffLineType.UNCHANGED },
                        {
                            content:
                                "  return priorities.length ? priorities : ['DEFAULT'];",
                            type: DiffLineType.REMOVED,
                        },
                        {
                            content:
                                "  return priorities.length > 0 ? priorities : ['DEFAULT'];",
                            type: DiffLineType.ADDED,
                        },
                        { content: '}', type: DiffLineType.UNCHANGED },
                    ]}
                />
            </Modal>
        </div>
    )
}

export default CodeBlockDemo

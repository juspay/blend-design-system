import { useState } from 'react'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { TextInputSize } from '../../../../packages/blend/lib/components/Inputs/TextInput/types'
import { Lock, User } from 'lucide-react'

/**
 * Test page specifically for testing Chrome autofill behavior
 * with floating labels on mobile screens
 */
const TextInputAutofillTest = () => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert('Form submitted! Chrome should now save these credentials.')
        console.log('Form data:', { password, username })
    }

    return (
        <div className="p-8 space-y-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">
                    Autofill Detection Test
                </h1>
                <p className="text-gray-600 mb-8">
                    This page helps you test Chrome autofill detection with
                    floating labels.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <h3 className="font-semibold mb-2">
                        📱 Testing Instructions:
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>
                            <strong>First time:</strong> Fill out the form below
                            and click "Save Credentials" to let Chrome save them
                        </li>
                        <li>
                            <strong>Desktop:</strong> Open DevTools (F12) →
                            Toggle device toolbar (Ctrl+Shift+M) → Select
                            "iPhone SE" or similar
                        </li>
                        <li>
                            <strong>Test:</strong> Refresh the page and observe:
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Chrome should autofill the saved values</li>
                                <li>
                                    Labels should float to the top (NOT overlap
                                    with text)
                                </li>
                                <li>No flickering or delay</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Alternative:</strong> Click into an input
                            and select a saved credential from Chrome's dropdown
                        </li>
                    </ol>
                </div>

                {/* Test Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-lg border p-6 space-y-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Login Form
                        </h2>
                        {/* <TextField
                            type="password"
                            autoComplete="current-password"
                            label="Password"
                            variant="filled"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            type="text"
                            autoComplete="username"
                            label="Username"
                            variant="filled"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /> */}

                        {/* Password Input with toggle */}
                        <TextInput
                            type="password"
                            name="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            size={TextInputSize.LARGE}
                            leftSlot={<Lock size={18} />}
                            passwordToggle={true}
                            autoComplete="current-password"
                            required
                            hintText="Test password autofill with toggle"
                        />

                        {/* Username - Another common autofill field */}
                        <TextInput
                            type="email"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            size={TextInputSize.LARGE}
                            leftSlot={<User size={18} />}
                            autoComplete="username"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Save Credentials (Submit Form)
                        </button>
                    </div>
                </form>

                {/* Visual Indicator */}
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold mb-2">Current Values:</h3>
                    <pre className="text-xs bg-white p-3 rounded overflow-auto">
                        {JSON.stringify(
                            {
                                password: password ? '***' : '',
                                username,
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>

                {/* Edge Cases to Test */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                        🧪 Edge Cases to Test:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Refresh page immediately after form is shown</li>
                        <li>Navigate away and back to this page</li>
                        <li>Test with multiple Chrome profiles</li>
                        <li>Test clearing the input after autofill</li>
                        <li>Test typing into autofilled input</li>
                        <li>
                            Test on actual mobile device (not just DevTools)
                        </li>
                        <li>Test with Chrome extensions disabled</li>
                    </ul>
                </div>

                {/* Debug Info */}
                <div className="mt-8 text-xs text-gray-500">
                    <p>
                        💡 <strong>Tip:</strong> Open browser console to see
                        debug logs from the autofill detection
                    </p>
                    <p className="mt-2">
                        🔧 <strong>Component:</strong> TextInput with autofill
                        detection using CSS animations and :-webkit-autofill
                        detection
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TextInputAutofillTest

'use client'

import { useState, useEffect } from 'react'
import { auth, database } from '@/lib/firebase'
import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { ref, push, set, onValue, off } from 'firebase/database'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [textInput, setTextInput] = useState('')
  const [savedMessages, setSavedMessages] = useState<Array<{id: string, text: string, timestamp: number, userId: string, userName?: string}>>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        loadMessages()
      } else {
        setSavedMessages([])
      }
    })
    return () => unsubscribe()
  }, [])

  const loadMessages = () => {
    const messagesRef = ref(database, 'messages')
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        setSavedMessages(messagesArray.sort((a, b) => b.timestamp - a.timestamp))
      } else {
        setSavedMessages([])
      }
    })

    return () => off(messagesRef)
  }

  const saveMessage = async () => {
    if (!textInput.trim() || !user) return

    setSaving(true)
    try {
      const messagesRef = ref(database, 'messages')
      const newMessageRef = push(messagesRef)
      
      await set(newMessageRef, {
        text: textInput.trim(),
        timestamp: Date.now(),
        userId: user.uid,
        userName: user.displayName || user.email
      })

      setTextInput('')
      setMessage('Message saved successfully!')
    } catch (error: any) {
      setMessage(`Error saving message: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setMessage('')
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setMessage('Signed in successfully!')
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setMessage('Signed out successfully!')
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    }
  }

  const testBackend = async () => {
    try {
      const token = await auth.currentUser?.getIdToken()
      if (!token) {
        setMessage('No authentication token available')
        return
      }

      const response = await fetch('https://fractal-567047894553.asia-south1.run.app/ping', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      })
      if (!response.ok) {
        const errorText = await response.text()
        setMessage(`Backend error (${response.status}): ${errorText}`)
        return
      }
      const data = await response.json()
      setMessage(`Backend response: ${data.message}`)
    } catch (error: any) {
      setMessage(`Backend error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {user.displayName || user.email}
              </h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && saveMessage()}
                  />
                  <button
                    onClick={saveMessage}
                    disabled={saving || !textInput.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

              <button
                onClick={testBackend}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Test Backend
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>

            {savedMessages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Saved Messages</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {savedMessages.map((msg) => (
                    <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-800 text-sm">{msg.text}</p>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        by {msg.userName || 'Unknown'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {message && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">{message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>

            {message && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 
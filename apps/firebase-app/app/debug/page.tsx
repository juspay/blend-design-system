'use client'

export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-2">
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_API_KEY:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 
              `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 10)}...` : 
              'NOT SET'
            }
          </span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'NOT SET'}
          </span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_PROJECT_ID:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT SET'}
          </span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'NOT SET'}
          </span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'NOT SET'}
          </span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_APP_ID:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'NOT SET'}
          </span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_FIREBASE_DATABASE_URL:</strong> 
          <span className="ml-2">
            {process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'NOT SET'}
          </span>
        </div>
      </div>
    </div>
  )
} 
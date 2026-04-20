// Script to extract Firebase private key from .env.local
// Run this to get the private key for creating the GCP secret

const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '.env.local')

try {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const match = envContent.match(/FIREBASE_PRIVATE_KEY=(.*?)(?:\r?\n|$)/)

    if (match && match[1]) {
        // Remove quotes and unescape newlines
        let privateKey = match[1]
        if (privateKey.startsWith('"') || privateKey.startsWith("'")) {
            privateKey = privateKey.slice(1, -1)
        }
        privateKey = privateKey.replace(/\\n/g, '\n')

        console.log('Firebase Private Key extracted successfully!')
        console.log('Copy the following key (including BEGIN and END lines):')
        console.log('================================================')
        console.log(privateKey)
        console.log('================================================')
        console.log('\nNow run:')
        console.log(
            'echo -n "PASTE_KEY_HERE" | gcloud secrets create blend-monitor-firebase-key --data-file=-'
        )
    } else {
        console.error('Could not find FIREBASE_PRIVATE_KEY in .env.local')
    }
} catch (error) {
    console.error('Error reading .env.local:', error.message)
    console.log(
        'Make sure you have a .env.local file with FIREBASE_PRIVATE_KEY set'
    )
}

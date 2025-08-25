#!/usr/bin/env node

/**
 * Script to clear NPM cache and refresh data for package change
 * Usage: node scripts/clear-npm-cache.js
 */

const fetch = require('node-fetch')

async function clearNPMCache() {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3003'

    try {
        console.log('🧹 Clearing NPM cache...')

        const response = await fetch(`${baseUrl}/api/npm/clear-cache`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data = await response.json()
            console.log('✅ NPM cache cleared successfully!')
            console.log('📊 Refresh data:', data.refreshData)
            console.log('🕒 Timestamp:', data.timestamp)
        } else {
            const error = await response.json()
            console.error('❌ Failed to clear cache:', error.error)
            console.error('Details:', error.details)
        }
    } catch (error) {
        console.error('❌ Error:', error.message)
        console.log('💡 Make sure the server is running on', baseUrl)
    }
}

clearNPMCache()

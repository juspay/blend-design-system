import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        message: 'API routing is working!',
        timestamp: new Date().toISOString(),
    })
}

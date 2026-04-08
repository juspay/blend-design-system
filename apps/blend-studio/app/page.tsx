// Re-export from frontend
export { default } from '@/frontend/app/page'

// Force dynamic rendering to avoid SSR issues with Charts
export const dynamic = 'force-dynamic'

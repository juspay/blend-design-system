import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            'localhost',
            '127.0.0.1',
            '4fc27add9b2c.ngrok-free.app',
            '.ngrok-free.app', // Allow any ngrok subdomain
        ],
    },
})

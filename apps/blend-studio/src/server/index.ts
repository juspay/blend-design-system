import { createApp } from './create-app'

const PORT = Number(process.env.STUDIO_API_PORT) || 3001
const app = createApp()

app.listen(PORT, () => {
    console.log(`[blend-studio-api] Express http://localhost:${PORT}`)
    console.log(`  health: GET /api/health`)
    console.log(`  studio: /api/studio/branches/...`)
    console.log(`  users:  /api/users`)
    console.log(`  npm:    /api/npm`)
})

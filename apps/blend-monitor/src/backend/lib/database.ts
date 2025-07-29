import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'

// Database connection configuration
const dbConfig = {
    host:
        process.env.NODE_ENV === 'production' &&
        process.env.INSTANCE_CONNECTION_NAME
            ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
            : process.env.DATABASE_HOST || 'localhost',
    port:
        process.env.NODE_ENV === 'production' &&
        process.env.INSTANCE_CONNECTION_NAME
            ? undefined
            : parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME || 'blend_monitor',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    ssl:
        process.env.NODE_ENV === 'production'
            ? false // Cloud SQL uses Unix socket, no SSL needed
            : process.env.DATABASE_HOST
              ? { rejectUnauthorized: false }
              : false,
    max: 10, // Reduced from 20 to 10 for better connection management
    idleTimeoutMillis: 10000, // Reduced from 30000 to 10000
    connectionTimeoutMillis: 5000, // Increased from 2000 to 5000
    acquireTimeoutMillis: 10000, // Added acquire timeout
    createTimeoutMillis: 10000, // Added create timeout
    destroyTimeoutMillis: 5000, // Added destroy timeout
    reapIntervalMillis: 1000, // Added reap interval
    createRetryIntervalMillis: 200, // Added retry interval
}

// Global connection pool
let pool: Pool | null = null

export function getPool(): Pool {
    if (!pool) {
        pool = new Pool(dbConfig)

        // Handle pool errors
        pool.on('error', (err: Error) => {
            console.error('Unexpected error on idle client', err)
        })

        // Handle pool connection events for debugging
        if (process.env.NODE_ENV === 'development') {
            pool.on('connect', () => {
                console.log('Database client connected')
            })

            pool.on('remove', () => {
                console.log('Database client removed')
            })
        }
    }
    return pool
}

// Query helper with automatic connection management
export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
): Promise<QueryResult<T>> {
    const pool = getPool()
    const start = Date.now()

    try {
        const result = await pool.query<T>(text, params)
        const duration = Date.now() - start

        if (process.env.NODE_ENV === 'development') {
            console.log('Executed query', {
                text,
                duration,
                rows: result.rowCount,
            })
        }

        return result
    } catch (error) {
        console.error('Database query error:', { text, params, error })
        throw error
    }
}

// Transaction helper
export async function withTransaction<T>(
    callback: (client: PoolClient) => Promise<T>
): Promise<T> {
    const pool = getPool()
    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        const result = await callback(client)
        await client.query('COMMIT')
        return result
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
}

// Database health check
export async function checkDatabaseHealth(): Promise<{
    healthy: boolean
    latency?: number
    error?: string
}> {
    try {
        const start = Date.now()
        await query('SELECT 1')
        const latency = Date.now() - start

        return { healthy: true, latency }
    } catch (error) {
        return {
            healthy: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

// Clean shutdown
export async function closeDatabasePool(): Promise<void> {
    if (pool) {
        await pool.end()
        pool = null
        console.log('Database pool closed')
    }
}

// Initialize database (run migrations, check connection)
export async function initializeDatabase(): Promise<void> {
    try {
        const health = await checkDatabaseHealth()
        if (!health.healthy) {
            throw new Error(`Database connection failed: ${health.error}`)
        }

        console.log(
            `Database connected successfully (latency: ${health.latency}ms)`
        )

        // Create tables if they don't exist
        await createTablesIfNotExists()
    } catch (error) {
        console.error('Failed to initialize database:', error)
        throw error
    }
}

// Create essential tables if they don't exist
async function createTablesIfNotExists(): Promise<void> {
    const client = getPool()

    try {
        // Enable UUID extension
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        // Create npm_versions table
        await client.query(`
            CREATE TABLE IF NOT EXISTS npm_versions (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                version VARCHAR(50) UNIQUE NOT NULL,
                published_at TIMESTAMP WITH TIME ZONE NOT NULL,
                publisher VARCHAR(255),
                downloads INTEGER NOT NULL DEFAULT 0,
                changelog TEXT,
                size_unpacked INTEGER,
                size_gzipped INTEGER,
                is_breaking BOOLEAN NOT NULL DEFAULT false,
                is_prerelease BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            )
        `)

        // Create download_trends table
        await client.query(`
            CREATE TABLE IF NOT EXISTS download_trends (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                date DATE NOT NULL,
                downloads INTEGER NOT NULL DEFAULT 0,
                package_name VARCHAR(255) NOT NULL DEFAULT 'blend-v1',
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                UNIQUE(date, package_name)
            )
        `)

        // Create npm_package_stats table
        await client.query(`
            CREATE TABLE IF NOT EXISTS npm_package_stats (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                package_name VARCHAR(255) NOT NULL,
                version VARCHAR(50) NOT NULL,
                downloads_daily INTEGER NOT NULL DEFAULT 0,
                downloads_weekly INTEGER NOT NULL DEFAULT 0,
                downloads_monthly INTEGER NOT NULL DEFAULT 0,
                downloads_total INTEGER NOT NULL DEFAULT 0,
                size_unpacked INTEGER NOT NULL DEFAULT 0,
                size_gzipped INTEGER NOT NULL DEFAULT 0,
                dependencies_count INTEGER NOT NULL DEFAULT 0,
                last_publish TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            )
        `)

        // Create users table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                firebase_uid VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                display_name VARCHAR(255),
                photo_url TEXT,
                role VARCHAR(50) NOT NULL DEFAULT 'viewer',
                is_active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                last_login TIMESTAMP WITH TIME ZONE,
                updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            )
        `)

        // Create activity_logs table
        await client.query(`
            CREATE TABLE IF NOT EXISTS activity_logs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                action VARCHAR(255) NOT NULL,
                details JSONB,
                metadata JSONB,
                timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            )
        `)

        // Create system_activity table
        await client.query(`
            CREATE TABLE IF NOT EXISTS system_activity (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                action VARCHAR(255) NOT NULL,
                details JSONB,
                timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            )
        `)

        console.log('Database tables created/verified successfully')
    } catch (error) {
        console.error('Error creating database tables:', error)
        throw error
    }
}

// Types for better TypeScript support
export interface DatabaseUser {
    id: string
    firebase_uid: string
    email: string
    display_name?: string
    photo_url?: string
    role: string
    is_active: boolean
    created_at: Date
    last_login?: Date
    updated_at: Date
}

export interface DatabaseComponent {
    id: string
    component_id: string
    name: string
    path: string
    category: string
    has_storybook: boolean
    has_figma_connect: boolean
    has_tests: boolean
    last_modified?: Date
    created_at: Date
    updated_at: Date
}

export interface DatabaseActivityLog {
    id: string
    user_id?: string
    action: string
    details?: Record<string, unknown>
    metadata?: Record<string, unknown>
    timestamp: Date
    created_at: Date
}

// SQL query builders for common operations
export const SQL = {
    // User queries
    users: {
        findByFirebaseUid: 'SELECT * FROM users WHERE firebase_uid = $1',
        findByEmail: 'SELECT * FROM users WHERE email = $1',
        create: `
            INSERT INTO users (firebase_uid, email, display_name, photo_url, role, last_login)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `,
        update: `
            UPDATE users 
            SET display_name = $2, photo_url = $3, last_login = $4, updated_at = NOW()
            WHERE firebase_uid = $1
            RETURNING *
        `,
        updateRole: `
            UPDATE users SET role = $2, updated_at = NOW() 
            WHERE id = $1 
            RETURNING *
        `,
        list: 'SELECT * FROM users ORDER BY created_at DESC',
    },

    // Component queries
    components: {
        list: 'SELECT * FROM components ORDER BY name',
        findById: 'SELECT * FROM components WHERE component_id = $1',
        upsert: `
            INSERT INTO components (component_id, name, path, category, has_storybook, has_figma_connect, has_tests, last_modified)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (component_id) 
            DO UPDATE SET 
                name = EXCLUDED.name,
                path = EXCLUDED.path,
                category = EXCLUDED.category,
                has_storybook = EXCLUDED.has_storybook,
                has_figma_connect = EXCLUDED.has_figma_connect,
                has_tests = EXCLUDED.has_tests,
                last_modified = EXCLUDED.last_modified,
                updated_at = NOW()
            RETURNING *
        `,
        coverage: `
            SELECT 
                COUNT(*) as total_components,
                COUNT(*) FILTER (WHERE has_figma_connect = true) as integrated_components,
                ROUND(
                    (COUNT(*) FILTER (WHERE has_figma_connect = true) * 100.0 / COUNT(*)), 2
                ) as percentage
            FROM components
        `,
        coverageByCategory: `
            SELECT 
                category,
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE has_figma_connect = true) as integrated
            FROM components
            GROUP BY category
        `,
    },

    // Activity queries
    activity: {
        log: `
            INSERT INTO activity_logs (user_id, action, details, metadata, timestamp)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `,
        getUserActivity: `
            SELECT * FROM activity_logs 
            WHERE user_id = $1 
            ORDER BY timestamp DESC 
            LIMIT $2
        `,
        getRecentActivity: `
            SELECT al.*, u.display_name, u.email 
            FROM activity_logs al
            LEFT JOIN users u ON al.user_id = u.id
            ORDER BY al.timestamp DESC 
            LIMIT $1
        `,
        systemLog: `
            INSERT INTO system_activity (action, details, timestamp)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
    },
}

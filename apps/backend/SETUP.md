# Blend Studio Backend - Complete Setup Guide

## Prerequisites

- Node.js 18+ (20 recommended)
- PostgreSQL 16
- Google Cloud account with Firebase project
- pnpm package manager

---

## Step 1: Database Setup (PostgreSQL)

### Local Development

```bash
# Install PostgreSQL (macOS)
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb blend_studio

# Grant permissions to your user
psql -d blend_studio -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $(whoami);"
```

### Configure Database Connection

Edit `/Users/vinit.khandal/Desktop/blend-design-system/apps/backend/.env`:

```env
DATABASE_URL=postgresql://$(whoami)@localhost:5432/blend_studio
```

### Run Database Setup

```bash
cd /Users/vinit.khandal/Desktop/blend-design-system/apps/backend

# Install dependencies
pnpm install

# Generate Prisma client
npx prisma generate

# Verify database connection
psql blend_studio -c "\dt"
```

---

## Step 2: Google OAuth Setup

### Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `storybook-452807`
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Name: `Blend Studio Backend`
7. **Authorized redirect URIs**:
    - `http://localhost:3001/api/auth/google/callback`
    - `http://localhost:3001/auth/google/callback`
8. Click **Create**
9. Copy **Client ID** and **Client Secret**

### Configure OAuth Consent Screen

1. Go to **OAuth consent screen** (left sidebar)
2. Publishing Status: **Testing** (for development)
3. **Test users**: Add your Google email address
4. Save changes

---

## Step 3: Firebase Setup

### Create Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `storybook-452807`
3. Click gear icon ⚙️ → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file

### Extract Credentials

Open the downloaded JSON file and extract these values:

```json
{
    "project_id": "storybook-452807",
    "client_email": "firebase-adminsdk-xxxxx@storybook-452807.iam.gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

### Enable Firestore

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select region: `asia-south1` (Mumbai) or closest to you
5. Click **Enable**

---

## Step 4: Environment Configuration

### Generate JWT Secrets

```bash
# Run this twice to get two different secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Create .env File

```bash
cd /Users/vinit.khandal/Desktop/blend-design-system/apps/backend
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://your_username@localhost:5432/blend_studio

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

# JWT
JWT_SECRET=paste-64-char-hex-from-step-above
JWT_REFRESH_SECRET=paste-second-64-char-hex
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Frontend
FRONTEND_URL=http://localhost:5173

# Firebase (from the downloaded JSON)
FIREBASE_PROJECT_ID=storybook-452807
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@storybook-452807.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Cookies
COOKIE_SECURE=false
COOKIE_HTTP_ONLY=true
```

**Note**: For `FIREBASE_PRIVATE_KEY`, copy the entire key including newlines (as `\n`)

---

## Step 5: Start the Server

```bash
cd /Users/vinit.khandal/Desktop/blend-design-system/apps/backend

# Install dependencies
pnpm install

# Generate Prisma client
npx prisma generate

# Start development server
pnpm dev
```

You should see:

```
Server running on http://localhost:3001
Swagger docs available at http://localhost:3001/docs
Environment: development
```

---

## Step 6: Test Everything

### Test 1: Health Check

```bash
curl http://localhost:3001/health
```

Expected response:

```json
{
    "status": "ok",
    "timestamp": "2025-01-XXT...",
    "version": "0.1.0"
}
```

### Test 2: Swagger UI

Open http://localhost:3001/docs

You should see:

- **Health** endpoints
- **Authentication** endpoints (Google OAuth, JWT)
- **Branches** endpoints (CRUD operations)

### Test 3: Google Authentication

#### Method A: Via Swagger UI

1. Go to http://localhost:3001/docs
2. Find `GET /api/auth/google`
3. Click **Try it out** → **Execute**
4. You'll be redirected to Google login
5. After login, you'll get a token in the URL

#### Method B: Direct Browser

1. Go to: http://localhost:3001/api/auth/google
2. Complete Google OAuth flow
3. You'll be redirected to: `http://localhost:5173/auth/callback?token=eyJhbG...`
4. Copy the token (everything after `token=`)

#### Method C: Test Protected Endpoint

```bash
# Replace YOUR_JWT_TOKEN with the token from above
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3001/api/auth/me
```

Expected response:

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "uuid",
            "email": "your@email.com",
            "displayName": "Your Name",
            "role": "viewer"
        }
    }
}
```

### Test 4: Create a Branch (Requires Auth)

```bash
# First get a JWT token (follow Test 3)
TOKEN="your-jwt-token"

# Create a new branch
curl -X POST http://localhost:3001/api/branches \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "My First Brand",
    "brandConfig": {
      "colors": {
        "primary": {
          "500": "#E31837"
        }
      }
    }
  }'
```

Expected response:

```json
{
  "success": true,
  "data": {
    "branch": {
      "id": "uuid",
      "name": "My First Brand",
      "status": "draft",
      ...
    }
  }
}
```

### Test 5: List Branches

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/branches
```

### Test 6: Resolve Tokens

```bash
# Replace BRANCH_ID with the ID from the create response
curl -X POST http://localhost:3001/api/branches/BRANCH_ID/resolve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"theme": "light"}'
```

---

## Available API Endpoints

### Health

- `GET /health` - Health check
- `GET /api/health` - Health check (alternative)

### Authentication

- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (requires auth)
- `POST /api/auth/logout-all` - Logout all devices (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Branches

- `GET /api/branches` - List branches (requires auth)
- `POST /api/branches` - Create branch (requires auth)
- `GET /api/branches/:id` - Get branch (requires auth)
- `PATCH /api/branches/:id` - Update branch (requires auth)
- `DELETE /api/branches/:id` - Delete branch (requires auth)
- `POST /api/branches/:id/fork` - Fork branch (requires auth)
- `POST /api/branches/:id/publish` - Publish version (requires auth)
- `GET /api/branches/:id/versions` - List versions (requires auth)
- `POST /api/branches/:id/resolve` - Resolve tokens (requires auth)

---

## Troubleshooting

### "User was denied access on the database"

```bash
# Grant database permissions
psql blend_studio -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "$(whoami)";'
psql blend_studio -c 'GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "$(whoami)";'
```

### "Firebase initialization failed"

- Verify `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`
- Ensure Firestore is enabled in Firebase Console
- Check that the private key has proper formatting (with `\n` for newlines)

### "Cannot find module '@/config/firebase'"

```bash
# Regenerate Prisma client and check TypeScript compilation
npx prisma generate
pnpm typecheck
```

### Google OAuth "unauthorized_client" error

- Add your email to **Test users** in OAuth consent screen
- Verify redirect URI matches exactly (including protocol and path)
- Check that Client ID and Secret are correct

---

## Next Steps

After setup is complete:

1. **Frontend Integration**: Connect blend-studio frontend to use these APIs
2. **Token Engine**: Implement actual token resolution from brand config
3. **CLI Tool**: Create the `blend-studio` CLI package
4. **Production Deployment**: Deploy to GCP Cloud Run

---

## Useful Commands

```bash
# Development
pnpm dev                    # Start with hot reload
pnpm build                  # Build for production
pnpm start                  # Start production build

# Database
npx prisma generate         # Generate Prisma client
npx prisma studio           # Open Prisma Studio GUI
npx prisma migrate dev      # Create migration
npx prisma migrate deploy   # Apply migrations

# Testing
curl http://localhost:3001/health
curl -H "Authorization: Bearer TOKEN" http://localhost:3001/api/auth/me

# Logs
# View logs in terminal where pnpm dev is running
```

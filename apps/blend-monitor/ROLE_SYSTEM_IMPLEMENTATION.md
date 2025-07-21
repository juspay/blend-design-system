# Role-Based Access Control (RBAC) Implementation

## Overview

A comprehensive role-based access control system has been integrated into the blend-monitor app with three default roles: Admin, Developer, and Viewer.

## Implementation Details

### 1. Core Components

#### Role Service (`lib/role-service.ts`)

- Manages user roles and permissions in Firebase Realtime Database
- Handles user creation/updates with automatic role assignment
- Provides permission checking utilities
- Default admin: deepanshu.kumar@juspay.in

#### Enhanced Auth Context (`contexts/AuthContext.tsx`)

- Extended to include user role and permission data
- Real-time synchronization with role changes
- Provides `hasPermission()` method for permission checks

#### Permission Guards (`components/auth/PermissionGuard.tsx`)

- Component-level permission control
- `PermissionGuard` component for conditional rendering
- `usePermissions` hook for easy permission checks
- Higher-order component support

### 2. Role Definitions

#### Admin

- **Deployments**: read, write, deploy, rollback
- **Users**: read, write, delete, create, assign_roles
- **Components**: read, write
- **Settings**: read, write

#### Developer

- **Deployments**: read, deploy, rollback
- **Components**: read, write
- **Users**: read (view only)

#### Viewer

- **Deployments**: read
- **Components**: read
- **Users**: read (view only)

### 3. Features Implemented

#### User Management Page (`/users`)

- Accessible to all users (read access)
- Only admins can modify user roles
- Real-time role updates
- Visual role indicators with color coding
- Role permissions reference section

#### Deployment Protection

- Deploy page requires 'deployments:deploy' permission
- Access denied page for unauthorized users
- Role-based UI elements

#### API Security (`lib/auth-middleware.ts`)

- Server-side authentication and authorization
- Permission validation for API routes
- Audit logging for sensitive actions

#### UI Enhancements

- User role badge in sidebar footer
- Role indicators throughout the app
- Permission-based navigation

### 4. Database Structure

```json
{
  "users": {
    "userId": {
      "email": "user@example.com",
      "displayName": "User Name",
      "role": "viewer",
      "createdAt": "timestamp",
      "lastLogin": "timestamp",
      "isActive": true
    }
  },
  "roles": {
    "admin": { ... },
    "developer": { ... },
    "viewer": { ... }
  }
}
```

### 5. Usage Examples

#### Check Permissions in Components

```typescript
import { usePermissions } from '@/components/auth/PermissionGuard'

function MyComponent() {
  const { canDeploy, canManageUsers, isAdmin } = usePermissions()

  return (
    <div>
      {canDeploy && <DeployButton />}
      {canManageUsers && <UserManagementLink />}
    </div>
  )
}
```

#### Protect Routes

```typescript
<PermissionGuard resource="deployments" action="deploy">
  <DeploymentForm />
</PermissionGuard>
```

#### API Route Protection

```typescript
const user = await authenticateRequest(request)
const permissionCheck = await requirePermission('users', 'write')(request, user)
if (permissionCheck) return permissionCheck
```

### 6. Security Features

- Firebase token verification
- Server-side permission validation
- Audit logging for role changes
- Real-time permission updates
- Secure API endpoints

### 7. Next Steps

1. **Testing**: Test all role scenarios
2. **Custom Roles**: Add support for custom roles
3. **Bulk Operations**: Add bulk user management
4. **Email Notifications**: Notify users of role changes
5. **Activity Logs**: Display audit logs in UI
6. **Role Templates**: Create role templates for common scenarios

## Testing the System

1. **Deploy Database Rules** (Required for proper permissions):

    ```bash
    cd apps/blend-monitor
    ./scripts/deploy-database-rules.sh
    ```

    Or manually deploy with:

    ```bash
    firebase deploy --only database
    ```

2. Sign in with deepanshu.kumar@juspay.in (auto-assigned admin)
3. Navigate to Users page to manage roles
4. Test deployment access with different roles
5. Verify permission-based UI elements

## Database Rules

The Firebase Realtime Database rules have been updated to include:

- Users can read all user data when authenticated
- Users can only write their own data (except role)
- Only admins can change user roles
- Only admins can modify the roles definitions

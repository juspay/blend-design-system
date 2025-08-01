# Blend Monitor - Modular Architecture

This application follows a modular architecture with clear separation between frontend and backend code.

## Directory Structure

```
src/
├── frontend/          # Client-side code
│   ├── app/          # Next.js pages
│   ├── components/   # React components
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Frontend utilities
│   └── services/     # API client services
│
├── backend/          # Server-side code
│   ├── api/          # API route handlers
│   ├── external/     # External API clients
│   ├── lib/          # Backend utilities
│   ├── repositories/ # Data access layer
│   ├── scanners/     # Data scanners
│   └── services/     # Business logic
│
└── shared/           # Shared code
    ├── constants/    # Shared constants
    └── types/        # TypeScript types
```

## Key Principles

1. **Separation of Concerns**: Frontend and backend code are completely separated
2. **Layered Architecture**: Clear layers for API, services, and data access
3. **Shared Types**: Common types are shared between frontend and backend
4. **Re-export Pattern**: The root `/app` directory re-exports from `/src`

## Import Aliases

- `@/frontend/*` - Frontend code
- `@/backend/*` - Backend code
- `@/shared/*` - Shared code
- `@/*` - Root imports (legacy)

## Migration Notes

### Old Structure → New Structure

- `/lib` → `/src/backend/lib`
- `/components` → `/src/frontend/components`
- `/hooks` → `/src/frontend/hooks`
- `/types` → `/src/shared/types`
- `/app/api` → `/src/backend/api` (with re-exports in `/app/api`)

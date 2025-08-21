# Blend Design System - Component Telemetry

This module provides privacy-first, opt-out telemetry for tracking component usage across different applications.

## Features

- ✅ **Opt-out by default** - Telemetry is enabled but can be easily disabled
- ✅ **Privacy-first** - No personal data, URLs, or sensitive information collected
- ✅ **Performance optimized** - Debounced events, sampling, minimal overhead
- ✅ **Development friendly** - Console logging for debugging
- ✅ **Graceful fallback** - Works without TelemetryProvider

## Quick Start

### 1. Wrap your app with TelemetryProvider

```tsx
import { TelemetryProvider } from '@juspay/blend-design-system'

function App() {
    return (
        <TelemetryProvider
            config={{
                enabled: true, // Default: true (opt-out system)
                debug: true, // Enable console logging in development
                samplingRate: 1.0, // Track 100% of events
            }}
        >
            <YourApp />
        </TelemetryProvider>
    )
}
```

### 2. Use components normally

```tsx
import { Button } from '@juspay/blend-design-system'

function MyComponent() {
    return <Button text="Click me" buttonType="PRIMARY" size="MEDIUM" />
}
```

### 3. See telemetry in action

Open browser console in development mode to see telemetry events:

```
🔍 Blend Telemetry: Button
  Event Type: component_mount
  Component Props: { buttonType: "PRIMARY", size: "MEDIUM", hasText: true }
  Package Version: 0.0.13
  Session ID: blend_1234567890_abc123
  Environment: development
```

## Configuration Options

```tsx
interface TelemetryConfig {
    enabled: boolean // Default: true
    environment?: string // Auto-detected
    samplingRate?: number // Default: 1.0 (100%)
    debug?: boolean // Default: true in development
}
```

## Disabling Telemetry (Opt-out)

### Globally disable for your app:

```tsx
<TelemetryProvider config={{ enabled: false }}>
    <App />
</TelemetryProvider>
```

### Or set via environment variable:

```bash
BLEND_TELEMETRY_DISABLED=true
```

### Or disable at runtime:

```tsx
const { updateConfig } = useTelemetry()
updateConfig({ enabled: false })
```

## What Data is Collected

### ✅ Safe Data Collected:

- Component name (e.g., "Button")
- Component props (sanitized, safe values only)
- Package version
- Anonymous session ID
- Environment (development/production)
- Timestamp

### ❌ Data NOT Collected:

- Personal information
- URLs or paths
- Function implementations
- Sensitive props or data
- User content or text
- IP addresses or location

## Example Telemetry Event

```json
{
    "eventType": "component_mount",
    "componentName": "Button",
    "componentProps": {
        "buttonType": "PRIMARY",
        "size": "MEDIUM",
        "disabled": "false",
        "loading": "false",
        "hasText": "true"
    },
    "packageVersion": "0.0.13",
    "sessionId": "blend_1234567890_abc123",
    "timestamp": 1640995200000,
    "environment": "development"
}
```

## Privacy & Compliance

- **GDPR Compliant**: No personal data collected
- **Anonymous**: Session IDs are generated locally
- **Transparent**: Full visibility into what's tracked
- **User Control**: Easy opt-out mechanisms
- **Local First**: Data processed locally before transmission

## Performance Impact

- **Minimal overhead**: < 1ms per component render
- **Debounced events**: Rapid re-renders are batched
- **Sampling support**: Can reduce event volume
- **Lazy loading**: Telemetry code loaded asynchronously

## Development vs Production

- **Development**: Full logging, debug mode enabled
- **Production**: Silent operation, optimized performance
- **Environment detection**: Automatic environment detection

## Testing

See `test-example.tsx` for complete testing examples and instructions.

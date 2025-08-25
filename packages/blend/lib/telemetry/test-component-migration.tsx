/**
 * Test Component Migration
 *
 * @fileoverview Simple test component to verify telemetry migration is working
 */

import { TelemetryProvider } from './TelemetryContext'
import Button from '../components/Button/Button'
import { ButtonType, ButtonSize } from '../components/Button/types'
import Alert from '../components/Alert/Alert'
import { AlertVariant, AlertStyle } from '../components/Alert/types'
import SearchInput from '../components/Inputs/SearchInput/SearchInput'

// Test component that uses multiple migrated components
export function TestComponentMigration() {
    return (
        <TelemetryProvider
            config={{
                apiEndpoint:
                    'http://localhost:3000/api/telemetry/page-composition',
            }}
        >
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <h1>Component Migration Test</h1>

                {/* Test Button component with telemetry */}
                <Button
                    text="Test Button"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    onClick={() => console.log('Button clicked')}
                />

                {/* Test Alert component with telemetry */}
                <Alert
                    heading="Test Alert"
                    description="This alert tests the telemetry migration"
                    variant={AlertVariant.PRIMARY}
                    style={AlertStyle.SUBTLE}
                />

                {/* Test SearchInput component with telemetry */}
                <SearchInput
                    placeholder="Search test..."
                    leftSlot={<span>🔍</span>}
                    onChange={(e) => console.log('Search:', e.target.value)}
                />

                <p>
                    This page should generate telemetry data with 3 components:
                    Button, Alert, and SearchInput
                </p>
            </div>
        </TelemetryProvider>
    )
}

export default TestComponentMigration

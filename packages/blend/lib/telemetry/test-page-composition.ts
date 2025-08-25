/**
 * Test file for page composition system
 *
 * @fileoverview Test the new page composition tracking to ensure it works correctly
 * @package @juspay/blend-design-system
 */

import { getPageCompositionManager } from './pageComposition'

/**
 * Test the page composition system
 */
export function testPageComposition() {
    console.log('🧪 Testing Page Composition System...')

    const manager = getPageCompositionManager()

    // Set up a test handler
    manager.setCompositionChangeHandler((event) => {
        console.log('📊 Page Composition Change Detected:', {
            changeType: event.changeType,
            fingerprint: event.pageComposition.pageFingerprint,
            components: event.pageComposition.components.map(
                (c) => `${c.name} (${c.instanceCount}x)`
            ),
            hash: event.pageComposition.compositionHash,
        })
    })

    // Test 1: Register some components
    console.log('Test 1: Registering components...')
    manager.registerComponent('Button', { buttonType: 'primary', size: 'md' })
    manager.registerComponent('Button', { buttonType: 'primary', size: 'md' }) // Same props
    manager.registerComponent('Button', { buttonType: 'secondary', size: 'lg' }) // Different props
    manager.registerComponent('Alert', {
        variant: 'success',
        dismissible: true,
    })

    // Wait for debounce
    setTimeout(() => {
        console.log('Current status:', manager.getStatus())

        // Test 2: Add more components
        console.log('Test 2: Adding more components...')
        manager.registerComponent('StatCard', {
            size: 'lg',
            variant: 'revenue',
        })
        manager.registerComponent('StatCard', {
            size: 'lg',
            variant: 'revenue',
        }) // Same props

        setTimeout(() => {
            console.log('Updated status:', manager.getStatus())

            // Test 3: Remove some components
            console.log('Test 3: Removing components...')
            manager.unregisterComponent('Button', {
                buttonType: 'primary',
                size: 'md',
            })

            setTimeout(() => {
                console.log('Final status:', manager.getStatus())
                console.log('✅ Page Composition Test Complete')
            }, 1100)
        }, 1100)
    }, 1100)
}

/**
 * Test multiple users scenario (simulated)
 */
export function testMultipleUsersScenario() {
    console.log('🧪 Testing Multiple Users Scenario...')

    // Simulate User 1
    console.log('👤 User 1 visits page...')
    const manager1 = getPageCompositionManager()

    let compositionChangeCount = 0
    manager1.setCompositionChangeHandler((event) => {
        compositionChangeCount++
        console.log(`📊 Composition Change #${compositionChangeCount}:`, {
            changeType: event.changeType,
            fingerprint: event.pageComposition.pageFingerprint,
            components: event.pageComposition.components.length,
        })
    })

    // User 1 loads components
    manager1.registerComponent('Button', { buttonType: 'primary', size: 'md' })
    manager1.registerComponent('Alert', { variant: 'success' })

    setTimeout(() => {
        // Simulate User 2 (same page, same components)
        console.log('👤 User 2 visits same page...')
        const manager2 = getPageCompositionManager() // Same singleton instance

        // User 2 loads same components - should NOT trigger new composition change
        manager2.registerComponent('Button', {
            buttonType: 'primary',
            size: 'md',
        })
        manager2.registerComponent('Alert', { variant: 'success' })

        setTimeout(() => {
            console.log(
                `✅ Total composition changes: ${compositionChangeCount}`
            )
            console.log('Expected: 1 (only first user should trigger change)')

            // User 3 adds different component
            console.log('👤 User 3 adds new component...')
            manager2.registerComponent('StatCard', { variant: 'revenue' })

            setTimeout(() => {
                console.log(
                    `✅ Final composition changes: ${compositionChangeCount}`
                )
                console.log('Expected: 2 (first user + new component addition)')
                console.log('✅ Multiple Users Test Complete')
            }, 1100)
        }, 1100)
    }, 1100)
}

/**
 * Run all tests
 */
export function runAllTests() {
    console.log('🚀 Starting Page Composition Tests...')

    testPageComposition()

    setTimeout(() => {
        testMultipleUsersScenario()
    }, 5000)
}

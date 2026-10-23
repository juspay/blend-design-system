import { Platform } from 'react-native'

/**
 * Spread onto a host component to render `data-*` attributes on
 * react-native-web, which turns its `dataSet` prop into them
 * (`{ pathState: 'active' }` → `data-path-state="active"`). Returns nothing
 * on iOS/Android, where `dataSet` is not a View prop, so native renders are
 * unchanged.
 *
 * The result is spread rather than typed as a prop because `dataSet` isn't
 * part of React Native's `ViewProps`; JSX spreads skip excess-property
 * checks, which is what lets it through to react-native-web.
 */
export function webDataSet(dataSet: Record<string, string>): {
    dataSet?: Record<string, string>
} {
    return Platform.OS === 'web' ? { dataSet } : {}
}

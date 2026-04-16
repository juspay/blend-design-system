import type { Version } from '@blend-design/token-engine'
import { JuspayDefaultConfig } from './brand-configs'

export const versions: Map<string, Version[]> = new Map([
    [
        'juspay/default',
        [
            {
                id: '2.1.0',
                branchId: 'juspay/default',
                version: '2.1.0',
                brandConfig: JuspayDefaultConfig,
                changelog: 'Updated primary color, improved contrast ratios',
                isBreaking: false,
                isPrerelease: false,
                publishedBy: 'mock-user-1',
                publishedByName: 'Design Team',
                publishedAt: new Date('2024-03-20'),
                downloadCount: 1247,
                lastDownloadedAt: new Date('2024-03-25'),
                parentVersion: '2.0.5',
            },
            {
                id: '2.0.5',
                branchId: 'juspay/default',
                version: '2.0.5',
                brandConfig: JuspayDefaultConfig,
                changelog: 'Bug fixes for dark mode',
                isBreaking: false,
                isPrerelease: false,
                publishedBy: 'mock-user-1',
                publishedByName: 'Design Team',
                publishedAt: new Date('2024-03-10'),
                downloadCount: 892,
                lastDownloadedAt: new Date('2024-03-20'),
                parentVersion: '2.0.4',
            },
        ],
    ],
])

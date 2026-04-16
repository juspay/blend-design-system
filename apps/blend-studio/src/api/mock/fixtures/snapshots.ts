import type { Snapshot } from '@blend-design/token-engine'
import { JuspayDefaultConfig } from './brand-configs'

export const snapshots: Map<string, Snapshot[]> = new Map([
    [
        'juspay/default',
        [
            {
                id: 'snapshot_1711000000000',
                branchId: 'juspay/default',
                brandConfig: JuspayDefaultConfig,
                savedBy: 'mock-user-1',
                savedByName: 'Design Team',
                savedAt: new Date('2024-03-21T10:00:00Z'),
                label: 'Before color change',
                isAutoSave: false,
            },
        ],
    ],
])

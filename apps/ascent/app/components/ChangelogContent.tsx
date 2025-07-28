import { getBlendChangelog } from '../docs/utils/parseChangelog'
import { ChangelogViewer } from './ChangelogViewer'

export function ChangelogContent() {
    const changelog = getBlendChangelog()

    return (
        <div>
            <ChangelogViewer entries={changelog.entries} />
        </div>
    )
}

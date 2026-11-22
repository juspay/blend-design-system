import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import AvatarGroup from '../../../lib/components/AvatarGroup/AvatarGroup'
import { Badge } from '../../../lib/components/Badge'
import { getAccessibleLabel as getBadgeLabel } from '../../../lib/components/Badge/badge.utils'
import Slider from '../../../lib/components/Slider/Slider'
import { Timeline } from '../../../lib/components/Timeline'

const FRENCH: Record<string, string> = {
    'avatar-group.a11y.group.other': 'Groupe de {count} avatars',
    'avatar-group.a11y.group-selected.other':
        'Groupe de {count} avatars, {selected} sélectionné(s)',
    'badge.a11y.more-than': 'Plus de {max}',
    'slider.a11y.single': 'Curseur, valeur actuelle : {value}',
    'timeline.action.show-more': 'Afficher plus ({count}+)',
}
const t = (key: string) => FRENCH[key]
const fr = { providerProps: { locale: 'fr-FR', t } }

const AVATARS = [
    { id: 1, alt: 'John Doe' },
    { id: 2, alt: 'Jane Smith' },
    { id: 3, alt: 'Mike Johnson' },
]

describe('display components locale (Accessibility)', () => {
    it('keeps the English AvatarGroup name, and fixes the singular', () => {
        const { unmount } = render(<AvatarGroup avatars={AVATARS} />)
        expect(
            screen.getByRole('group', { name: 'Group of 3 avatars' })
        ).toBeInTheDocument()
        unmount()

        render(<AvatarGroup avatars={AVATARS.slice(0, 1)} />)
        // Used to read "Group of 1 avatars".
        expect(
            screen.getByRole('group', { name: 'Group of 1 avatar' })
        ).toBeInTheDocument()
    })

    it('translates the AvatarGroup name, including the selected count', () => {
        render(<AvatarGroup avatars={AVATARS} selectedAvatarIds={[1]} />, fr)

        expect(
            screen.getByRole('group', {
                name: 'Groupe de 3 avatars, 1 sélectionné(s)',
            })
        ).toBeInTheDocument()
    })

    it('translates the Badge overflow label and keeps the util English', () => {
        render(<Badge count={120} maxCount={99} />, fr)
        expect(screen.getByLabelText('Plus de 99')).toBeInTheDocument()

        expect(getBadgeLabel(120, undefined, 99, true)).toBe('More than 99')
        expect(getBadgeLabel(undefined, undefined, 99, true)).toBe(
            'Notification'
        )
    })

    it('translates the Slider thumb name', () => {
        render(<Slider defaultValue={[50]} />, fr)

        expect(
            screen.getByRole('slider', {
                name: /^Curseur, valeur actuelle : /,
            })
        ).toBeInTheDocument()
    })

    it('translates the Timeline show-more default and lets label win', () => {
        const { unmount } = render(
            <Timeline>
                <Timeline.ShowMore count={45} onShowMore={() => {}} />
            </Timeline>,
            fr
        )
        expect(
            screen.getByRole('button', { name: 'Afficher plus (45+)' })
        ).toBeInTheDocument()
        unmount()

        render(
            <Timeline>
                <Timeline.ShowMore
                    count={45}
                    label="See all"
                    onShowMore={() => {}}
                />
            </Timeline>,
            fr
        )
        expect(
            screen.getByRole('button', { name: 'See all' })
        ).toBeInTheDocument()
    })
})

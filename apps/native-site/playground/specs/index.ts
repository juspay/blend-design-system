import { asAnySpec } from '../types'
import type { AnySpec } from '../types'
import accordion from './accordion.spec'
import alert from './alert.spec'
import avatar from './avatar.spec'
import bottomSheet from './bottomSheet.spec'
import button from './button.spec'
import card from './card.spec'
import checkbox from './checkbox.spec'
import keyValuePair from './keyValuePair.spec'
import modal from './modal.spec'
import numberInput from './numberInput.spec'
import otpInput from './otpInput.spec'
import popover from './popover.spec'
import progressBar from './progressBar.spec'
import radio from './radio.spec'
import searchInput from './searchInput.spec'
import skeleton from './skeleton.spec'
import snackbar from './snackbar.spec'
import switchSpec from './switch.spec'
import spinner from './spinner.spec'
import tabs from './tabs.spec'
import tag from './tag.spec'
import textArea from './textArea.spec'
import textInput from './textInput.spec'
import tooltip from './tooltip.spec'

/**
 * The component list behind the drawer. Every renderable `blend-native`
 * exports has an entry, with the families (Button/IconButton/LinkButton/
 * ButtonGroup, Tag/TagGroup) folded into one spec apiece — they share a
 * token slot, and reading them against each other is the point.
 *
 * Adding a component is a spec file plus one line here.
 */
export type SpecGroup = {
    title: string
    specs: readonly AnySpec[]
}

export const COMPONENT_GROUPS: readonly SpecGroup[] = [
    {
        title: 'Actions',
        specs: [asAnySpec(button), asAnySpec(tag)],
    },
    {
        title: 'Inputs',
        specs: [
            asAnySpec(textInput),
            asAnySpec(textArea),
            asAnySpec(numberInput),
            asAnySpec(searchInput),
            asAnySpec(otpInput),
            asAnySpec(checkbox),
            asAnySpec(radio),
            asAnySpec(switchSpec),
        ],
    },
    {
        title: 'Feedback',
        specs: [
            asAnySpec(alert),
            asAnySpec(snackbar),
            asAnySpec(progressBar),
            asAnySpec(spinner),
            asAnySpec(skeleton),
        ],
    },
    {
        title: 'Data display',
        specs: [
            asAnySpec(avatar),
            asAnySpec(card),
            asAnySpec(keyValuePair),
            asAnySpec(tabs),
            asAnySpec(accordion),
        ],
    },
    {
        title: 'Overlays',
        specs: [
            asAnySpec(bottomSheet),
            asAnySpec(modal),
            asAnySpec(popover),
            asAnySpec(tooltip),
        ],
    },
]

export const ALL_SPECS: readonly AnySpec[] = COMPONENT_GROUPS.flatMap(
    (group) => group.specs
)

export function findSpec(name: string): AnySpec {
    return ALL_SPECS.find((spec) => spec.name === name) ?? ALL_SPECS[0]
}

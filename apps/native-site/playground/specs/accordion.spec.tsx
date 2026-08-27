import { Text as RNText, View } from 'react-native'
import {
    Accordion,
    AccordionChevronPosition,
    AccordionItem,
    AccordionType,
} from 'blend-native'
import type { AccordionNativeProps } from 'blend-native'
import { indent } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type AccordionPlaygroundProps = Pick<
    AccordionNativeProps,
    'accordionType' | 'isMultiple'
> & {
    /** Item-level prop, playground-only on the root spec. */
    chevronPosition: AccordionChevronPosition
}

const BODY = { paddingVertical: 12 }

function AccordionPreview({
    chevronPosition,
    ...props
}: AccordionPlaygroundProps) {
    return (
        <View style={{ width: 320 }}>
            <Accordion defaultValue="fees" {...props}>
                <AccordionItem
                    value="fees"
                    title="Processing fees"
                    subtext="Per transaction"
                    chevronPosition={chevronPosition}
                >
                    <View style={BODY}>
                        <RNText>2.1% + ₹3 per successful charge.</RNText>
                    </View>
                </AccordionItem>
                <AccordionItem
                    value="settlement"
                    title="Settlement schedule"
                    chevronPosition={chevronPosition}
                >
                    <View style={BODY}>
                        <RNText>T+2 working days to your account.</RNText>
                    </View>
                </AccordionItem>
                <AccordionItem
                    value="disputes"
                    title="Dispute handling"
                    chevronPosition={chevronPosition}
                    isDisabled
                >
                    <View style={BODY}>
                        <RNText>Managed from the dashboard.</RNText>
                    </View>
                </AccordionItem>
            </Accordion>
        </View>
    )
}

const CHILDREN = [
    '<AccordionItem value="fees" title="Processing fees">',
    '    …',
    '</AccordionItem>',
    '<AccordionItem value="settlement" title="Settlement schedule">',
    '    …',
    '</AccordionItem>',
].join('\n')

const spec: ComponentSpec<AccordionPlaygroundProps> = {
    name: 'Accordion',
    summary:
        'Compound Accordion/AccordionItem with a measured height animation and rotating chevron. Single or multiple expansion, controlled or uncontrolled.',
    mode: 'inline',
    defaults: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
        chevronPosition: AccordionChevronPosition.RIGHT,
    },
    controls: [
        {
            kind: 'select',
            key: 'accordionType',
            label: 'Type',
            options: enumOptions(AccordionType, 'AccordionType'),
        },
        {
            kind: 'select',
            key: 'chevronPosition',
            label: 'Chevron',
            hidden: true,
            options: enumOptions(
                AccordionChevronPosition,
                'AccordionChevronPosition'
            ),
        },
        { kind: 'toggle', key: 'isMultiple', label: 'Multiple open' },
    ],
    render: (props) => <AccordionPreview {...props} />,
    wrapSnippet: (inner) => {
        const open = inner.endsWith(' />')
            ? `${inner.slice(0, -3)}>`
            : `${inner.replace(/\n\/>$/, '\n>')}`
        return `${open}\n${indent(CHILDREN)}\n</Accordion>`
    },
}

export default spec

'use client'

import {
    AccordionV2,
    AccordionV2Item,
    AccordionV2Type,
    ThemeProvider,
} from '@juspay/blend-design-system'

export function AccordionV2Demo() {
    return (
        <div className="not-prose my-6 rounded-xl border border-[var(--blend-code-border)] bg-[var(--blend-surface)] p-4">
            <ThemeProvider>
                <AccordionV2
                    accordionType={AccordionV2Type.BORDER}
                    defaultValue="overview"
                >
                    <AccordionV2Item
                        value="overview"
                        title="What is Accordion V2?"
                    >
                        Accordion V2 groups related information into compact,
                        expandable sections.
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="usage"
                        title="When should I use it?"
                    >
                        Use it for supporting details that people may want to
                        scan before opening.
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="multiple"
                        title="Can multiple sections be open?"
                    >
                        Yes. Use the <code>isMultiple</code> prop when readers
                        need to compare sections at the same time.
                    </AccordionV2Item>
                </AccordionV2>
            </ThemeProvider>
        </div>
    )
}

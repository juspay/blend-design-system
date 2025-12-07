'use client'
import {
    Accordion,
    AccordionItem,
    AccordionType,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AccordionPreview = () => {
    const tsCode = `import { Accordion, AccordionItem, AccordionType, AccordionChevronPosition } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Accordion accordionType={AccordionType.BORDER} isMultiple={false}>
      <AccordionItem value="item-1" title="Accordion Item 1">
        <p>This is the content of the first accordion item.</p>
      </AccordionItem>
      <AccordionItem value="item-2" title="Accordion Item 2">
        <p>This is the content of the second accordion item.</p>
      </AccordionItem>
    </Accordion>
  );
}`

    return (
        <ComponentPreview ts={tsCode}>
            <Accordion accordionType={AccordionType.BORDER}>
                <AccordionItem
                    value="item-1"
                    title="What is Blend Design System?"
                >
                    <div className="p-4">
                        <p className="text-gray-700">
                            Blend is a comprehensive design system that provides
                            a collection of reusable components, guided by clear
                            standards, that can be assembled together to build
                            any number of applications.
                        </p>
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="How to get started?">
                    <div className="p-4">
                        <p className="text-gray-700">
                            To get started with Blend, install the package and
                            import the components you need. The system includes
                            comprehensive documentation and examples for each
                            component.
                        </p>
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="item-3"
                    title="What components are available?"
                >
                    <div className="p-4">
                        <p className="text-gray-700">
                            Blend includes a wide range of components including
                            buttons, forms, navigation, data display, feedback,
                            and layout components. Each component is fully
                            customizable and accessible.
                        </p>
                    </div>
                </AccordionItem>
            </Accordion>
        </ComponentPreview>
    )
}

export default AccordionPreview

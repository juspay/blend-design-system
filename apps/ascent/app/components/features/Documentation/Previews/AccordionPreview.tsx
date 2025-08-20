'use client'
import {
    Accordion,
    AccordionItem,
    AccordionType,
    AccordionChevronPosition,
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

    const reCode = `type accordionType = [#border | #noBorder]
type accordionChevronPosition = [#left | #right]

@react.component
let make = (
  ~children: React.element,
  ~accordionType: option<accordionType>=?,
  ~defaultValue: option<string>=?,
  ~value: option<string>=?,
  ~isMultiple: option<bool>=?,
  ~onValueChange: option<string => unit>=?,
) => {
  <AccordionBinding
    ?accordionType
    ?defaultValue
    ?value
    ?isMultiple
    ?onValueChange
    children
  />
}

@react.component
let makeItem = (
  ~value: string,
  ~title: string,
  ~children: React.element,
  ~subtext: option<string>=?,
  ~leftSlot: option<React.element>=?,
  ~rightSlot: option<React.element>=?,
  ~subtextSlot: option<React.element>=?,
  ~isDisabled: option<bool>=?,
  ~chevronPosition: option<accordionChevronPosition>=?,
  ~className: option<string>=?,
) => {
  <AccordionItemBinding
    value
    title
    ?subtext
    ?leftSlot
    ?rightSlot
    ?subtextSlot
    ?isDisabled
    ?chevronPosition
    ?className
    children
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~children: React.element,
  ~accordionType: [#border | #noBorder]=?,
  ~defaultValue: string=?,
  ~value: string=?,
  ~isMultiple: bool=?,
  ~onValueChange: string => unit=?,
) => React.element = "Accordion"

@module("@juspay/blend-design-system") @react.component
external makeItem: (
  ~value: string,
  ~title: string,
  ~children: React.element,
  ~subtext: string=?,
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~subtextSlot: React.element=?,
  ~isDisabled: bool=?,
  ~chevronPosition: [#left | #right]=?,
  ~className: string=?,
) => React.element = "AccordionItem"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="m-4 min-w-100 space-y-8">
                {/* Basic Accordion with Border */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Basic Accordion (Border)
                    </h3>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="item-1"
                            title="What is Blend Design System?"
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Blend is a comprehensive design system that
                                    provides a collection of reusable
                                    components, guided by clear standards, that
                                    can be assembled together to build any
                                    number of applications.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="item-2"
                            title="How to get started?"
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    To get started with Blend, install the
                                    package and import the components you need.
                                    The system includes comprehensive
                                    documentation and examples for each
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
                                    Blend includes a wide range of components
                                    including buttons, forms, navigation, data
                                    display, feedback, and layout components.
                                    Each component is fully customizable and
                                    accessible.
                                </p>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* No Border Accordion */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        No Border Accordion
                    </h3>
                    <Accordion accordionType={AccordionType.NO_BORDER}>
                        <AccordionItem value="item-1" title="Getting Started">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Learn the basics of using Blend Design
                                    System in your projects.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem value="item-2" title="Components">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Explore all available components and their
                                    usage examples.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem value="item-3" title="Theming">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Customize the design system to match your
                                    brand requirements.
                                </p>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Multiple Selection Accordion */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Multiple Selection
                    </h3>
                    <Accordion
                        accordionType={AccordionType.BORDER}
                        isMultiple={true}
                    >
                        <AccordionItem value="item-1" title="React Development">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Modern React development with hooks,
                                    context, and functional components.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem value="item-2" title="TypeScript">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Type-safe JavaScript development with
                                    TypeScript.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem value="item-3" title="Design Systems">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Building scalable and maintainable design
                                    systems.
                                </p>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Accordion with Slots */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        With Icons and Slots
                    </h3>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="item-1"
                            title="Documentation"
                            subtext="Comprehensive guides and examples"
                            leftSlot={<span className="text-blue-500">📚</span>}
                            rightSlot={
                                <span className="text-green-500 text-sm">
                                    New
                                </span>
                            }
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Access comprehensive documentation with
                                    examples, API references, and best
                                    practices.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="item-2"
                            title="Components"
                            subtext="Reusable UI components"
                            leftSlot={
                                <span className="text-purple-500">🧩</span>
                            }
                            chevronPosition={AccordionChevronPosition.LEFT}
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Explore our collection of reusable
                                    components built with accessibility in mind.
                                </p>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="item-3"
                            title="Disabled Item"
                            isDisabled={true}
                            leftSlot={<span className="text-gray-400">🔒</span>}
                        >
                            <div className="p-4">
                                <p className="text-gray-700">
                                    This item is disabled and cannot be
                                    expanded.
                                </p>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default AccordionPreview

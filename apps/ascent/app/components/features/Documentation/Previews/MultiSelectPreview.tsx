'use client'
import {
    MultiSelect,
    MultiSelectMenuSize,
    MultiSelectVariant,
    MultiSelectSelectionTagType,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MultiSelectPreview = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])

    const tsCode = `import { MultiSelect, MultiSelectMenuSize, MultiSelectVariant, MultiSelectSelectionTagType } from "@juspay/blend-design-system";
import { useState } from "react";

function MyComponent() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skillOptions = [
    {
      groupLabel: "Frontend",
      items: [
        {
          label: "React",
          value: "react",
          subLabel: "JavaScript library for building UIs",
        },
        {
          label: "Vue.js",
          value: "vue",
          subLabel: "Progressive JavaScript framework",
        },
        {
          label: "Angular",
          value: "angular",
          subLabel: "Platform for building mobile and desktop apps",
        },
      ],
    },
    {
      groupLabel: "Backend",
      items: [
        {
          label: "Node.js",
          value: "nodejs",
          subLabel: "JavaScript runtime for server-side development",
        },
        {
          label: "Python",
          value: "python",
          subLabel: "High-level programming language",
        },
      ],
    },
  ];

  return (
    <MultiSelect
      label="Select your skills"
      placeholder="Choose technologies you're familiar with"
      items={skillOptions}
      selectedValues={selectedSkills}
      onChange={setSelectedSkills}
      enableSearch={false}
      size={MultiSelectMenuSize.MEDIUM}
      variant={MultiSelectVariant.CONTAINER}
      selectionTagType={MultiSelectSelectionTagType.COUNT}
      required={true}
      helpIconHintText="Select all technologies you have experience with"
    />
  );
}`

    const reCode = `type multiSelectMenuSize = [#sm | #md | #lg]
type multiSelectVariant = [#container | #noContainer]
type multiSelectSelectionTagType = [#count | #text]

@react.component
let make = (
  ~label: string,
  ~sublabel: option<string>=?,
  ~placeholder: string,
  ~selectedValues: array<string>,
  ~onChange: string => unit,
  ~items: array<{groupLabel: option<string>, items: array<{label: string, value: string, subLabel: option<string>}>}>,
  ~size: option<multiSelectMenuSize>=?,
  ~variant: option<multiSelectVariant>=?,
  ~selectionTagType: option<multiSelectSelectionTagType>=?,
  ~required: option<bool>=?,
  ~disabled: option<bool>=?,
  ~helpIconHintText: option<string>=?,
  ~hintText: option<string>=?,
  ~enableSearch: option<bool>=?,
  ~searchPlaceholder: option<string>=?,
  ~enableSelectAll: option<bool>=?,
  ~selectAllText: option<string>=?,
  ~error: option<bool>=?,
  ~errorMessage: option<string>=?,
) => {
  <MultiSelectBinding
    label
    ?sublabel
    placeholder
    selectedValues
    onChange
    items
    ?size
    ?variant
    ?selectionTagType
    ?required
    ?disabled
    ?helpIconHintText
    ?hintText
    ?enableSearch
    ?searchPlaceholder
    ?enableSelectAll
    ?selectAllText
    ?error
    ?errorMessage
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~label: string,
  ~sublabel: string=?,
  ~placeholder: string,
  ~selectedValues: array<string>,
  ~onChange: string => unit,
  ~items: array<{groupLabel: option<string>, items: array<{label: string, value: string, subLabel: option<string>}>}>,
  ~size: [#sm | #md | #lg]=?,
  ~variant: [#container | #noContainer]=?,
  ~selectionTagType: [#count | #text]=?,
  ~required: bool=?,
  ~disabled: bool=?,
  ~helpIconHintText: string=?,
  ~hintText: string=?,
  ~enableSearch: bool=?,
  ~searchPlaceholder: string=?,
  ~enableSelectAll: bool=?,
  ~selectAllText: string=?,
  ~error: bool=?,
  ~errorMessage: string=?,
) => React.element = "MultiSelect"`

    const skillOptions = [
        {
            groupLabel: 'Frontend',
            items: [
                {
                    label: 'React',
                    value: 'react',
                    subLabel: 'JavaScript library for building UIs',
                },
                {
                    label: 'Vue.js',
                    value: 'vue',
                    subLabel: 'Progressive JavaScript framework',
                },
                {
                    label: 'Angular',
                    value: 'angular',
                    subLabel: 'Platform for building mobile and desktop apps',
                },
            ],
        },
        {
            groupLabel: 'Backend',
            items: [
                {
                    label: 'Node.js',
                    value: 'nodejs',
                    subLabel: 'JavaScript runtime for server-side development',
                },
                {
                    label: 'Python',
                    value: 'python',
                    subLabel: 'High-level programming language',
                },
            ],
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div style={{ minWidth: '300px' }}>
                <MultiSelect
                    label="Select your skills"
                    placeholder="Choose technologies you're familiar with"
                    items={skillOptions}
                    selectedValues={selectedSkills}
                    onChange={(value: string) => {
                        if (selectedSkills.includes(value)) {
                            setSelectedSkills(
                                selectedSkills.filter((v) => v !== value)
                            )
                        } else {
                            setSelectedSkills([...selectedSkills, value])
                        }
                    }}
                    enableSearch={false}
                    size={MultiSelectMenuSize.MEDIUM}
                    variant={MultiSelectVariant.CONTAINER}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    required={true}
                    helpIconHintText="Select all technologies you have experience with"
                    maxHeight={250}
                />
            </div>
        </ComponentPreview>
    )
}

export default MultiSelectPreview

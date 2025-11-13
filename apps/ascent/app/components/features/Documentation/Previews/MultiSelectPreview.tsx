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
        <ComponentPreview ts={tsCode}>
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
                    height={250}
                />
            </div>
        </ComponentPreview>
    )
}

export default MultiSelectPreview

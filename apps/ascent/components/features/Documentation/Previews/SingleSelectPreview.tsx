'use client'
import {
    SingleSelect,
    SelectMenuSize,
    SelectMenuVariant,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SingleSelectPreview = () => {
    const [selectedUser, setSelectedUser] = useState('')

    const tsCode = `import { SingleSelect, SelectMenuSize, SelectMenuVariant } from "@juspay/blend-design-system";
import { useState } from "react";

function MyComponent() {
  const [selectedUser, setSelectedUser] = useState("");

  const teamMembers = [
    {
      groupLabel: "Developers",
      items: [
        {
          label: "Sarah Johnson",
          value: "sarah-johnson",
          subLabel: "Frontend Developer",
        },
        {
          label: "Mike Chen", 
          value: "mike-chen",
          subLabel: "Backend Developer",
        },
      ],
    },
    {
      groupLabel: "Designers",
      items: [
        {
          label: "Alex Rivera",
          value: "alex-rivera", 
          subLabel: "UI/UX Designer",
        },
      ],
    },
  ];

  return (
    <SingleSelect
      label="Assign team member"
      placeholder="Select a team member"
      items={teamMembers}
      selected={selectedUser}
      onSelect={setSelectedUser}
      enableSearch={false}
      size={SelectMenuSize.MEDIUM}
      variant={SelectMenuVariant.CONTAINER}
      required={true}
      helpIconText="Choose a team member to assign this task"
    />
  );
}`

    const reCode = `type selectMenuSize = [#sm | #md | #lg]
type selectMenuVariant = [#container | #noContainer]

@react.component
let make = (
  ~label: option<string>=?,
  ~subLabel: option<string>=?,
  ~hintText: option<string>=?,
  ~required: option<bool>=?,
  ~helpIconText: option<string>=?,
  ~placeholder: option<string>=?,
  ~size: option<selectMenuSize>=?,
  ~items: array<{groupLabel: option<string>, items: array<{label: string, value: string, subLabel: option<string>}>}>,
  ~variant: option<selectMenuVariant>=?,
  ~selected: option<string>=?,
  ~onSelect: option<string => unit>=?,
  ~enableSearch: option<bool>=?,
  ~searchPlaceholder: option<string>=?,
  ~disabled: option<bool>=?,
  ~error: option<bool>=?,
  ~errorMessage: option<string>=?,
) => {
  <SingleSelectBinding
    ?label
    ?subLabel
    ?hintText
    ?required
    ?helpIconText
    ?placeholder
    ?size
    items
    ?variant
    ?selected
    ?onSelect
    ?enableSearch
    ?searchPlaceholder
    ?disabled
    ?error
    ?errorMessage
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~label: string=?,
  ~subLabel: string=?,
  ~hintText: string=?,
  ~required: bool=?,
  ~helpIconText: string=?,
  ~placeholder: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~items: array<{groupLabel: option<string>, items: array<{label: string, value: string, subLabel: option<string>}>}>,
  ~variant: [#container | #noContainer]=?,
  ~selected: string=?,
  ~onSelect: string => unit=?,
  ~enableSearch: bool=?,
  ~searchPlaceholder: string=?,
  ~disabled: bool=?,
  ~error: bool=?,
  ~errorMessage: string=?,
) => React.element = "SingleSelect"`

    const teamMembers = [
        {
            groupLabel: 'Developers',
            items: [
                {
                    label: 'Sarah Johnson',
                    value: 'sarah-johnson',
                    subLabel: 'Frontend Developer',
                },
                {
                    label: 'Mike Chen',
                    value: 'mike-chen',
                    subLabel: 'Backend Developer',
                },
            ],
        },
        {
            groupLabel: 'Designers',
            items: [
                {
                    label: 'Alex Rivera',
                    value: 'alex-rivera',
                    subLabel: 'UI/UX Designer',
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
                <SingleSelect
                    label="Assign team member"
                    placeholder="Select a team member"
                    items={teamMembers}
                    selected={selectedUser}
                    onSelect={setSelectedUser}
                    enableSearch={false}
                    size={SelectMenuSize.MEDIUM}
                    variant={SelectMenuVariant.CONTAINER}
                    required={true}
                    helpIconText="Choose a team member to assign this task"
                    maxMenuHeight={250}
                />
            </div>
        </ComponentPreview>
    )
}

export default SingleSelectPreview

'use client'
import { SearchInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SearchInputV2Preview = () => {
    const tsCode = `import { SearchInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [query, setQuery] = useState('')

    return (
        <SearchInputV2
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={(value) => console.log('Searching:', value)}
            size={InputSizeV2.MD}
            clearable={true}
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (query, setQuery) = React.useState(() => "")

  <SearchInputV2Binding
    placeholder="Search products..."
    value={query}
    onChange={e => setQuery(ReactEvent.Form.target(e)["value"])}
    onSearch={value => Console.log(value)}
    size=#md
    clearable={true}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~onSearch: string => unit=?,
  ~placeholder: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~clearable: bool=?,
  ~loading: bool=?,
) => React.element = "SearchInputV2"`

    const [query, setQuery] = useState('')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <SearchInputV2
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={(value) => console.log('Searching:', value)}
                    size={InputSizeV2.MD}
                    clearable={true}
                />
            </div>
        </ComponentPreview>
    )
}

export default SearchInputV2Preview

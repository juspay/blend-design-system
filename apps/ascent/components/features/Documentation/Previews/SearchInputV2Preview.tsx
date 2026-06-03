'use client'

import React, { useState } from 'react'
import { SearchInputV2 } from '@juspay/blend-design-system'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SearchInputV2Preview = () => {
    const tsCode = `import { SearchInputV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [query, setQuery] = useState('')

    return (
        <SearchInputV2
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (query, setQuery) = React.useState(() => "")

  <SearchInputV2Binding
    placeholder="Search products..."
    value={query}
    onChange={e =>
      setQuery(ReactEvent.Form.target(e)["value"])
    }
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~placeholder: string=?,
  ~allowClear: bool=?,
  ~onClear: unit => unit=?,
  ~clearIcon: React.element=?,
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~error: bool=?,
  ~disabled: bool=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
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
                />
            </div>
        </ComponentPreview>
    )
}

export default SearchInputV2Preview

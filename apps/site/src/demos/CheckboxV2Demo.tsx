import { useState } from 'react'
import CheckboxV2 from '../../../../packages/blend/lib/components/CheckboxV2/CheckboxV2'
const CheckboxV2Demo = () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
    const handleCheckedChange = (checked: boolean | 'indeterminate') => {
        setChecked(checked as boolean | 'indeterminate')
    }
    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">CheckboxV2 Playground</h2>
            <CheckboxV2
                checked={checked}
                onCheckedChange={(checked: boolean | 'indeterminate') => {
                    handleCheckedChange(checked)
                }}
            />
        </div>
    )
}

export default CheckboxV2Demo

import { useState } from 'react'
import { TextInput } from '../../../Inputs'
import { Mail } from 'lucide-react'

const TextInputLightHouse = () => {
    const [value, setValue] = useState('')
    const [filledValue, setFilledValue] = useState('Test Accessibility')
    return (
        <div className="flex flex-col gap-4">
            {/* Basic Input */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                sublabel="This is a sublabel"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                sublabel="This is a sublabel"
                value={filledValue}
                onChange={(e) => setFilledValue(e.target.value)}
            />
            {/* Input with Left Slot */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftSlot={<Mail size={16} />}
            />
            {/* Input with Right Slot */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rightSlot={<Mail size={16} />}
            />
            {/* Input with Both Slots */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftSlot={<Mail size={16} />}
                rightSlot={<Mail size={16} />}
            />
            {/* Input with Error */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={true}
                errorMessage="This is an error message"
            />
            {/* Input with Hint Text */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                hintText="This is a hint text"
            />
            {/* Input with Help Icon Hint Text */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                helpIconHintText="This is help text for the input"
            />
            {/* Input with Disabled */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={true}
            />
            {/* Input with Required */}
            <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={true}
            />
        </div>
    )
}

export default TextInputLightHouse

import { Heart } from 'lucide-react'
import { Radio, RadioSize } from '../../../packages/blend/lib/main'

function App() {
    return (
        <main className="w-screen min-h-screen bg-white flex items-center justify-center flex-col gap-4">
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={true}
                // disabled={true}
                // error={true}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={true}
                disabled={true}
                // error={true}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={true}
                disabled={true}
                error={true}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={true}
                // disabled={true}
                // error={true}
                required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={true}
                value="radio"
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                checked={true}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                checked={false}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={true}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
            <Radio
                size={RadioSize.MEDIUM}
                name="radio"
                defaultChecked={false}
                // required={true}
                subtext="This is a subtext"
                slot={<Heart size={16} className="text-red-500" />}
            >
                Radio
            </Radio>
        </main>
    )
}

export default App

import { KeyValuePair } from '../../../../packages/blend/lib/components/KeyValuePair'

const KeyValuePairDemo = () => {
    return (
        <KeyValuePair
            keyString="abcd"
            value="1234"
            keySlot={<p>Hi</p>}
            valueLeftSlot={<p>Hi</p>}
            valueRightSlot={<p>Hi</p>}
        />
    )
}

export default KeyValuePairDemo

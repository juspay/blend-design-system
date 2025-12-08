import {
    Button,
    ButtonSize,
    ButtonState,
    ButtonSubType,
    ButtonType,
} from '../../../Button'
import { ButtonGroup } from '../../../ButtonGroup'

const ButtonLightHouse = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.DANGER}
                size={ButtonSize.MEDIUM}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.SUCCESS}
                size={ButtonSize.MEDIUM}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            {/* All Button SubTypes */}
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                subType={ButtonSubType.DEFAULT}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                subType={ButtonSubType.ICON_ONLY}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                subType={ButtonSubType.INLINE}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            {/* All Button States */}

            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                state={ButtonState.DEFAULT}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                state={ButtonState.HOVER}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                state={ButtonState.ACTIVE}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                state={ButtonState.DISABLED}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />

            {/* All button disabled */}
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                disabled={true}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />

            {/* All button loading */}
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                loading={true}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />

            {/* All button sizes */}

            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.LARGE}
                text="Click me"
                onClick={() => {
                    console.log('Button clicked')
                }}
            />

            {/* ALl button groups */}

            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Click me"
                    onClick={() => {
                        console.log('Button clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Click me"
                    onClick={() => {
                        console.log('Button clicked')
                    }}
                />
            </ButtonGroup>
        </div>
    )
}

export default ButtonLightHouse

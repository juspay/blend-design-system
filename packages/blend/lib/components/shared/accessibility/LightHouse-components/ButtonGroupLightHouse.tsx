import { ButtonGroup } from '../../../ButtonGroup'
import { Button, ButtonType, ButtonSize } from '../../../Button'

const ButtonGroupLightHouse = () => {
    return (
        <>
            {/* Horizontal Button Group - Two Buttons */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 1"
                    onClick={() => {
                        console.log('Button 1 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 2"
                    onClick={() => {
                        console.log('Button 2 clicked')
                    }}
                />
            </ButtonGroup>

            {/* Horizontal Button Group - Three Buttons */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Primary"
                    onClick={() => {
                        console.log('Primary clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Secondary"
                    onClick={() => {
                        console.log('Secondary clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.DANGER}
                    size={ButtonSize.MEDIUM}
                    text="Danger"
                    onClick={() => {
                        console.log('Danger clicked')
                    }}
                />
            </ButtonGroup>

            {/* Horizontal Button Group - Four Buttons */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 1"
                    onClick={() => {
                        console.log('Button 1 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 2"
                    onClick={() => {
                        console.log('Button 2 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SUCCESS}
                    size={ButtonSize.MEDIUM}
                    text="Button 3"
                    onClick={() => {
                        console.log('Button 3 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.DANGER}
                    size={ButtonSize.MEDIUM}
                    text="Button 4"
                    onClick={() => {
                        console.log('Button 4 clicked')
                    }}
                />
            </ButtonGroup>

            {/* Horizontal Button Group - Different Sizes */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                    text="Small"
                    onClick={() => {
                        console.log('Small clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Medium"
                    onClick={() => {
                        console.log('Medium clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.LARGE}
                    text="Large"
                    onClick={() => {
                        console.log('Large clicked')
                    }}
                />
            </ButtonGroup>

            {/* Stacked Button Group - Two Buttons */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 1"
                    onClick={() => {
                        console.log('Button 1 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 2"
                    onClick={() => {
                        console.log('Button 2 clicked')
                    }}
                />
            </ButtonGroup>

            {/* Stacked Button Group - Three Buttons */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Primary"
                    onClick={() => {
                        console.log('Primary clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Secondary"
                    onClick={() => {
                        console.log('Secondary clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.DANGER}
                    size={ButtonSize.MEDIUM}
                    text="Danger"
                    onClick={() => {
                        console.log('Danger clicked')
                    }}
                />
            </ButtonGroup>

            {/* Stacked Button Group - Four Buttons */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 1"
                    onClick={() => {
                        console.log('Button 1 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Button 2"
                    onClick={() => {
                        console.log('Button 2 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SUCCESS}
                    size={ButtonSize.MEDIUM}
                    text="Button 3"
                    onClick={() => {
                        console.log('Button 3 clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.DANGER}
                    size={ButtonSize.MEDIUM}
                    text="Button 4"
                    onClick={() => {
                        console.log('Button 4 clicked')
                    }}
                />
            </ButtonGroup>

            {/* Stacked Button Group - Different Sizes */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                    text="Small"
                    onClick={() => {
                        console.log('Small clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Medium"
                    onClick={() => {
                        console.log('Medium clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.LARGE}
                    text="Large"
                    onClick={() => {
                        console.log('Large clicked')
                    }}
                />
            </ButtonGroup>

            {/* Horizontal Button Group - With Disabled */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Enabled"
                    onClick={() => {
                        console.log('Enabled clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Disabled"
                    disabled={true}
                    onClick={() => {
                        console.log('Disabled clicked')
                    }}
                />
            </ButtonGroup>

            {/* Stacked Button Group - With Disabled */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Enabled"
                    onClick={() => {
                        console.log('Enabled clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Disabled"
                    disabled={true}
                    onClick={() => {
                        console.log('Disabled clicked')
                    }}
                />
            </ButtonGroup>

            {/* Horizontal Button Group - With Loading */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Normal"
                    onClick={() => {
                        console.log('Normal clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Loading"
                    loading={true}
                    onClick={() => {
                        console.log('Loading clicked')
                    }}
                />
            </ButtonGroup>

            {/* Stacked Button Group - With Loading */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Normal"
                    onClick={() => {
                        console.log('Normal clicked')
                    }}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text="Loading"
                    loading={true}
                    onClick={() => {
                        console.log('Loading clicked')
                    }}
                />
            </ButtonGroup>

            {/* Single Button in Group */}
            <ButtonGroup>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Single Button"
                    onClick={() => {
                        console.log('Single button clicked')
                    }}
                />
            </ButtonGroup>

            {/* Single Button in Stacked Group */}
            <ButtonGroup stacked={true}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Single Button"
                    onClick={() => {
                        console.log('Single button clicked')
                    }}
                />
            </ButtonGroup>
        </>
    )
}

export default ButtonGroupLightHouse

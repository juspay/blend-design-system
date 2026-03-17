import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/types'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'

export type MultiSelectV2MenuActionsProps = {
    tokens: MultiSelectV2TokensType
    primaryAction?: {
        text: string
        onClick: (selectedValues: string[]) => void
        disabled?: boolean
        loading?: boolean
    }
    secondaryAction?: {
        text: string
        onClick: () => void
        disabled?: boolean
        loading?: boolean
    }
    selected: string[]
    onClose: () => void
}

const MultiSelectV2MenuActions = ({
    tokens,
    primaryAction,
    secondaryAction,
    selected,
    onClose,
}: MultiSelectV2MenuActionsProps) => {
    const actions = tokens.menu?.actions ?? {}
    return (
        <Block
            style={{
                paddingTop: actions.paddingTop,
                paddingRight: actions.paddingRight,
                paddingBottom: actions.paddingBottom,
                paddingLeft: actions.paddingLeft,
            }}
            display="flex"
            alignItems="center"
            gap={actions.gap}
            justifyContent="flex-end"
            margin={0}
            flexShrink={0}
            backgroundColor={actions.backgroundColor}
            borderTop={actions.borderTop}
        >
            {secondaryAction && (
                <Button
                    data-button-for={secondaryAction.text}
                    data-dynamic-button={secondaryAction.text}
                    data-batch-value={secondaryAction.text}
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    text={secondaryAction.text}
                    onClick={() => {
                        secondaryAction.onClick()
                        requestAnimationFrame(onClose)
                    }}
                    disabled={secondaryAction.disabled}
                    loading={secondaryAction.loading}
                />
            )}
            {primaryAction && (
                <Button
                    data-button-for={primaryAction.text}
                    data-dynamic-button={primaryAction.text}
                    data-batch-value={primaryAction.text}
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                    text={primaryAction.text}
                    onClick={() => {
                        primaryAction.onClick(selected)
                        requestAnimationFrame(onClose)
                    }}
                    disabled={primaryAction.disabled}
                    loading={primaryAction.loading}
                />
            )}
        </Block>
    )
}

MultiSelectV2MenuActions.displayName = 'MultiSelectV2MenuActions'

export default MultiSelectV2MenuActions

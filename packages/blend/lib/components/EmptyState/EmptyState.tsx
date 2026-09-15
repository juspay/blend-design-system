import { forwardRef, isValidElement, useId, type ReactNode } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ButtonV2, ButtonV2Size, ButtonV2Type } from '../ButtonV2'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { EmptyStateTokensType } from './emptyState.tokens.types'
import type {
    EmptyStateAction,
    EmptyStateActionConfig,
    EmptyStateProps,
} from './types'

const isActionConfig = (
    action: EmptyStateAction
): action is EmptyStateActionConfig => {
    return (
        typeof action === 'object' &&
        action !== null &&
        !isValidElement(action) &&
        'label' in action &&
        typeof action.label === 'string' &&
        'onClick' in action &&
        typeof action.onClick === 'function'
    )
}

const buttonSizeMap: Record<
    NonNullable<EmptyStateProps['size']>,
    ButtonV2Size
> = {
    sm: ButtonV2Size.SMALL,
    md: ButtonV2Size.MEDIUM,
    lg: ButtonV2Size.LARGE,
}

const renderAction = (
    action: EmptyStateAction | undefined,
    buttonType: ButtonV2Type,
    size: NonNullable<EmptyStateProps['size']>
): ReactNode => {
    if (action === undefined || action === null || action === false) {
        return null
    }

    if (isActionConfig(action)) {
        return (
            <ButtonV2
                buttonType={buttonType}
                size={buttonSizeMap[size]}
                text={action.label}
                onClick={action.onClick}
            />
        )
    }

    return action
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
    (
        {
            illustration,
            title,
            description,
            primaryAction,
            secondaryAction,
            size = 'md',
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<EmptyStateTokensType>('EMPTY_STATE')
        const headingId = useId()
        const sizeTokens = tokens[size]
        const hasActions = [primaryAction, secondaryAction].some(
            (action) => action != null && action !== false
        )

        return (
            <Block
                ref={ref}
                {...rest}
                as="section"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                minHeight={sizeTokens.layout.minHeight}
                maxWidth={sizeTokens.layout.maxWidth}
                padding={sizeTokens.layout.padding}
                gap={sizeTokens.layout.gap}
                textAlign="center"
                aria-labelledby={headingId}
                data-empty-state
                data-empty-state-size={size}
            >
                {illustration != null && (
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        data-element="illustration"
                    >
                        {illustration}
                    </Block>
                )}

                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    gap={sizeTokens.layout.contentGap}
                >
                    <Text
                        id={headingId}
                        as="h2"
                        fontSize={sizeTokens.title.fontSize}
                        lineHeight={sizeTokens.title.lineHeight}
                        fontWeight={sizeTokens.title.fontWeight}
                        color={sizeTokens.title.color}
                        textAlign="center"
                        margin={0}
                    >
                        {title}
                    </Text>

                    {description != null && (
                        <Block
                            as="div"
                            width="100%"
                            fontSize={sizeTokens.description.fontSize}
                            lineHeight={sizeTokens.description.lineHeight}
                            color={sizeTokens.description.color}
                            textAlign="center"
                        >
                            {description}
                        </Block>
                    )}
                </Block>

                {hasActions && (
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={sizeTokens.layout.actionGap}
                        data-element="actions"
                    >
                        {renderAction(
                            primaryAction,
                            ButtonV2Type.PRIMARY,
                            size
                        )}
                        {renderAction(
                            secondaryAction,
                            ButtonV2Type.SECONDARY,
                            size
                        )}
                    </Block>
                )}
            </Block>
        )
    }
)

EmptyState.displayName = 'EmptyState'

export default EmptyState

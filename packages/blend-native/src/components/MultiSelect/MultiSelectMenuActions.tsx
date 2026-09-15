import { memo } from 'react'
import { type MultiSelectV2TokensType } from '@juspay/blend-design-system/node'
import { Block } from '../../primitives/Block'
import { Button } from '../Button'
import type { MultiSelectAction } from './multiSelect.types'

/**
 * Footer actions for the MultiSelect dropdown: primary + secondary buttons.
 */
export type MultiSelectMenuActionsProps = {
    primaryAction?: MultiSelectAction & {
        onClick: (selectedValues: string[]) => void
    }
    secondaryAction?: MultiSelectAction
    tokens: MultiSelectV2TokensType
    selectedValues: string[]
    testID?: string
}

function MultiSelectMenuActionsImpl({
    primaryAction,
    secondaryAction,
    tokens,
    selectedValues,
    testID,
}: MultiSelectMenuActionsProps) {
    const actionsTokens = tokens.menu.actions
    if (!primaryAction && !secondaryAction) return null

    return (
        <Block
            flexDirection="row"
            alignItems="center"
            gap={actionsTokens.gap}
            width="100%"
            background={String(actionsTokens.backgroundColor)}
            border={String(actionsTokens.borderTop)}
            paddingTop={actionsTokens.paddingTop}
            paddingRight={actionsTokens.paddingRight}
            paddingBottom={actionsTokens.paddingBottom}
            paddingLeft={actionsTokens.paddingLeft}
            testID={testID}
        >
            {secondaryAction ? (
                <Button
                    text={secondaryAction.text}
                    onPress={() => secondaryAction.onClick()}
                    disabled={secondaryAction.disabled}
                    loading={secondaryAction.loading}
                />
            ) : null}
            {primaryAction ? (
                <Button
                    text={primaryAction.text}
                    onPress={() => primaryAction.onClick(selectedValues)}
                    disabled={primaryAction.disabled}
                    loading={primaryAction.loading}
                />
            ) : null}
        </Block>
    )
}

export const MultiSelectMenuActions = memo(MultiSelectMenuActionsImpl)
MultiSelectMenuActions.displayName = 'MultiSelectMenuActions'

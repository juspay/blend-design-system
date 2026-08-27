import {
    InputSizeV2,
    type InputFooterV2Tokens,
} from '@juspay/blend-design-system/node'
import { Block } from '../../../primitives/Block'
import { Text } from '../../../primitives/Text'
import { useLiveRegionAnnounce } from '../../../a11y/useLiveRegion'
import type { FieldError } from './fieldState'

/**
 * Footer under a field: the error message when erroring, else the hint.
 *
 * Ports web's `InputFooterV2` against the same `bottomContainer` token
 * shape. Web marks the error `role="alert"` + `aria-live="polite"`; the
 * native split is the Alert pattern — `accessibilityLiveRegion` for
 * Android, an imperative announcement for iOS.
 */

export type FieldFooterProps = {
    error?: FieldError
    hintText?: string
    size?: InputSizeV2
    tokens: InputFooterV2Tokens
    testID?: string
}

export function FieldFooter({
    error,
    hintText,
    size = InputSizeV2.SM,
    tokens,
    testID,
}: FieldFooterProps) {
    const showError = Boolean(error?.show && error.message)

    useLiveRegionAnnounce(showError ? error?.message : undefined, showError)

    if (!showError && !hintText) return null

    return (
        <Block width="100%" testID={testID}>
            {showError ? (
                <Text
                    accessibilityLiveRegion="polite"
                    color={String(tokens.errorMessage.color)}
                    fontSize={tokens.errorMessage.fontSize[size]}
                    fontWeight={tokens.errorMessage.fontWeight[size]}
                    lineHeight={tokens.errorMessage.lineHeight[size]}
                >
                    {error?.message}
                </Text>
            ) : (
                <Text
                    color={String(tokens.hintText.color.default)}
                    fontSize={tokens.hintText.fontSize[size]}
                    fontWeight={tokens.hintText.fontWeight[size]}
                    lineHeight={tokens.hintText.lineHeight[size]}
                >
                    {hintText}
                </Text>
            )}
        </Block>
    )
}

FieldFooter.displayName = 'FieldFooter'

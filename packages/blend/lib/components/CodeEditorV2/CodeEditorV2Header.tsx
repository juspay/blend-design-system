import { useId } from 'react'
import { Check, Copy } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import type { CodeEditorV2Tokens } from './codeEditorV2.tokens'
import { CodeEditorV2HeaderProps } from './codeEditorV2.types'

function formatHeaderSpacing(value: string | number | undefined): string {
    if (value === undefined || value === null) {
        return '0'
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        return `${value}px`
    }
    return String(value)
}

/** Lucide `size` expects a number; mirror CodeEditor header parsing. */
function headerIconWidthToPx(
    width: CodeEditorV2Tokens['header']['icon']['width']
): number {
    if (typeof width === 'number' && Number.isFinite(width)) {
        return width
    }
    const parsed = parseInt(String(width ?? '16'), 10)
    return Number.isFinite(parsed) ? parsed : 16
}

export const CodeEditorV2Header = ({
    title,
    leftSlot,
    rightSlot,
    showCopyButton,
    isCopied,
    onCopy,
    tokens,
}: CodeEditorV2HeaderProps) => {
    const titleId = useId()
    const headerLabel = title?.trim()

    const headerPadding = [
        formatHeaderSpacing(tokens.header.paddingTop),
        formatHeaderSpacing(tokens.header.paddingRight),
        formatHeaderSpacing(tokens.header.paddingBottom),
        formatHeaderSpacing(tokens.header.paddingLeft),
    ].join(' ')

    const headerGap =
        typeof tokens.header.gap === 'number'
            ? `${tokens.header.gap}px`
            : tokens.header.gap

    const headerIconPx = headerIconWidthToPx(tokens.header.icon.width)

    return (
        <Block
            as="header"
            {...(headerLabel
                ? { 'aria-labelledby': titleId }
                : { 'aria-label': 'Code editor header' })}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={headerPadding}
            backgroundColor={tokens.header.backgroundColor}
            borderBottom={tokens.header.borderBottom}
        >
            <Block
                display="flex"
                alignItems="center"
                gap={headerGap}
                style={{ flex: 1 }}
            >
                {leftSlot ? leftSlot : null}
                <Block
                    data-element="codeeditor-title"
                    data-id={title}
                    as="span"
                    id={headerLabel ? titleId : undefined}
                    fontSize={tokens.header.text.fontSize}
                    fontWeight={tokens.header.text.fontWeight}
                    lineHeight={tokens.header.text.lineHeight}
                    color={tokens.header.text.color}
                    style={{
                        letterSpacing: '-0.01em',
                    }}
                >
                    {title}
                </Block>
                {rightSlot && (
                    <Block
                        style={{ flexShrink: 0 }}
                        display="flex"
                        alignItems="center"
                    >
                        {rightSlot}
                    </Block>
                )}
            </Block>

            {showCopyButton && (
                <Button
                    data-element="copy-button"
                    type="button"
                    onClick={onCopy}
                    aria-label={isCopied ? 'Copied' : 'Copy code'}
                    title={isCopied ? 'Copied' : 'Copy code'}
                    buttonType={ButtonType.SECONDARY}
                    subType={ButtonSubType.ICON_ONLY}
                    size={ButtonSize.SMALL}
                    leadingIcon={
                        isCopied ? (
                            <Check size={headerIconPx} />
                        ) : (
                            <Copy size={headerIconPx} />
                        )
                    }
                />
            )}
        </Block>
    )
}

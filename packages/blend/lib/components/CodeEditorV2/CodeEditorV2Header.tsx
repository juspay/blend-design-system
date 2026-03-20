import { useId } from 'react'
import { Check, Copy, FileCode } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import { CodeEditorV2HeaderProps } from './codeEditorV2.types'

export const CodeEditorV2Header = ({
    header,
    headerLeftSlot,
    headerRightSlot,
    showLeftIcon,
    showCopyButton,
    isCopied,
    onCopy,
    tokens,
}: CodeEditorV2HeaderProps) => {
    const titleId = useId()
    const headerLabel = header.trim()

    const headerPaddingX =
        typeof tokens.header.paddingLeft === 'number'
            ? `${tokens.header.paddingLeft}px`
            : tokens.header.paddingLeft

    const headerPaddingY =
        typeof tokens.header.paddingBottom === 'number'
            ? `${tokens.header.paddingBottom}px`
            : tokens.header.paddingBottom

    const headerGap =
        typeof tokens.header.gap === 'number'
            ? `${tokens.header.gap}px`
            : tokens.header.gap

    const iconSize =
        typeof tokens.header.icon.width === 'number'
            ? tokens.header.icon.width
            : String(tokens.header.icon.width || '16')
    return (
        <Block
            as="header"
            {...(headerLabel
                ? { 'aria-labelledby': titleId }
                : { 'aria-label': 'Code editor header' })}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={`${headerPaddingY} ${headerPaddingX}`}
            backgroundColor={tokens.header.backgroundColor}
            borderBottom={tokens.header.borderBottom}
        >
            <Block
                display="flex"
                alignItems="center"
                gap={headerGap}
                style={{ flex: 1 }}
            >
                {headerLeftSlot ? (
                    headerLeftSlot
                ) : showLeftIcon ? (
                    <FileCode
                        size={iconSize}
                        style={{
                            flexShrink: 0,
                            color: tokens.header.text.color,
                            opacity: 0.7,
                        }}
                    />
                ) : null}
                <Block
                    data-element="codeeditor-title"
                    data-id={header}
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
                    {header}
                </Block>
                {headerRightSlot && (
                    <Block
                        style={{ flexShrink: 0 }}
                        display="flex"
                        alignItems="center"
                    >
                        {headerRightSlot}
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
                        isCopied ? <Check size={14} /> : <Copy size={14} />
                    }
                />
            )}
        </Block>
    )
}

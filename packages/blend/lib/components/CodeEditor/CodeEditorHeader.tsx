import { Check, Copy, FileCode } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import type { CodeBlockTokenType } from '../CodeBlock/codeBlock.token'
import type { ReactNode } from 'react'

type CodeEditorHeaderProps = {
    header: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    showLeftIcon: boolean
    showCopyButton: boolean
    isCopied: boolean
    onCopy: () => void
    tokens: CodeBlockTokenType
}

export const CodeEditorHeader = ({
    header,
    headerLeftSlot,
    headerRightSlot,
    showLeftIcon,
    showCopyButton,
    isCopied,
    onCopy,
    tokens,
}: CodeEditorHeaderProps) => {
    const headerPaddingX =
        typeof tokens.header.padding.x === 'number'
            ? `${tokens.header.padding.x}px`
            : tokens.header.padding.x

    const headerPaddingY =
        typeof tokens.header.padding.y === 'number'
            ? `${tokens.header.padding.y}px`
            : tokens.header.padding.y

    const headerGap =
        typeof tokens.header.gap === 'number'
            ? `${tokens.header.gap}px`
            : tokens.header.gap

    const iconSize =
        typeof tokens.header.icon.width === 'number'
            ? tokens.header.icon.width
            : parseInt(String(tokens.header.icon.width || '16'))
    return (
        <Block
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
                <Block
                    style={{
                        opacity: 0.7,
                        transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.opacity = '1'
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.opacity = '0.7'
                    }}
                >
                    <Button
                        data-element="copy-button"
                        type="button"
                        onClick={onCopy}
                        buttonType={ButtonType.SECONDARY}
                        subType={ButtonSubType.ICON_ONLY}
                        size={ButtonSize.SMALL}
                        leadingIcon={
                            isCopied ? <Check size={14} /> : <Copy size={14} />
                        }
                    />
                </Block>
            )}
        </Block>
    )
}

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
    showCopyButton: boolean
    isCopied: boolean
    onCopy: () => void
    tokens: CodeBlockTokenType
}

export const CodeEditorHeader = ({
    header,
    headerLeftSlot,
    headerRightSlot,
    showCopyButton,
    isCopied,
    onCopy,
    tokens,
}: CodeEditorHeaderProps) => {
    return (
        <Block
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="10px 16px"
            backgroundColor={tokens.header.backgroundColor}
            borderBottom={tokens.header.borderBottom}
            style={{ minHeight: '44px' }}
        >
            <Block
                display="flex"
                alignItems="center"
                gap="8px"
                style={{ flex: 1 }}
            >
                {headerLeftSlot || (
                    <FileCode
                        size={16}
                        style={{
                            flexShrink: 0,
                            color: tokens.header.text.color,
                            opacity: 0.7,
                        }}
                    />
                )}
                <Block
                    as="span"
                    fontSize="13px"
                    fontWeight="500"
                    color={tokens.header.text.color}
                    style={{
                        fontFamily:
                            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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

            {/* Right side: Copy button */}
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

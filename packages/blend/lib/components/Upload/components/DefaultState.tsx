import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Button, ButtonType, ButtonSize } from '../../Button'
import type { UploadTokenType } from '../upload.tokens'

type DefaultStateProps = {
    children?: React.ReactNode
    description?: string
    disabled: boolean
    uploadTokens: UploadTokenType
}

const DefaultState: React.FC<DefaultStateProps> = ({
    children,
    description,
    disabled,
    uploadTokens,
}) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.content.slot.gap}
    >
        {children && (
            <Block
                width={uploadTokens.container.content.slot.width}
                height={uploadTokens.container.content.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadTokens.container.content.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.title.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.title.fontWeight
                }
                color={uploadTokens.container.content.text.title.color}
                textAlign="center"
            >
                Choose a file or drag & drop it here
            </Text>

            {description && (
                <Text
                    as="span"
                    fontSize={
                        uploadTokens.container.content.text.subtitle.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.subtitle.fontWeight
                    }
                    color={uploadTokens.container.content.text.subtitle.color}
                    textAlign="center"
                >
                    {description}
                </Text>
            )}
        </Block>

        <Block gap={uploadTokens.container.content.actionable.gap}>
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                text="Browse Files"
                disabled={disabled}
            />
        </Block>
    </Block>
)

DefaultState.displayName = 'DefaultState'

export default DefaultState

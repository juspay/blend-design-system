import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Button, ButtonType, ButtonSize } from '../../Button'
import type { UploadTokenType } from '../upload.tokens'
import { UPLOAD_MESSAGES } from '../../../i18n/catalog/upload.messages'
import { useMessages } from '../../../i18n/useMessages'

type DefaultStateProps = {
    children?: React.ReactNode
    description?: string
    disabled: boolean
    uploadTokens: UploadTokenType
    browseFilesText?: string
}

const DefaultState: React.FC<DefaultStateProps> = ({
    children,
    description,
    disabled,
    uploadTokens,
    browseFilesText,
}) => {
    const { m, pick } = useMessages(UPLOAD_MESSAGES)
    return (
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
                data-element="content"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={uploadTokens.container.content.text.gap}
            >
                <Text
                    as="span"
                    fontSize={
                        uploadTokens.container.content.text.title.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.title.fontWeight
                    }
                    color={uploadTokens.container.content.text.title.color}
                    textAlign="center"
                >
                    {m('upload.label.drop-hint')}
                </Text>

                {description && (
                    <Text
                        as="span"
                        fontSize={
                            uploadTokens.container.content.text.subtitle
                                .fontSize
                        }
                        fontWeight={
                            uploadTokens.container.content.text.subtitle
                                .fontWeight
                        }
                        color={
                            uploadTokens.container.content.text.subtitle.color
                        }
                        textAlign="center"
                        aria-hidden="true"
                    >
                        {description}
                    </Text>
                )}
            </Block>

            <Block gap={uploadTokens.container.content.actionable.gap}>
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    text={pick(browseFilesText, 'upload.action.browse-files')}
                    disabled={disabled}
                    onClick={(e) => {
                        if (e) {
                            e.stopPropagation()
                            const uploadContainer =
                                e.currentTarget.closest('[data-upload]')
                            if (uploadContainer) {
                                const fileInput = uploadContainer.querySelector(
                                    'input[type="file"]'
                                ) as HTMLInputElement
                                fileInput?.click()
                            }
                        }
                    }}
                />
            </Block>
        </Block>
    )
}

DefaultState.displayName = 'DefaultState'

export default DefaultState

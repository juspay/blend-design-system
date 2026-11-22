import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { ProgressBar, ProgressBarSize } from '../../ProgressBar'
import type { UploadTokenType } from '../upload.tokens'
import { FOUNDATION_THEME } from '../../../tokens'
import { UPLOAD_MESSAGES } from '../../../i18n/catalog/upload.messages'
import { useMessages } from '../../../i18n/useMessages'

type UploadingStateProps = {
    uploadingFile: { file: File; progress: number }
    children?: React.ReactNode
    description?: string
    uploadTokens: UploadTokenType
}

/**
 * Sentinel standing in for the `{name}` slot while the sentence is resolved.
 *
 * The filename renders in a different colour from the sentence around it, so
 * the message cannot simply be interpolated into one string — but it must not
 * be concatenated either (`'Uploading ' + name + '...'` fixes English word
 * order). Resolving with a sentinel and splitting on it keeps the translator
 * in control of both word order and the quotation marks, which differ by
 * language, while the styled span still wraps only the name.
 *
 * NUL cannot occur in a filename on any supported platform.
 */
const NAME_SLOT = '\u0000'

const UploadingState: React.FC<UploadingStateProps> = ({
    uploadingFile,
    children,
    description,
    uploadTokens,
}) => {
    const { m } = useMessages(UPLOAD_MESSAGES)

    const [beforeName, afterName = ''] = m('upload.status.uploading-named', {
        name: NAME_SLOT,
    }).split(NAME_SLOT)

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
                    {beforeName}
                    <Text
                        as="span"
                        fontSize={
                            uploadTokens.container.content.text.title.fontSize
                        }
                        fontWeight={
                            uploadTokens.container.content.text.title.fontWeight
                        }
                        color={FOUNDATION_THEME.colors.primary[600]}
                    >
                        {uploadingFile.file.name}
                    </Text>
                    {afterName}
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
                    >
                        {description}
                    </Text>
                )}
            </Block>

            <Block
                width="100%"
                gap={uploadTokens.container.content.actionable.gap}
                role="progressbar"
                aria-valuenow={uploadingFile.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={m('upload.a11y.uploading-progress', {
                    name: uploadingFile.file.name,
                    progress: String(uploadingFile.progress),
                })}
            >
                <ProgressBar
                    value={uploadingFile.progress}
                    size={ProgressBarSize.SMALL}
                    showLabel={false}
                />
            </Block>
        </Block>
    )
}

UploadingState.displayName = 'UploadingState'

export default UploadingState

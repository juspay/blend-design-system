import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { ProgressBar, ProgressBarSize } from '../../ProgressBar'
import type { UploadTokenType } from '../upload.tokens'
import { FOUNDATION_THEME } from '../../../tokens'

type UploadingStateProps = {
    uploadingFile: { file: File; progress: number }
    children?: React.ReactNode
    description?: string
    uploadTokens: UploadTokenType
}

const UploadingState: React.FC<UploadingStateProps> = ({
    uploadingFile,
    children,
    description,
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
            data-element="content"
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
                Uploading{' '}
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
                    '{uploadingFile.file.name}'
                </Text>
                ...
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

        <Block width="100%" gap={uploadTokens.container.content.actionable.gap}>
            <ProgressBar
                value={uploadingFile.progress}
                size={ProgressBarSize.SMALL}
                showLabel={false}
            />
        </Block>
    </Block>
)

UploadingState.displayName = 'UploadingState'

export default UploadingState

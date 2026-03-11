import { CircleHelp } from 'lucide-react'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Tooltip } from '../Tooltip'
import type { StatCardV2TitleProps } from './statcardV2.types'

const StatCardV2Title = ({
    title,
    helpIconText,
    tokens,
}: StatCardV2TitleProps) => (
    <Block
        display="flex"
        alignItems="center"
        gap={tokens.topContainer.dataContainer.titleContainer.gap}
    >
        <Text
            fontSize={
                tokens.topContainer.dataContainer.titleContainer.title.fontSize
            }
            fontWeight={
                tokens.topContainer.dataContainer.titleContainer.title
                    .fontWeight
            }
            lineHeight={addPxToValue(
                tokens.topContainer.dataContainer.titleContainer.title
                    .lineHeight
            )}
            color={tokens.topContainer.dataContainer.titleContainer.title.color}
        >
            {title}
        </Text>
        {helpIconText && (
            <Block
                data-element="help-icon"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Tooltip content={helpIconText}>
                    <Block
                        as="span"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        role="button"
                        tabIndex={0}
                        aria-label={helpIconText || `Help for ${title}`}
                    >
                        <CircleHelp
                            width={
                                tokens.topContainer.dataContainer.titleContainer
                                    .helpIcon.width
                            }
                            height={
                                tokens.topContainer.dataContainer.titleContainer
                                    .helpIcon.width
                            }
                            color={
                                tokens.topContainer.dataContainer.titleContainer
                                    .helpIcon.color.default
                            }
                            aria-hidden="true"
                        />
                    </Block>
                </Tooltip>
            </Block>
        )}
    </Block>
)

export default StatCardV2Title

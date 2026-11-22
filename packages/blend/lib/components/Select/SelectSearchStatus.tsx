import { LoaderCircle } from 'lucide-react'
import type { CSSProperties } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { FOUNDATION_THEME } from '../../tokens'
import { SELECT_MESSAGES } from '../../i18n/catalog/select.messages'
import { useMessages } from '../../i18n/useMessages'

type SelectSearchStatusProps = {
    isControlled: boolean
    isLoading: boolean
    isEmpty: boolean
    emptyStateText: string
}

export const SELECT_SEARCH_STATUS_HEIGHT = 36

const visuallyHiddenStyle: CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
}

const SelectSearchStatus = ({
    isControlled,
    isLoading,
    isEmpty,
    emptyStateText,
}: SelectSearchStatusProps) => {
    // Above the early return: hooks must run on every render.
    const { m } = useMessages(SELECT_MESSAGES)
    if (!isControlled && !isLoading) return null

    const announcement = isLoading
        ? m('select.a11y.searching')
        : isEmpty
          ? emptyStateText
          : m('select.a11y.results-updated')

    return (
        <>
            {isLoading && (
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={FOUNDATION_THEME.unit[4]}
                    paddingX={FOUNDATION_THEME.unit[8]}
                    height={SELECT_SEARCH_STATUS_HEIGHT}
                    flexShrink={0}
                    aria-hidden="true"
                    data-element="search-loading"
                >
                    <LoaderCircle
                        size={16}
                        color={FOUNDATION_THEME.colors.gray[600]}
                        style={{ animation: 'spin 1s linear infinite' }}
                    />
                    <Text
                        as="span"
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.gray[600]}
                    >
                        {m('select.status.searching')}
                    </Text>
                </Block>
            )}
            <span
                role="status"
                aria-live="polite"
                aria-atomic="true"
                style={visuallyHiddenStyle}
            >
                {announcement}
            </span>
        </>
    )
}

export default SelectSearchStatus

import {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import Text from '../../Text/Text'
import { ChevronDown, X, Loader2, Check } from 'lucide-react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { FOUNDATION_THEME } from '../../../tokens'
import { useErrorShake } from '../../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../../common/error.animations'
import type {
    AutocompleteProps,
    AutocompleteOption,
    AutocompleteSize,
} from './types'
import type { AutocompleteTokensType } from './autocomplete.tokens'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const DropdownContent = styled(RadixPopover.Content)<{
    $maxHeight?: number
    $minWidth?: number
    $maxWidth?: number
}>`
    z-index: 1000;
    outline: none;
    max-height: ${(props) =>
        props.$maxHeight ? `${props.$maxHeight}px` : '300px'};
    min-width: ${(props) =>
        props.$minWidth
            ? `${props.$minWidth}px`
            : 'var(--radix-popover-trigger-width)'};
    max-width: ${(props) =>
        props.$maxWidth ? `${props.$maxWidth}px` : '500px'};
    overflow-y: auto;
    animation: slideUpAndFade 200ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideUpAndFade {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${FOUNDATION_THEME.colors.gray[300]};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${FOUNDATION_THEME.colors.gray[400]};
    }
`

const OptionItem = styled(Block)<{
    $selected: boolean
    $highlighted: boolean
    $disabled: boolean
    tokens: AutocompleteTokensType
}>`
    cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
    user-select: none;
    transition: all 150ms ease;
    display: flex;
    align-items: center;
    gap: ${(props) => props.tokens.inputContainer.gap};
    padding: ${(props) => props.tokens.option.padding.y}
        ${(props) => props.tokens.option.padding.x};
    border-radius: ${(props) => props.tokens.option.borderRadius};
    font-size: ${(props) => props.tokens.option.fontSize};
    font-weight: ${(props) => props.tokens.option.fontWeight};
    color: ${(props) =>
        props.$disabled
            ? props.tokens.option.color.disabled
            : props.$selected
              ? props.tokens.option.color.selected
              : props.tokens.option.color.default};
    background-color: ${(props) =>
        props.$selected
            ? props.tokens.option.backgroundColor.selected
            : props.$highlighted
              ? props.tokens.option.backgroundColor.hover
              : props.tokens.option.backgroundColor.default};

    &:hover {
        background-color: ${(props) =>
            props.$disabled
                ? props.tokens.option.backgroundColor.default
                : props.$selected
                  ? props.tokens.option.backgroundColor.selected
                  : props.tokens.option.backgroundColor.hover};
        color: ${(props) =>
            props.$disabled
                ? props.tokens.option.color.disabled
                : props.tokens.option.color.hover};
    }
`

const Tag = styled(Block)<{ tokens: AutocompleteTokensType }>`
    display: inline-flex;
    align-items: center;
    gap: ${(props) => props.tokens.tag.gap};
    padding: ${(props) => props.tokens.tag.padding.y}
        ${(props) => props.tokens.tag.padding.x};
    background-color: ${(props) => props.tokens.tag.backgroundColor};
    color: ${(props) => props.tokens.tag.color};
    font-size: ${(props) => props.tokens.tag.fontSize};
    font-weight: ${(props) => props.tokens.tag.fontWeight};
    border-radius: ${(props) => props.tokens.tag.borderRadius};
    max-width: 150px;
`

const defaultFilterOptions = <T,>(
    options: AutocompleteOption<T>[],
    inputValue: string
): AutocompleteOption<T>[] => {
    if (!inputValue.trim()) return options
    const lowerInput = inputValue.toLowerCase()
    return options.filter(
        (option) =>
            option.label.toLowerCase().includes(lowerInput) ||
            option.value.toLowerCase().includes(lowerInput)
    )
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
    <T,>(
        {
            // Labeling
            label,
            sublabel,
            helpIconHintText,
            placeholder = 'Select...',

            // State
            error = false,
            errorMessage,
            hintText,
            disabled = false,
            required = false,
            readOnly = false,

            // Options
            options = [],
            value,
            onChange,

            // Features
            multiple = false,
            freeSolo = false,
            clearable = true,
            loading = false,
            openOnFocus = false,
            autoHighlight = true,
            disableCloseOnSelect = false,
            limitTags,

            // Filtering
            filterOptions = defaultFilterOptions,
            getOptionLabel,
            isOptionEqualToValue,

            // Customization
            size = 'medium' as AutocompleteSize,
            slot,
            renderOption,
            renderTags,
            noOptionsText = 'No options',
            loadingText = 'Loading...',

            // Input props
            name,
            onInputChange,
            onFocus,
            onBlur,

            // Popover positioning
            maxMenuHeight,
            minMenuWidth,
            maxMenuWidth,

            ...rest
        }: AutocompleteProps<T>,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const autocompleteTokens =
            useResponsiveTokens<AutocompleteTokensType>('AUTOCOMPLETE')
        const shouldShake = useErrorShake(error)

        const [open, setOpen] = useState(false)
        const [inputValue, setInputValue] = useState('')
        const [highlightedIndex, setHighlightedIndex] = useState(-1)
        const [isFocused, setIsFocused] = useState(false)

        const inputRef = useRef<HTMLInputElement>(null)
        const slotRef = useRef<HTMLDivElement>(null)
        const listRef = useRef<HTMLDivElement>(null)
        const [slotWidth, setSlotWidth] = useState(0)

        const paddingX = toPixels(
            autocompleteTokens.inputContainer.padding.x[size]
        )
        const paddingY = toPixels(
            autocompleteTokens.inputContainer.padding.y[size]
        )
        const GAP = toPixels(autocompleteTokens.inputContainer.gap)

        // Get selected options
        const selectedOptions = useMemo(() => {
            if (!value) return []
            const values = Array.isArray(value) ? value : [value]
            return options.filter((opt) => values.includes(opt.value))
        }, [value, options])

        // Calculate padding based on slot
        const paddingInlineStart = slot ? paddingX + slotWidth + GAP : paddingX
        const paddingInlineEnd =
            paddingX + 32 + (clearable && selectedOptions.length > 0 ? 24 : 0)

        useEffect(() => {
            if (slotRef.current) {
                setSlotWidth(slotRef.current.offsetWidth)
            } else {
                setSlotWidth(0)
            }
        }, [slot])

        // Filter options based on input
        const filteredOptions = useMemo(() => {
            return filterOptions(options, inputValue)
        }, [options, inputValue, filterOptions])

        // Group options
        const groupedOptions = useMemo(() => {
            const groups: Record<string, AutocompleteOption<T>[]> = {}
            const ungrouped: AutocompleteOption<T>[] = []

            filteredOptions.forEach((option) => {
                if (option.group) {
                    if (!groups[option.group]) {
                        groups[option.group] = []
                    }
                    groups[option.group].push(option)
                } else {
                    ungrouped.push(option)
                }
            })

            return { groups, ungrouped }
        }, [filteredOptions])

        // Get display value for input
        const displayValue = useMemo(() => {
            if (inputValue && open) return inputValue
            if (multiple) {
                return ''
            }
            if (selectedOptions.length === 1) {
                return getOptionLabel
                    ? getOptionLabel(selectedOptions[0])
                    : selectedOptions[0].label
            }
            return ''
        }, [inputValue, open, multiple, selectedOptions, getOptionLabel])

        // Handle option selection
        const handleSelectOption = useCallback(
            (option: AutocompleteOption<T>) => {
                if (option.disabled) return

                let newValue: string | string[]
                let newSelectedOption:
                    | AutocompleteOption<T>
                    | AutocompleteOption<T>[]
                    | undefined

                if (multiple) {
                    const currentValues = Array.isArray(value) ? value : []
                    const isSelected = currentValues.includes(option.value)

                    if (isSelected) {
                        newValue = currentValues.filter(
                            (v) => v !== option.value
                        )
                        newSelectedOption = selectedOptions.filter(
                            (opt) => opt.value !== option.value
                        )
                    } else {
                        newValue = [...currentValues, option.value]
                        newSelectedOption = [...selectedOptions, option]
                    }
                } else {
                    newValue = option.value
                    newSelectedOption = option
                    setInputValue('')
                    if (!disableCloseOnSelect) {
                        setOpen(false)
                    }
                }

                onChange?.(newValue, newSelectedOption)
                setHighlightedIndex(-1)
            },
            [multiple, value, selectedOptions, onChange, disableCloseOnSelect]
        )

        // Handle input change
        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value
                setInputValue(newValue)
                setHighlightedIndex(autoHighlight ? 0 : -1)

                if (!open && newValue) {
                    setOpen(true)
                }

                onInputChange?.(e, newValue)

                // Handle free solo
                if (freeSolo && !multiple) {
                    onChange?.(newValue, undefined)
                }
            },
            [open, freeSolo, multiple, onChange, onInputChange, autoHighlight]
        )

        // Handle keyboard navigation
        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (disabled || readOnly) return

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault()
                        if (!open) {
                            setOpen(true)
                            setHighlightedIndex(0)
                        } else {
                            setHighlightedIndex((prev) =>
                                prev < filteredOptions.length - 1
                                    ? prev + 1
                                    : prev
                            )
                        }
                        break

                    case 'ArrowUp':
                        e.preventDefault()
                        if (open) {
                            setHighlightedIndex((prev) =>
                                prev > 0 ? prev - 1 : 0
                            )
                        }
                        break

                    case 'Enter':
                        e.preventDefault()
                        if (
                            open &&
                            highlightedIndex >= 0 &&
                            highlightedIndex < filteredOptions.length
                        ) {
                            handleSelectOption(
                                filteredOptions[highlightedIndex]
                            )
                        } else if (!open) {
                            setOpen(true)
                        }
                        break

                    case 'Escape':
                        e.preventDefault()
                        setOpen(false)
                        setHighlightedIndex(-1)
                        setInputValue('')
                        break

                    case 'Backspace':
                        if (
                            multiple &&
                            !inputValue &&
                            selectedOptions.length > 0
                        ) {
                            const lastOption =
                                selectedOptions[selectedOptions.length - 1]
                            handleSelectOption(lastOption)
                        }
                        break
                }
            },
            [
                disabled,
                readOnly,
                open,
                highlightedIndex,
                filteredOptions,
                handleSelectOption,
                multiple,
                inputValue,
                selectedOptions,
            ]
        )

        // Scroll highlighted option into view
        useEffect(() => {
            if (open && highlightedIndex >= 0 && listRef.current) {
                const highlightedElement = listRef.current.querySelector(
                    `[data-option-index="${highlightedIndex}"]`
                )
                if (highlightedElement) {
                    highlightedElement.scrollIntoView({
                        block: 'nearest',
                        behavior: 'smooth',
                    })
                }
            }
        }, [highlightedIndex, open])

        // Handle clear
        const handleClear = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation()
                onChange?.(multiple ? [] : '', undefined)
                setInputValue('')
                setHighlightedIndex(-1)
                inputRef.current?.focus()
            },
            [multiple, onChange]
        )

        // Handle remove tag
        const handleRemoveTag = useCallback(
            (optionValue: string, e: React.MouseEvent) => {
                e.stopPropagation()
                if (Array.isArray(value)) {
                    const newValue = value.filter((v) => v !== optionValue)
                    const newSelectedOption = selectedOptions.filter(
                        (opt) => opt.value !== optionValue
                    )
                    onChange?.(newValue, newSelectedOption)
                }
            },
            [value, selectedOptions, onChange]
        )

        // Check if option is selected
        const isOptionSelected = useCallback(
            (option: AutocompleteOption<T>) => {
                if (isOptionEqualToValue) {
                    return selectedOptions.some((selected) =>
                        isOptionEqualToValue(option, selected)
                    )
                }
                return selectedOptions.some(
                    (selected) => selected.value === option.value
                )
            },
            [selectedOptions, isOptionEqualToValue]
        )

        // Render option content
        const renderOptionContent = useCallback(
            (option: AutocompleteOption<T>, index: number) => {
                const selected = isOptionSelected(option)

                if (renderOption) {
                    return renderOption(option, index, selected)
                }

                return (
                    <>
                        {multiple && (
                            <Block
                                width="16px"
                                height="16px"
                                border={`2px solid ${selected ? autocompleteTokens.icon.color.focus : autocompleteTokens.icon.color.default}`}
                                borderRadius="3px"
                                backgroundColor={
                                    selected
                                        ? autocompleteTokens.icon.color.focus
                                        : 'transparent'
                                }
                                contentCentered
                            >
                                {selected && <Check size={12} color="white" />}
                            </Block>
                        )}
                        <Block style={{ flex: 1 }}>
                            <Text>{option.label}</Text>
                        </Block>
                        {!multiple && selected && (
                            <Check
                                size={16}
                                color={autocompleteTokens.icon.color.focus}
                            />
                        )}
                    </>
                )
            },
            [multiple, isOptionSelected, renderOption, autocompleteTokens]
        )

        // Render tags
        const renderTagsContent = useCallback(() => {
            if (!multiple || selectedOptions.length === 0) return null

            const tagsToShow =
                limitTags && selectedOptions.length > limitTags
                    ? selectedOptions.slice(0, limitTags)
                    : selectedOptions

            const remainingCount =
                limitTags && selectedOptions.length > limitTags
                    ? selectedOptions.length - limitTags
                    : 0

            if (renderTags) {
                return renderTags(
                    selectedOptions.map((opt) => opt.value),
                    (index) => ({
                        onDelete: (e: React.MouseEvent) =>
                            handleRemoveTag(selectedOptions[index].value, e),
                    })
                )
            }

            return (
                <>
                    {tagsToShow.map((option) => (
                        <Tag key={option.value} tokens={autocompleteTokens}>
                            <Text
                                fontSize="inherit"
                                fontWeight="inherit"
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {option.label}
                            </Text>
                            <PrimitiveButton
                                onClick={(e) =>
                                    handleRemoveTag(option.value, e)
                                }
                                padding="0"
                                background="transparent"
                                border="none"
                                cursor="pointer"
                                display="flex"
                                alignItems="center"
                            >
                                <X size={12} />
                            </PrimitiveButton>
                        </Tag>
                    ))}
                    {remainingCount > 0 && (
                        <Tag tokens={autocompleteTokens}>
                            <Text fontSize="inherit" fontWeight="inherit">
                                +{remainingCount}
                            </Text>
                        </Tag>
                    )}
                </>
            )
        }, [
            multiple,
            selectedOptions,
            limitTags,
            renderTags,
            handleRemoveTag,
            autocompleteTokens,
        ])

        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={autocompleteTokens.gap}
                width="100%"
            >
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    name={name}
                    required={required}
                    tokens={autocompleteTokens}
                />

                <RadixPopover.Root open={open} onOpenChange={setOpen}>
                    <RadixPopover.Trigger asChild>
                        <Wrapper
                            position="relative"
                            width="100%"
                            style={getErrorShakeStyle(shouldShake)}
                        >
                            {slot && (
                                <Block
                                    ref={slotRef}
                                    position="absolute"
                                    top={paddingY}
                                    left={paddingX}
                                    bottom={paddingY}
                                    contentCentered
                                >
                                    {slot}
                                </Block>
                            )}

                            {/* Tags for multiple selection */}
                            {multiple && selectedOptions.length > 0 && (
                                <Block
                                    position="absolute"
                                    top={paddingY}
                                    left={paddingInlineStart}
                                    right={paddingInlineEnd}
                                    display="flex"
                                    flexWrap="wrap"
                                    gap="4px"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <Block
                                        display="flex"
                                        flexWrap="wrap"
                                        gap="4px"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        {renderTagsContent()}
                                    </Block>
                                </Block>
                            )}

                            <PrimitiveInput
                                ref={ref || inputRef}
                                name={name}
                                value={displayValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                disabled={disabled}
                                readOnly={readOnly}
                                required={required}
                                width="100%"
                                paddingInlineStart={paddingInlineStart}
                                paddingInlineEnd={paddingInlineEnd}
                                paddingY={
                                    multiple && selectedOptions.length > 0
                                        ? `${paddingY + 28}px`
                                        : `${paddingY}px`
                                }
                                borderRadius={
                                    autocompleteTokens.inputContainer
                                        .borderRadius[size]
                                }
                                border={
                                    disabled
                                        ? autocompleteTokens.inputContainer
                                              .border.disabled
                                        : error
                                          ? autocompleteTokens.inputContainer
                                                .border.error
                                          : isFocused || open
                                            ? autocompleteTokens.inputContainer
                                                  .border.focus
                                            : autocompleteTokens.inputContainer
                                                  .border.default
                                }
                                backgroundColor={
                                    disabled
                                        ? autocompleteTokens.inputContainer
                                              .backgroundColor.disabled
                                        : isFocused || open
                                          ? autocompleteTokens.inputContainer
                                                .backgroundColor.focus
                                          : autocompleteTokens.inputContainer
                                                .backgroundColor.default
                                }
                                color={
                                    disabled
                                        ? autocompleteTokens.inputContainer
                                              .color.disabled
                                        : error
                                          ? autocompleteTokens.inputContainer
                                                .color.error
                                          : autocompleteTokens.inputContainer
                                                .color.default
                                }
                                fontSize={
                                    autocompleteTokens.inputContainer.fontSize[
                                        size
                                    ]
                                }
                                fontWeight={
                                    autocompleteTokens.inputContainer
                                        .fontWeight[size]
                                }
                                outline="none"
                                transition="all 200ms ease-in-out"
                                placeholderColor={
                                    FOUNDATION_THEME.colors.gray[400]
                                }
                                _hover={{
                                    border: disabled
                                        ? autocompleteTokens.inputContainer
                                              .border.disabled
                                        : error
                                          ? autocompleteTokens.inputContainer
                                                .border.error
                                          : autocompleteTokens.inputContainer
                                                .border.hover,
                                }}
                                _focus={{
                                    border: disabled
                                        ? autocompleteTokens.inputContainer
                                              .border.disabled
                                        : error
                                          ? autocompleteTokens.inputContainer
                                                .border.error
                                          : autocompleteTokens.inputContainer
                                                .border.focus,
                                    backgroundColor:
                                        autocompleteTokens.inputContainer
                                            .backgroundColor.focus,
                                    boxShadow: '0 0 0 3px #EFF6FF',
                                }}
                                onFocus={(e) => {
                                    setIsFocused(true)
                                    if (openOnFocus) setOpen(true)
                                    onFocus?.(e)
                                }}
                                onBlur={(e) => {
                                    setIsFocused(false)
                                    onBlur?.(e)
                                }}
                                {...rest}
                            />

                            {/* Right icons */}
                            <Block
                                position="absolute"
                                right={paddingX}
                                top="50%"
                                display="flex"
                                alignItems="center"
                                gap="4px"
                                style={{ transform: 'translateY(-50%)' }}
                            >
                                {clearable &&
                                    selectedOptions.length > 0 &&
                                    !disabled && (
                                        <PrimitiveButton
                                            onClick={handleClear}
                                            padding="4px"
                                            background="transparent"
                                            border="none"
                                            cursor="pointer"
                                            display="flex"
                                            alignItems="center"
                                            color={
                                                autocompleteTokens.clearButton
                                                    .color.default
                                            }
                                            _hover={{
                                                color: autocompleteTokens
                                                    .clearButton.color.hover,
                                            }}
                                        >
                                            <X size={16} />
                                        </PrimitiveButton>
                                    )}

                                {loading ? (
                                    <Loader2
                                        size={16}
                                        color={
                                            autocompleteTokens.icon.color
                                                .default
                                        }
                                        style={{
                                            animation:
                                                'spin 1s linear infinite',
                                        }}
                                    />
                                ) : (
                                    <ChevronDown
                                        size={16}
                                        color={
                                            disabled
                                                ? autocompleteTokens.icon.color
                                                      .disabled
                                                : isFocused || open
                                                  ? autocompleteTokens.icon
                                                        .color.focus
                                                  : autocompleteTokens.icon
                                                        .color.default
                                        }
                                        style={{
                                            transition: 'transform 200ms ease',
                                            transform: open
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)',
                                        }}
                                    />
                                )}
                            </Block>
                        </Wrapper>
                    </RadixPopover.Trigger>

                    <RadixPopover.Portal>
                        <DropdownContent
                            $maxHeight={maxMenuHeight}
                            $minWidth={minMenuWidth}
                            $maxWidth={maxMenuWidth}
                            sideOffset={4}
                            align="start"
                            style={{
                                backgroundColor:
                                    autocompleteTokens.dropdown.backgroundColor,
                                border: autocompleteTokens.dropdown.border,
                                borderRadius:
                                    autocompleteTokens.dropdown.borderRadius,
                                boxShadow:
                                    autocompleteTokens.dropdown.boxShadow,
                                padding: autocompleteTokens.dropdown.padding,
                            }}
                            onOpenAutoFocus={(e) => {
                                e.preventDefault()
                                inputRef.current?.focus()
                            }}
                        >
                            <Block ref={listRef}>
                                {loading ? (
                                    <Block
                                        padding={
                                            autocompleteTokens.noOptions.padding
                                        }
                                    >
                                        <Text
                                            fontSize={
                                                autocompleteTokens.noOptions
                                                    .fontSize
                                            }
                                            fontWeight={
                                                autocompleteTokens.noOptions
                                                    .fontWeight
                                            }
                                            color={
                                                autocompleteTokens.noOptions
                                                    .color
                                            }
                                        >
                                            {loadingText}
                                        </Text>
                                    </Block>
                                ) : filteredOptions.length === 0 ? (
                                    <Block
                                        padding={
                                            autocompleteTokens.noOptions.padding
                                        }
                                    >
                                        <Text
                                            fontSize={
                                                autocompleteTokens.noOptions
                                                    .fontSize
                                            }
                                            fontWeight={
                                                autocompleteTokens.noOptions
                                                    .fontWeight
                                            }
                                            color={
                                                autocompleteTokens.noOptions
                                                    .color
                                            }
                                        >
                                            {noOptionsText}
                                        </Text>
                                    </Block>
                                ) : (
                                    <>
                                        {/* Ungrouped options */}
                                        {groupedOptions.ungrouped.map(
                                            (option, index) => (
                                                <OptionItem
                                                    key={option.value}
                                                    data-option-index={index}
                                                    $selected={isOptionSelected(
                                                        option
                                                    )}
                                                    $highlighted={
                                                        highlightedIndex ===
                                                        index
                                                    }
                                                    $disabled={
                                                        option.disabled || false
                                                    }
                                                    tokens={autocompleteTokens}
                                                    onClick={() =>
                                                        !option.disabled &&
                                                        handleSelectOption(
                                                            option
                                                        )
                                                    }
                                                >
                                                    {renderOptionContent(
                                                        option,
                                                        index
                                                    )}
                                                </OptionItem>
                                            )
                                        )}

                                        {/* Grouped options */}
                                        {Object.entries(
                                            groupedOptions.groups
                                        ).map(([groupName, groupOptions]) => {
                                            const startIndex =
                                                groupedOptions.ungrouped
                                                    .length +
                                                Object.entries(
                                                    groupedOptions.groups
                                                )
                                                    .slice(
                                                        0,
                                                        Object.keys(
                                                            groupedOptions.groups
                                                        ).indexOf(groupName)
                                                    )
                                                    .reduce(
                                                        (acc, [, opts]) =>
                                                            acc + opts.length,
                                                        0
                                                    )

                                            return (
                                                <Block key={groupName}>
                                                    <Block
                                                        paddingX={
                                                            autocompleteTokens
                                                                .groupLabel
                                                                .padding.x
                                                        }
                                                        paddingY={
                                                            autocompleteTokens
                                                                .groupLabel
                                                                .padding.y
                                                        }
                                                    >
                                                        <Text
                                                            fontSize={
                                                                autocompleteTokens
                                                                    .groupLabel
                                                                    .fontSize
                                                            }
                                                            fontWeight={
                                                                autocompleteTokens
                                                                    .groupLabel
                                                                    .fontWeight
                                                            }
                                                            color={
                                                                autocompleteTokens
                                                                    .groupLabel
                                                                    .color
                                                            }
                                                        >
                                                            {groupName}
                                                        </Text>
                                                    </Block>
                                                    {groupOptions.map(
                                                        (option, idx) => {
                                                            const optionIndex =
                                                                startIndex + idx
                                                            return (
                                                                <OptionItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    data-option-index={
                                                                        optionIndex
                                                                    }
                                                                    $selected={isOptionSelected(
                                                                        option
                                                                    )}
                                                                    $highlighted={
                                                                        highlightedIndex ===
                                                                        optionIndex
                                                                    }
                                                                    $disabled={
                                                                        option.disabled ||
                                                                        false
                                                                    }
                                                                    tokens={
                                                                        autocompleteTokens
                                                                    }
                                                                    onClick={() =>
                                                                        !option.disabled &&
                                                                        handleSelectOption(
                                                                            option
                                                                        )
                                                                    }
                                                                >
                                                                    {renderOptionContent(
                                                                        option,
                                                                        optionIndex
                                                                    )}
                                                                </OptionItem>
                                                            )
                                                        }
                                                    )}
                                                </Block>
                                            )
                                        })}
                                    </>
                                )}
                            </Block>
                        </DropdownContent>
                    </RadixPopover.Portal>
                </RadixPopover.Root>

                <InputFooter
                    error={error}
                    errorMessage={errorMessage}
                    hintText={hintText}
                    disabled={disabled}
                    tokens={autocompleteTokens}
                />

                <style>
                    {`
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </Block>
        )
    }
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

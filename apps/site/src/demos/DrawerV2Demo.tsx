'use client'

import { useMemo, useState } from 'react'
import {
    Button,
    ButtonType,
    DrawerV2,
    DrawerV2Close,
    DrawerV2Content,
    DrawerV2Description,
    DrawerV2NestedRoot,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    DrawerV2Trigger,
} from '../../../../packages/blend/lib/main'

type Direction = 'bottom' | 'top' | 'left' | 'right'

type PlaygroundVariant =
    | 'basic'
    | 'status'
    | 'singleSelect'
    | 'multiSelect'
    | 'nestedDrawer'
    | 'nestedSingleSelect'
    | 'nestedMultiSelect'

const getContentClassName = (direction: Direction) => {
    const base =
        'fixed z-[1001] bg-white shadow-xl outline-none flex flex-col overflow-hidden rounded-2xl border border-gray-200'

    if (direction === 'bottom') {
        return `${base} left-4 right-4 bottom-4 max-h-[85vh]`
    }
    if (direction === 'top') {
        return `${base} left-4 right-4 top-4 max-h-[85vh]`
    }
    if (direction === 'left') {
        return `${base} left-4 top-4 bottom-4 w-[360px] max-w-[90vw]`
    }
    return `${base} right-4 top-4 bottom-4 w-[360px] max-w-[90vw]`
}

const getHeaderClassName = () => {
    return 'px-5 pt-5 pb-3 border-b border-gray-100'
}

const getBodyClassName = () => {
    return 'px-5 py-4 flex-1 overflow-auto'
}

const getFooterClassName = () => {
    return 'px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-2'
}

type SelectItem = {
    value: string
    label: string
    subLabel?: string
    disabled?: boolean
}

const SAMPLE_ITEMS: SelectItem[] = [
    { value: 'weekly', label: 'Weekly payouts', subLabel: 'Every Monday' },
    { value: 'daily', label: 'Daily payouts', subLabel: 'Next business day' },
    { value: 'instant', label: 'Instant payout', subLabel: 'Fee applies' },
    { value: 'manual', label: 'Manual', subLabel: 'Trigger from dashboard' },
    {
        value: 'paused',
        label: 'Paused',
        subLabel: 'Temporarily disabled',
        disabled: true,
    },
]

const DrawerV2Demo = () => {
    const [open, setOpen] = useState(false)
    const [variant, setVariant] = useState<PlaygroundVariant>('basic')
    const [direction, setDirection] = useState<Direction>('bottom')
    const [isModal, setIsModal] = useState(true)
    const [isDismissible, setIsDismissible] = useState(true)

    const [statusAction, setStatusAction] = useState<'confirm' | 'delete'>(
        'confirm'
    )

    const [singleSelected, setSingleSelected] = useState<string>('weekly')
    const [multiSelected, setMultiSelected] = useState<string[]>(['weekly'])

    const [nestedOpen, setNestedOpen] = useState(false)
    const [nestedSingleSelected, setNestedSingleSelected] =
        useState<string>('daily')
    const [nestedMultiSelected, setNestedMultiSelected] = useState<string[]>([
        'daily',
    ])

    const overlayClassName = useMemo(() => {
        return isModal ? 'fixed inset-0 z-[1000] bg-black/60' : undefined
    }, [isModal])

    const title = useMemo(() => {
        switch (variant) {
            case 'basic':
                return 'Basic drawer'
            case 'status':
                return 'Status drawer'
            case 'singleSelect':
                return 'Single select'
            case 'multiSelect':
                return 'Multi select'
            case 'nestedDrawer':
                return 'Nested drawer'
            case 'nestedSingleSelect':
                return 'Nested single select'
            case 'nestedMultiSelect':
                return 'Nested multi select'
            default:
                return 'Drawer V2'
        }
    }, [variant])

    const description = useMemo(() => {
        switch (variant) {
            case 'basic':
                return 'Minimal wrapper usage; styling is consumer-owned.'
            case 'status':
                return 'A compact “status” layout (icon, heading, description, actions).'
            case 'singleSelect':
                return 'Single choice list inside a drawer.'
            case 'multiSelect':
                return 'Multi choice list inside a drawer.'
            case 'nestedDrawer':
                return 'Open another drawer on top (vaul nested root).'
            case 'nestedSingleSelect':
                return 'Single select inside a nested drawer flow.'
            case 'nestedMultiSelect':
                return 'Multi select inside a nested drawer flow.'
            default:
                return undefined
        }
    }, [variant])

    const toggleMulti = (value: string) => {
        setMultiSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        )
    }

    const toggleNestedMulti = (value: string) => {
        setNestedMultiSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        )
    }

    const renderBasicBody = () => {
        return (
            <div className={getBodyClassName()}>
                <div className="text-sm text-gray-700">
                    Try changing direction, modal, dismissible, and variant from
                    the playground.
                </div>
                <div className="mt-4 space-y-3">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-10 rounded-lg bg-gray-50 border border-gray-100"
                        />
                    ))}
                </div>
            </div>
        )
    }

    const renderStatusBody = () => {
        const isDelete = statusAction === 'delete'
        return (
            <div className={getBodyClassName()}>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <div
                            className={`w-7 h-7 rounded-full ${
                                isDelete ? 'bg-red-500' : 'bg-green-500'
                            }`}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-base font-semibold text-gray-900">
                            {isDelete
                                ? 'Delete payout account?'
                                : 'Changes saved'}
                        </div>
                        <div className="text-sm text-gray-600 max-w-[320px]">
                            {isDelete
                                ? 'This action can’t be undone.'
                                : 'Your updates will take effect immediately.'}
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2 pt-2">
                        <DrawerV2Close asChild>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Cancel"
                            />
                        </DrawerV2Close>
                        <DrawerV2Close asChild>
                            <Button
                                buttonType={
                                    isDelete
                                        ? ButtonType.DANGER
                                        : ButtonType.PRIMARY
                                }
                                text={isDelete ? 'Delete' : 'Done'}
                            />
                        </DrawerV2Close>
                    </div>
                </div>
            </div>
        )
    }

    const renderSingleSelectBody = (
        selected: string,
        onSelect: (value: string) => void
    ) => {
        return (
            <div className={getBodyClassName()}>
                <div className="space-y-2">
                    {SAMPLE_ITEMS.map((item) => {
                        const isSelected = item.value === selected
                        const isDisabled = item.disabled ?? false
                        return (
                            <button
                                key={item.value}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => onSelect(item.value)}
                                className={`w-full text-left p-3 rounded-xl border ${
                                    isSelected
                                        ? 'border-blue-300 bg-blue-50'
                                        : 'border-gray-200 bg-white'
                                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.label}
                                        </div>
                                        {item.subLabel && (
                                            <div className="text-xs text-gray-600 mt-0.5">
                                                {item.subLabel}
                                            </div>
                                        )}
                                    </div>
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    const renderMultiSelectBody = (
        selected: string[],
        onToggle: (value: string) => void
    ) => {
        return (
            <div className={getBodyClassName()}>
                <div className="space-y-2">
                    {SAMPLE_ITEMS.map((item) => {
                        const isSelected = selected.includes(item.value)
                        const isDisabled = item.disabled ?? false
                        return (
                            <button
                                key={item.value}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => onToggle(item.value)}
                                className={`w-full text-left p-3 rounded-xl border ${
                                    isSelected
                                        ? 'border-blue-300 bg-blue-50'
                                        : 'border-gray-200 bg-white'
                                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.label}
                                        </div>
                                        {item.subLabel && (
                                            <div className="text-xs text-gray-600 mt-0.5">
                                                {item.subLabel}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                                            isSelected
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'bg-white border-gray-300'
                                        }`}
                                    >
                                        {isSelected && (
                                            <div className="w-2 h-2 bg-white rounded-sm" />
                                        )}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="max-w-3xl">
                <div className="mb-6">
                    <div className="text-2xl font-semibold">Drawer V2</div>
                    <div className="text-sm text-gray-600 mt-1">
                        Playground for the unstyled `vaul` wrapper. Styling and
                        layout are controlled by the consumer.
                    </div>
                </div>

                <div className="flex flex-wrap items-end gap-4 p-4 bg-white border border-gray-200 rounded-xl">
                    <div className="flex flex-col gap-1">
                        <div className="text-xs font-medium text-gray-700">
                            Variant
                        </div>
                        <select
                            className="h-10 px-3 border border-gray-300 rounded-lg bg-white"
                            value={variant}
                            onChange={(e) =>
                                setVariant(e.target.value as PlaygroundVariant)
                            }
                        >
                            <option value="basic">basic</option>
                            <option value="status">status</option>
                            <option value="singleSelect">single select</option>
                            <option value="multiSelect">multi select</option>
                            <option value="nestedDrawer">nested drawer</option>
                            <option value="nestedSingleSelect">
                                nested single select
                            </option>
                            <option value="nestedMultiSelect">
                                nested multi select
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="text-xs font-medium text-gray-700">
                            Direction
                        </div>
                        <select
                            className="h-10 px-3 border border-gray-300 rounded-lg bg-white"
                            value={direction}
                            onChange={(e) =>
                                setDirection(e.target.value as Direction)
                            }
                        >
                            <option value="bottom">bottom</option>
                            <option value="top">top</option>
                            <option value="left">left</option>
                            <option value="right">right</option>
                        </select>
                    </div>

                    <label className="flex items-center gap-2 h-10 px-3 border border-gray-200 rounded-lg bg-gray-50">
                        <input
                            type="checkbox"
                            checked={isModal}
                            onChange={(e) => setIsModal(e.target.checked)}
                        />
                        <span className="text-sm text-gray-700">modal</span>
                    </label>

                    <label className="flex items-center gap-2 h-10 px-3 border border-gray-200 rounded-lg bg-gray-50">
                        <input
                            type="checkbox"
                            checked={isDismissible}
                            onChange={(e) => setIsDismissible(e.target.checked)}
                        />
                        <span className="text-sm text-gray-700">
                            dismissible
                        </span>
                    </label>

                    {variant === 'status' && (
                        <div className="flex flex-col gap-1">
                            <div className="text-xs font-medium text-gray-700">
                                Status
                            </div>
                            <select
                                className="h-10 px-3 border border-gray-300 rounded-lg bg-white"
                                value={statusAction}
                                onChange={(e) =>
                                    setStatusAction(
                                        e.target.value as 'confirm' | 'delete'
                                    )
                                }
                            >
                                <option value="confirm">confirm</option>
                                <option value="delete">delete</option>
                            </select>
                        </div>
                    )}

                    <DrawerV2
                        open={open}
                        onOpenChange={setOpen}
                        direction={direction}
                        modal={isModal}
                        dismissible={isDismissible}
                    >
                        <DrawerV2Trigger asChild>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open drawer"
                            />
                        </DrawerV2Trigger>

                        <DrawerV2Portal>
                            <DrawerV2Overlay className={overlayClassName} />
                            <DrawerV2Content
                                className={getContentClassName(direction)}
                                tabIndex={-1}
                            >
                                <div className={getHeaderClassName()}>
                                    <DrawerV2Title className="text-base font-semibold text-gray-900">
                                        {title}
                                    </DrawerV2Title>
                                    {description && (
                                        <DrawerV2Description className="text-sm text-gray-600 mt-1">
                                            {description}
                                        </DrawerV2Description>
                                    )}
                                </div>

                                {variant === 'basic' && renderBasicBody()}
                                {variant === 'status' && renderStatusBody()}
                                {variant === 'singleSelect' &&
                                    renderSingleSelectBody(
                                        singleSelected,
                                        (v) => {
                                            setSingleSelected(v)
                                            setOpen(false)
                                        }
                                    )}
                                {variant === 'multiSelect' &&
                                    renderMultiSelectBody(
                                        multiSelected,
                                        toggleMulti
                                    )}
                                {variant === 'nestedDrawer' && (
                                    <div className={getBodyClassName()}>
                                        <div className="text-sm text-gray-700">
                                            This demonstrates
                                            `DrawerV2NestedRoot`.
                                        </div>
                                        <div className="mt-4">
                                            <Button
                                                buttonType={ButtonType.PRIMARY}
                                                onClick={() =>
                                                    setNestedOpen(true)
                                                }
                                                text="Open nested drawer"
                                            />
                                        </div>

                                        <DrawerV2NestedRoot
                                            open={nestedOpen}
                                            onOpenChange={setNestedOpen}
                                            direction={direction}
                                            modal={isModal}
                                            dismissible={isDismissible}
                                        >
                                            <DrawerV2Portal>
                                                <DrawerV2Overlay
                                                    className={overlayClassName}
                                                />
                                                <DrawerV2Content
                                                    className={getContentClassName(
                                                        direction
                                                    )}
                                                >
                                                    <div
                                                        className={getHeaderClassName()}
                                                    >
                                                        <DrawerV2Title className="text-base font-semibold text-gray-900">
                                                            Nested drawer
                                                        </DrawerV2Title>
                                                        <DrawerV2Description className="text-sm text-gray-600 mt-1">
                                                            This drawer is
                                                            stacked above the
                                                            parent.
                                                        </DrawerV2Description>
                                                    </div>
                                                    <div
                                                        className={getBodyClassName()}
                                                    >
                                                        <div className="text-sm text-gray-700">
                                                            Close this drawer to
                                                            return to the
                                                            parent.
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={getFooterClassName()}
                                                    >
                                                        <DrawerV2Close asChild>
                                                            <Button
                                                                buttonType={
                                                                    ButtonType.SECONDARY
                                                                }
                                                                text="Close"
                                                            />
                                                        </DrawerV2Close>
                                                    </div>
                                                </DrawerV2Content>
                                            </DrawerV2Portal>
                                        </DrawerV2NestedRoot>
                                    </div>
                                )}

                                {variant === 'nestedSingleSelect' && (
                                    <div className={getBodyClassName()}>
                                        <div className="text-sm text-gray-700">
                                            Open a nested drawer to select a
                                            value.
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="text-xs text-gray-500">
                                                Selected
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {nestedSingleSelected}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Button
                                                buttonType={ButtonType.PRIMARY}
                                                onClick={() =>
                                                    setNestedOpen(true)
                                                }
                                                text="Choose"
                                            />
                                        </div>

                                        <DrawerV2NestedRoot
                                            open={nestedOpen}
                                            onOpenChange={setNestedOpen}
                                            direction={direction}
                                            modal={isModal}
                                            dismissible={isDismissible}
                                        >
                                            <DrawerV2Portal>
                                                <DrawerV2Overlay
                                                    className={overlayClassName}
                                                />
                                                <DrawerV2Content
                                                    className={getContentClassName(
                                                        direction
                                                    )}
                                                >
                                                    <div
                                                        className={getHeaderClassName()}
                                                    >
                                                        <DrawerV2Title className="text-base font-semibold text-gray-900">
                                                            Pick one
                                                        </DrawerV2Title>
                                                        <DrawerV2Description className="text-sm text-gray-600 mt-1">
                                                            Selecting closes the
                                                            nested drawer.
                                                        </DrawerV2Description>
                                                    </div>
                                                    {renderSingleSelectBody(
                                                        nestedSingleSelected,
                                                        (v) => {
                                                            setNestedSingleSelected(
                                                                v
                                                            )
                                                            setNestedOpen(false)
                                                        }
                                                    )}
                                                    <div
                                                        className={getFooterClassName()}
                                                    >
                                                        <DrawerV2Close asChild>
                                                            <Button
                                                                buttonType={
                                                                    ButtonType.SECONDARY
                                                                }
                                                            >
                                                                Close
                                                            </Button>
                                                        </DrawerV2Close>
                                                    </div>
                                                </DrawerV2Content>
                                            </DrawerV2Portal>
                                        </DrawerV2NestedRoot>
                                    </div>
                                )}

                                {variant === 'nestedMultiSelect' && (
                                    <div className={getBodyClassName()}>
                                        <div className="text-sm text-gray-700">
                                            Open a nested drawer to edit multi
                                            selection.
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <div className="text-xs text-gray-500">
                                                Selected
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {nestedMultiSelected.length}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Button
                                                buttonType={ButtonType.PRIMARY}
                                                onClick={() =>
                                                    setNestedOpen(true)
                                                }
                                                text="Choose"
                                            />
                                        </div>

                                        <DrawerV2NestedRoot
                                            open={nestedOpen}
                                            onOpenChange={setNestedOpen}
                                            direction={direction}
                                            modal={isModal}
                                            dismissible={isDismissible}
                                        >
                                            <DrawerV2Portal>
                                                <DrawerV2Overlay
                                                    className={overlayClassName}
                                                />
                                                <DrawerV2Content
                                                    className={getContentClassName(
                                                        direction
                                                    )}
                                                >
                                                    <div
                                                        className={getHeaderClassName()}
                                                    >
                                                        <DrawerV2Title className="text-base font-semibold text-gray-900">
                                                            Pick multiple
                                                        </DrawerV2Title>
                                                        <DrawerV2Description className="text-sm text-gray-600 mt-1">
                                                            Toggle options, then
                                                            close.
                                                        </DrawerV2Description>
                                                    </div>
                                                    {renderMultiSelectBody(
                                                        nestedMultiSelected,
                                                        toggleNestedMulti
                                                    )}
                                                    <div
                                                        className={getFooterClassName()}
                                                    >
                                                        <DrawerV2Close asChild>
                                                            <Button
                                                                buttonType={
                                                                    ButtonType.PRIMARY
                                                                }
                                                                text="Done"
                                                            />
                                                        </DrawerV2Close>
                                                    </div>
                                                </DrawerV2Content>
                                            </DrawerV2Portal>
                                        </DrawerV2NestedRoot>
                                    </div>
                                )}

                                {variant !== 'status' &&
                                    variant !== 'nestedDrawer' &&
                                    variant !== 'nestedSingleSelect' &&
                                    variant !== 'nestedMultiSelect' &&
                                    variant !== 'singleSelect' && (
                                        <div className={getFooterClassName()}>
                                            <DrawerV2Close asChild>
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    text="Close"
                                                />
                                            </DrawerV2Close>
                                        </div>
                                    )}
                            </DrawerV2Content>
                        </DrawerV2Portal>
                    </DrawerV2>
                </div>
            </div>
        </div>
    )
}

export default DrawerV2Demo

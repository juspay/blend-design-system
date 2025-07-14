'use client'

import { Info } from 'lucide-react'
import React from 'react'
import Tooltip from './Tooltip'

type TableCell = {
    content: string | React.ReactNode
    hintText?: string | React.ReactNode
}

type DocsTypeTableProps = {
    data: TableCell[][]
    isLoading?: boolean
    emptyMessage?: string
    loadingMessage?: string
    className?: string
}

const TableHeader = () => {
    const columns = ['Prop Name', 'Type', 'Default']

    return (
        <thead className="bg-gray-50 dark:bg-[var(--code-background)] border-b-1 border-[var(--code-border)]">
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[var(--muted-foreground)] uppercase tracking-wider ${
                            index === 2 ? 'hidden md:table-cell' : ''
                        }`}
                    >
                        <span>{column}</span>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

const TableBody = ({ data }: { data: TableCell[][] }) => {
    return (
        <tbody className="bg-[var(--code-background)] dark:bg-neutral-950 divide-y divide-[var(--code-border)] ">
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                        const hasTooltip = cell.hintText !== undefined

                        return (
                            <td
                                key={`${rowIndex}-${cellIndex}`}
                                className={`py-4 text-sm ${
                                    cellIndex === 2
                                        ? 'hidden md:table-cell'
                                        : ''
                                }`}
                            >
                                <div className="flex items-start gap-2 px-6">
                                    <span className="block break-words">
                                        {cell.content}
                                    </span>
                                    {hasTooltip && (
                                        <Tooltip content={cell.hintText!}>
                                            <Info
                                                size={12}
                                                color="var(--muted-foreground)"
                                                className="flex-shrink-0 mt-0.5"
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            </td>
                        )
                    })}
                </tr>
            ))}
        </tbody>
    )
}

const DocsTypeTable = ({
    data,
    isLoading = false,
    emptyMessage = 'No data available',
    loadingMessage = 'Loading...',
    className = '',
}: DocsTypeTableProps) => {
    if (isLoading) {
        return (
            <div
                className={`w-full overflow-hidden border border-[var(--code-border)] rounded-lg ${className}`}
            >
                <div className="p-6 text-center text-gray-500">
                    {loadingMessage}
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div
                className={`w-full overflow-hidden border border-[var(--code-border)] rounded-lg ${className}`}
            >
                <div className="p-6 text-center text-gray-500">
                    {emptyMessage}
                </div>
            </div>
        )
    }

    return (
        <div
            className={`w-full border border-[var(--code-border)] rounded-lg my-8 overflow-hidden ${className}`}
        >
            <div className="overflow-x-auto w-full">
                <table className="w-full min-w-full">
                    <TableHeader />
                    <TableBody data={data} />
                </table>
            </div>
        </div>
    )
}

export default DocsTypeTable

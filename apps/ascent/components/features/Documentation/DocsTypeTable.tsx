'use client'

import { Info } from 'lucide-react'
import React from 'react'
import Tooltip from '@/components/ui/Tooltip/Tooltip'
import { cn } from '@/lib'

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
    const columns = ['Prop Name', 'Type', 'Enum']

    return (
        <thead className="bg-surface border-b border-code-border">
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
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
        <tbody className="bg-background divide-y divide-code-border">
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted">
                    {row.map((cell, cellIndex) => {
                        const hasTooltip = cell.hintText !== undefined
                        const isEmpty =
                            !cell.content ||
                            cell.content === '' ||
                            cell.content === 'undefined'

                        return (
                            <td
                                key={`${rowIndex}-${cellIndex}`}
                                className="py-4 text-sm text-foreground"
                            >
                                <div className="flex items-start gap-2 px-6">
                                    <span className="block wrap-break-words">
                                        {isEmpty ? '-' : cell.content}
                                    </span>
                                    {hasTooltip && (
                                        <Tooltip content={cell.hintText!}>
                                            <Info
                                                size={12}
                                                className="shrink-0 mt-0.5 text-muted-foreground cursor-help"
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
                className={cn(
                    'w-full overflow-hidden border border-code-border rounded-lg bg-background',
                    className
                )}
            >
                <div className="p-6 text-center text-muted-foreground">
                    {loadingMessage}
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div
                className={cn(
                    'w-full overflow-hidden border border-code-border rounded-lg bg-background',
                    className
                )}
            >
                <div className="p-6 text-center text-muted-foreground">
                    {emptyMessage}
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(
                'w-full border border-code-border rounded-t-xl my-8 overflow-hidden',
                className
            )}
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

import React, { ComponentPropsWithoutRef } from 'react'

// Table components for MDX content
export const TableComponents = {
    table: (props: ComponentPropsWithoutRef<'table'>) => (
        <div className="overflow-x-auto w-full my-4">
            <table
                className="w-full min-w-full border border-border rounded-t-xl"
                {...props}
            />
        </div>
    ),
    thead: (props: ComponentPropsWithoutRef<'thead'>) => (
        <thead className="bg-surface border-b border-code-border" {...props} />
    ),
    tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
        <tbody
            className="bg-background divide-y divide-code-border"
            {...props}
        />
    ),
    tr: (props: ComponentPropsWithoutRef<'tr'>) => (
        <tr className="hover:bg-muted" {...props} />
    ),
    th: (props: ComponentPropsWithoutRef<'th'>) => (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            {...props}
        />
    ),
    td: (props: ComponentPropsWithoutRef<'td'>) => (
        <td className="py-4 text-sm text-foreground" {...props}>
            <div className="flex items-start gap-2 px-6">
                <span className="block wrap-break-words">
                    {(props as any).children}
                </span>
            </div>
        </td>
    ),
}

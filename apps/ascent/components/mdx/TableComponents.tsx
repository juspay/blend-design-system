import React, { ComponentPropsWithoutRef } from 'react'

// Table components for MDX content
export const TableComponents = {
    table: (props: ComponentPropsWithoutRef<'table'>) => (
        <table
            className="w-full table-auto border-collapse border border-gray-300 dark:border-zinc-600 my-6"
            {...props}
        />
    ),
    thead: (props: ComponentPropsWithoutRef<'thead'>) => (
        <thead className="bg-gray-50 dark:bg-zinc-800" {...props} />
    ),
    tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
        <tbody
            className="divide-y divide-gray-200 dark:divide-zinc-700"
            {...props}
        />
    ),
    tr: (props: ComponentPropsWithoutRef<'tr'>) => (
        <tr
            className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 last:border-b-0"
            {...props}
        />
    ),
    th: (props: ComponentPropsWithoutRef<'th'>) => (
        <th
            className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100 border-b border-gray-300 dark:border-zinc-600 whitespace-nowrap bg-gray-50 dark:bg-zinc-800"
            {...props}
        />
    ),
    td: (props: ComponentPropsWithoutRef<'td'>) => (
        <td
            className="px-4 py-3 text-sm text-gray-800 dark:text-zinc-300 break-words align-top"
            {...props}
        />
    ),
}

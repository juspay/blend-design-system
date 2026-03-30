import { ButtonHTMLAttributes, ReactNode } from 'react'

export type SecondarySidebarItems = {
    label: string
    value: string
    icon: ReactNode
}

export type SecondarySidebarProps = {
    items: SecondarySidebarItems[]
    selected: string
    onSelect: (value: string) => void
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export type SidebarV2Props = {
    height?: string
    secondarySidebar?: SecondarySidebarProps
}

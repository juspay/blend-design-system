import { SwitchSize } from './types'
export declare const StyledSwitchRoot: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components/dist/types').Substitute<
        import('react').DetailedHTMLProps<
            import('react').ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        {
            size: SwitchSize
            $isDisabled: boolean
            $isChecked: boolean
            $error?: boolean
        }
    >
> &
    string
export declare const StyledSwitchThumb: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components/dist/types').Substitute<
        import('react').DetailedHTMLProps<
            import('react').HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        {
            size: SwitchSize
            $isChecked: boolean
        }
    >
> &
    string

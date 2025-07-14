import { ButtonSize } from '../Button/types'
export declare const StyledButtonGroup: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components').FastOmit<
        import('react').DetailedHTMLProps<
            import('react').HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        never
    >
> &
    string
export declare const StyledButtonGroupContainer: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components/dist/types').Substitute<
        import('styled-components').FastOmit<
            import('react').DetailedHTMLProps<
                import('react').HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >,
            never
        >,
        {
            $isStacked: boolean
            $size: ButtonSize
        }
    >
> &
    string
export declare const StyledButtonWrapper: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components/dist/types').Substitute<
        import('react').DetailedHTMLProps<
            import('react').HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        {
            $position: 'first' | 'middle' | 'last'
            $isStacked: boolean
        }
    >
> &
    string

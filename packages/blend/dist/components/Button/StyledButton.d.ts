import { ButtonType, ButtonSize, ButtonSubType } from './types'
export declare const StyledButton: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components/dist/types').Substitute<
        import('react').DetailedHTMLProps<
            import('react').ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        {
            $buttonType: ButtonType
            $size: ButtonSize
            $subType: ButtonSubType
            $hasLeadingIcon: boolean
            $hasTrailingIcon: boolean
            $isLoading: boolean
        }
    >
> &
    string
export declare const IconContainer: import('styled-components/dist/types').IStyledComponentBase<
    'web',
    import('styled-components').FastOmit<
        import('react').DetailedHTMLProps<
            import('react').HTMLAttributes<HTMLSpanElement>,
            HTMLSpanElement
        >,
        never
    >
> &
    string

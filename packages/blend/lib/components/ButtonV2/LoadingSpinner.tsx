import styled from 'styled-components'

const Spinner = styled.div<{ size?: number; color?: string }>`
    width: ${(props) => props.size ?? 16}px;
    height: ${(props) => props.size ?? 16}px;
    border: 2px solid transparent;
    border-top-color: ${(props) => props.color ?? 'currentColor'};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`

export interface LoadingSpinnerProps {
    size?: number
    color?: string
    'aria-hidden'?: boolean
    'data-status'?: string
}

export const LoadingSpinner = ({
    size = 16,
    color,
    'aria-hidden': ariaHidden = true,
    'data-status': dataStatus = 'loading',
}: LoadingSpinnerProps) => {
    return (
        <Spinner
            size={size}
            color={color}
            aria-hidden={ariaHidden}
            data-status={dataStatus}
        />
    )
}

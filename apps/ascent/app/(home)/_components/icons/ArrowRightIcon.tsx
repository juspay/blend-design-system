import React from 'react'

interface ArrowRightIconProps {
    width?: number
    height?: number
    className?: string
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
    width = 14,
    height = 14,
    className = '',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.83748 3.08748C5.06529 2.85967 5.43463 2.85967 5.66244 3.08748L9.16244 6.58748C9.39024 6.81529 9.39024 7.18463 9.16244 7.41244L5.66244 10.9124C5.43463 11.1402 5.06529 11.1402 4.83748 10.9124C4.60967 10.6846 4.60967 10.3153 4.83748 10.0875L7.925 6.99996L4.83748 3.91244C4.60967 3.68463 4.60967 3.31529 4.83748 3.08748Z"
                fill="#2B303B"
            />
        </svg>
    )
}

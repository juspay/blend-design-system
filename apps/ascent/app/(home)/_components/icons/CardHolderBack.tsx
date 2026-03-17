import React from 'react'

interface CardHolderBackProps {
    width?: number
    height?: number
    className?: string
}

export const CardHolderBack: React.FC<CardHolderBackProps> = ({
    width = 439,
    height = 259,
    className = '',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 439 259"
            fill="none"
            className={className}
        >
            <path
                d="M0.0114443 22.686C-0.384503 10.2756 9.56853 3.94936e-06 21.9852 3.94936e-06H123.21L416.597 2.83598e-07C429.013 1.28456e-07 438.966 10.2756 438.57 22.686L431.716 237.543C431.337 249.406 421.611 258.827 409.742 258.827H28.8401C16.9711 258.827 7.24484 249.406 6.86635 237.543L0.0114443 22.686Z"
                fill="url(#paint0_linear_9216_53603)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_9216_53603"
                    x1="219.291"
                    y1="-53.6394"
                    x2="219.291"
                    y2="303.66"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#737477" />
                    <stop offset="0.490425" stopColor="#D2D2D2" />
                </linearGradient>
            </defs>
        </svg>
    )
}

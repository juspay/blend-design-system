import React from 'react'

interface CodeCardProps {
    width?: number
    height?: number
    className?: string
}

export const CodeCard: React.FC<CodeCardProps> = ({
    width = 146,
    height = 167,
    className = '',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 173 190"
            fill="none"
            className={className}
        >
            <g filter="url(#filter0_n_8476_53461)">
                <rect
                    x="28.84"
                    width="146.337"
                    height="167.242"
                    rx="14.6393"
                    transform="rotate(9.92998 28.84 0)"
                    fill="#FCFCFD"
                />
                <rect
                    x="29.4495"
                    y="0.868098"
                    width="144.837"
                    height="165.742"
                    rx="13.8893"
                    transform="rotate(9.92998 29.4495 0.868098)"
                    stroke="#E1E4EA"
                    strokeWidth="1.5"
                />
                <path
                    opacity="0.2"
                    d="M94.8835 75.7483L92.917 87.462L104.631 89.4285L94.8835 75.7483Z"
                    fill="#717784"
                />
                <path
                    d="M94.8835 75.7483L92.917 87.462L104.631 89.4285"
                    stroke="#99A0AE"
                    strokeWidth="2.2624"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M91.5124 95.8289L95.6898 101.692L89.8268 105.869"
                    stroke="#99A0AE"
                    strokeWidth="2.2624"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M81.4725 94.1433L75.6096 98.3207L79.7869 104.184"
                    stroke="#99A0AE"
                    strokeWidth="2.2624"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M98.1817 117.595C98.6255 117.67 99.0807 117.565 99.4472 117.304C99.8137 117.042 100.061 116.646 100.136 116.203L104.631 89.4284L94.8836 75.7482L74.803 72.3771C74.3592 72.3026 73.9039 72.4075 73.5374 72.6686C73.1709 72.9297 72.9232 73.3258 72.8487 73.7696L66.6683 110.584C66.5938 111.028 66.6986 111.483 66.9598 111.85C67.2209 112.216 67.6169 112.464 68.0607 112.538L98.1817 117.595Z"
                    stroke="#99A0AE"
                    strokeWidth="2.2624"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <filter
                    id="filter0_n_8476_53461"
                    x="0.000186414"
                    y="0"
                    width="172.985"
                    height="189.972"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="2.732372522354126 2.732372522354126"
                        stitchTiles="stitch"
                        numOctaves="3"
                        result="noise"
                        seed="6278"
                    />
                    <feComponentTransfer in="noise" result="coloredNoise1">
                        <feFuncR type="linear" slope="2" intercept="-0.5" />
                        <feFuncG type="linear" slope="2" intercept="-0.5" />
                        <feFuncB type="linear" slope="2" intercept="-0.5" />
                        <feFuncA
                            type="discrete"
                            tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                        />
                    </feComponentTransfer>
                    <feComposite
                        operator="in"
                        in2="shape"
                        in="coloredNoise1"
                        result="noise1Clipped"
                    />
                    <feComponentTransfer in="noise1Clipped" result="color1">
                        <feFuncA type="table" tableValues="0 0.2" />
                    </feComponentTransfer>
                    <feMerge result="effect1_noise_8476_53461">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    )
}

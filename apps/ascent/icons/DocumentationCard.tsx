import React from 'react'

interface DocumentationCardProps {
    width?: number
    height?: number
    className?: string
}

export const DocumentationCard: React.FC<DocumentationCardProps> = ({
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
            <g filter="url(#filter0_n_8476_53455)">
                <rect
                    y="24.8999"
                    width="146.337"
                    height="167.242"
                    rx="14.6393"
                    transform="rotate(-9.79681 0 24.8999)"
                    fill="#FCFCFD"
                />
                <rect
                    x="0.866679"
                    y="25.5114"
                    width="144.837"
                    height="165.742"
                    rx="13.8893"
                    transform="rotate(-9.79681 0.866679 25.5114)"
                    stroke="#E1E4EA"
                    strokeWidth="1.5"
                />
                <path
                    d="M79.9326 92.8335L94.7456 90.4724"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M80.877 98.7588L95.69 96.3977"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M70.6797 111.017C71.4654 110.891 72.1692 110.459 72.6362 109.815C73.1033 109.171 73.2953 108.368 73.1701 107.582L69.6284 85.3624C69.5658 84.9695 69.6618 84.5678 69.8953 84.2458C70.1288 83.9237 70.4807 83.7076 70.8736 83.6449L100.5 78.9227C100.892 78.8601 101.294 78.9561 101.616 79.1896C101.938 79.4232 102.154 79.7751 102.217 80.1679L105.759 102.387C105.884 103.173 105.692 103.976 105.225 104.621C104.758 105.265 104.054 105.697 103.268 105.822L70.6797 111.017Z"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M70.6798 111.017C69.894 111.142 69.0907 110.95 68.4466 110.483C67.8024 110.016 67.3702 109.312 67.2449 108.526L64.4116 90.7507"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <filter
                    id="filter0_n_8476_53455"
                    x="0"
                    y="8.56192e-06"
                    width="172.66"
                    height="189.703"
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
                    <feMerge result="effect1_noise_8476_53455">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    )
}

import React from 'react'

interface StorybookCardProps {
    width?: number
    height?: number
    className?: string
}

export const StorybookCard: React.FC<StorybookCardProps> = ({
    width = 157,
    height = 176,
    className = '',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 157 176"
            fill="none"
            className={className}
        >
            <g filter="url(#filter0_n_8476_53457)">
                <rect
                    y="8.93638"
                    width="146.337"
                    height="167.242"
                    rx="14.6393"
                    transform="rotate(-3.50107 0 8.93638)"
                    fill="#FCFCFD"
                />
                <rect
                    x="0.794401"
                    y="9.63918"
                    width="144.837"
                    height="165.742"
                    rx="13.8893"
                    transform="rotate(-3.50107 0.794401 9.63918)"
                    stroke="#E1E4EA"
                    strokeWidth="1.5"
                />
                <g clipPath="url(#clip0_8476_53457)">
                    <path
                        d="M83.576 66.9618L83.8365 71.6429C83.8399 71.7021 83.8601 71.7591 83.8948 71.8072C83.9296 71.8553 83.9773 71.8924 84.0324 71.9143C84.0875 71.9361 84.1477 71.9418 84.206 71.9306C84.2642 71.9193 84.318 71.8917 84.361 71.8509L86.0461 70.2925L87.7145 71.3413C87.763 71.3672 87.8175 71.3798 87.8724 71.3778C87.9274 71.3758 87.9808 71.3593 88.0273 71.33C88.0738 71.3006 88.1117 71.2594 88.1371 71.2106C88.1625 71.1619 88.1745 71.1072 88.1719 71.0523L87.5245 66.3231L89.7945 65.922C90.075 65.8749 90.3621 65.8859 90.6381 65.9544C90.9142 66.023 91.1731 66.1476 91.399 66.3204C91.6248 66.4933 91.8127 66.7107 91.9509 66.9593C92.0891 67.2078 92.1747 67.4822 92.2025 67.7652L95.9232 104.911C95.9516 105.191 95.9228 105.474 95.8385 105.742C95.7541 106.011 95.6161 106.259 95.4327 106.472C95.2494 106.686 95.0245 106.86 94.7719 106.983C94.5192 107.107 94.244 107.178 93.9631 107.192L66.1514 108.727C65.6287 108.758 65.1137 108.59 64.7098 108.256C64.3059 107.923 64.043 107.449 63.9739 106.93L59.2734 73.009C59.23 72.7395 59.2402 72.4641 59.3034 72.1986C59.3666 71.933 59.4817 71.6826 59.6419 71.4616C59.8021 71.2406 60.0043 71.0534 60.237 70.9108C60.4698 70.7681 60.7283 70.6728 60.998 70.6303L83.5554 66.9291L83.576 66.9618ZM79.8571 83.0713C79.9381 83.8796 85.3328 82.9397 86.0172 82.3154C85.4659 76.8122 82.2169 74.2022 76.817 74.7431C71.3998 75.2857 68.6866 78.5451 69.1293 82.9648C69.8958 90.6175 80.228 89.7216 80.6466 93.9005C80.7671 95.1043 80.2857 95.8473 79.0303 95.9731C77.3794 96.1384 76.6243 95.363 76.4226 92.4824C76.3606 91.8633 70.0629 92.2857 69.9392 93.1318C70.1691 100.109 74.67 101.69 79.6056 101.196C84.4036 100.715 87.896 97.7774 87.4326 93.1513C86.6109 84.9482 76.143 86.2225 75.7364 82.164C75.5694 80.4958 76.7852 80.1483 77.4903 80.0776C78.2641 80.0001 79.652 79.9827 79.8589 83.0885L79.8571 83.0713Z"
                        fill="#717784"
                    />
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_n_8476_53457"
                    x="0"
                    y="0.000104277"
                    width="156.277"
                    height="175.866"
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
                    <feMerge result="effect1_noise_8476_53457">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
                <clipPath id="clip0_8476_53457">
                    <rect
                        width="41.48"
                        height="41.48"
                        fill="white"
                        transform="translate(55.4346 69.3636) rotate(-5.72)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

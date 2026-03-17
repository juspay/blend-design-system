import React from 'react'

interface FigmaCardProps {
    width?: number
    height?: number
    className?: string
}

export const FigmaCard: React.FC<FigmaCardProps> = ({
    width = 146,
    height = 167,
    className = '',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 267 293"
            fill="none"
            className={className}
        >
            <g filter="url(#filter0_n_8476_53500)">
                <rect
                    x="44.7437"
                    width="225.459"
                    height="257.667"
                    rx="22.5545"
                    transform="rotate(10 44.7437 0)"
                    fill="#FCFCFD"
                />
                <rect
                    x="45.681"
                    y="1.33861"
                    width="223.148"
                    height="255.356"
                    rx="21.399"
                    transform="rotate(10 45.681 1.33861)"
                    stroke="#E1E4EA"
                    strokeWidth="2.31103"
                />
                <path
                    d="M144.432 159.032C150.118 160.041 155.546 156.249 156.555 150.563C157.564 144.877 153.772 139.449 148.086 138.44C142.4 137.431 136.972 141.222 135.963 146.909C134.954 152.595 138.745 158.023 144.432 159.032Z"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M137.79 136.613L148.086 138.44C150.817 138.925 153.628 138.305 155.902 136.716C158.175 135.128 159.725 132.702 160.21 129.971C160.694 127.24 160.074 124.429 158.486 122.155C156.898 119.882 154.472 118.332 151.741 117.848L141.445 116.021"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M141.444 116.02L128.574 113.736C125.844 113.252 123.032 113.872 120.759 115.46C118.485 117.048 116.936 119.474 116.451 122.205C115.966 124.936 116.586 127.747 118.175 130.021C119.763 132.294 122.189 133.844 124.92 134.328L137.79 136.613L141.444 116.02Z"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M137.79 136.613L124.92 134.328C122.189 133.844 119.378 134.464 117.104 136.052C114.831 137.64 113.281 140.067 112.797 142.797C112.312 145.528 112.932 148.339 114.52 150.613C116.109 152.886 118.535 154.436 121.266 154.921L134.136 157.205L137.79 136.613Z"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M134.135 157.205L122.552 155.149C120.261 154.742 117.901 155.024 115.771 155.959C113.64 156.894 111.834 158.439 110.582 160.4C109.33 162.361 108.687 164.649 108.735 166.976C108.783 169.302 109.52 171.561 110.853 173.469C112.185 175.376 114.053 176.846 116.221 177.691C118.388 178.537 120.758 178.721 123.03 178.22C125.302 177.719 127.375 176.555 128.986 174.876C130.596 173.197 131.673 171.079 132.08 168.788L134.135 157.205Z"
                    stroke="#99A0AE"
                    strokeWidth="3.48565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    opacity="0.2"
                    d="M144.432 159.032C150.118 160.041 155.546 156.249 156.555 150.563C157.564 144.877 153.772 139.449 148.086 138.44C142.4 137.431 136.972 141.222 135.963 146.909C134.954 152.595 138.745 158.023 144.432 159.032Z"
                    fill="#99A0AE"
                />
                <path
                    opacity="0.2"
                    d="M141.444 116.02L128.574 113.736C125.844 113.252 123.032 113.872 120.759 115.46C118.485 117.048 116.936 119.474 116.451 122.205C115.966 124.936 116.586 127.747 118.175 130.021C119.763 132.294 122.189 133.844 124.92 134.328L137.79 136.613L141.444 116.02Z"
                    fill="#99A0AE"
                />
                <path
                    opacity="0.2"
                    d="M134.135 157.205L122.552 155.149C120.261 154.742 117.901 155.024 115.771 155.959C113.64 156.894 111.834 158.439 110.582 160.4C109.33 162.361 108.687 164.649 108.735 166.976C108.783 169.302 109.52 171.561 110.853 173.469C112.185 175.376 114.053 176.846 116.221 177.691C118.388 178.537 120.758 178.721 123.03 178.22C125.302 177.719 127.375 176.555 128.986 174.876C130.596 173.197 131.673 171.079 132.08 168.788L134.135 157.205Z"
                    fill="#99A0AE"
                />
            </g>
            <defs>
                <filter
                    id="filter0_n_8476_53500"
                    x="0"
                    y="0"
                    width="266.777"
                    height="292.903"
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
                        baseFrequency="1.7734805345535278 1.7734805345535278"
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
                    <feMerge result="effect1_noise_8476_53500">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    )
}

const Gradient = ({ className }: { className: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1258"
            height="483"
            viewBox="0 0 1258 1183"
            fill="none"
            className={className}
        >
            <g opacity="0.1" filter="url(#filter0_f_4073_4474)">
                <circle
                    cx="1093.05"
                    cy="90.4712"
                    r="592.366"
                    fill="url(#paint0_radial_4073_4474)"
                    fillOpacity="0.3"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_4073_4474"
                    x="0.6875"
                    y="-1001.89"
                    width="2184.73"
                    height="2184.73"
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
                    <feGaussianBlur
                        stdDeviation="250"
                        result="effect1_foregroundBlur_4073_4474"
                    />
                </filter>
                <radialGradient
                    id="paint0_radial_4073_4474"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(1093.05 90.4712) rotate(90) scale(592.366)"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0.8" />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default Gradient

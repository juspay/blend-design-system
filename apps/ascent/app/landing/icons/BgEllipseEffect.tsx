import React from 'react'

export const BgEllipseEffect = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1728"
            height="1207"
            viewBox="0 0 1728 1207"
            fill="none"
            style={{ position: 'absolute' }}
        >
            <g
                style={{ mixBlendMode: 'hard-light' }}
                opacity="0.3"
                filter="url(#filter0_f_3101_6032)"
            >
                <circle
                    cx="932.501"
                    cy="113.959"
                    r="592.366"
                    fill="url(#paint0_radial_3101_6032)"
                    fillOpacity="0.7"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_3101_6032"
                    x="-159.865"
                    y="-978.406"
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
                        result="effect1_foregroundBlur_3101_6032"
                    />
                </filter>
                <radialGradient
                    id="paint0_radial_3101_6032"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(932.501 113.959) rotate(90) scale(592.366)"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0.8" />
                </radialGradient>
            </defs>
        </svg>
    )
}

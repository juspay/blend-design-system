'use client'

interface CursorIconProps {
    color: string
    filterId: string
    className?: string
    style?: React.CSSProperties
}

export default function CursorIcon({
    color,
    filterId,
    className = '',
    style,
}: CursorIconProps) {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            <defs>
                <filter
                    id={filterId}
                    x="-4.8399e-05"
                    y="-4.8399e-05"
                    width="20.275"
                    height="20.4546"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1.14553" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                    />
                </filter>
            </defs>
            <g filter={`url(#${filterId})`}>
                <path
                    d="M2.35666 3.81453C2.02429 2.85388 3.01478 1.96844 3.93232 2.40599L17.3312 8.7957C18.3188 9.26667 18.1471 10.7218 17.077 10.95L11.2858 12.1851C10.8666 12.2745 10.5324 12.5904 10.4196 13.0039L9.2422 17.3194C8.94565 18.4063 7.42288 18.4571 7.0545 17.3924L2.35666 3.81453Z"
                    fill={color}
                />
                <path
                    d="M3.71676 2.85733L17.1157 9.24716C17.6723 9.51256 17.5758 10.3327 16.9728 10.4613L11.1817 11.6964C10.5796 11.8248 10.0998 12.2784 9.93773 12.8724L8.7602 17.1882C8.5929 17.8002 7.73502 17.8288 7.52718 17.2294L2.82917 3.65071C2.64221 3.10957 3.19988 2.6111 3.71676 2.85733Z"
                    stroke="white"
                />
            </g>
        </svg>
    )
}

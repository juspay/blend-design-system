import { useId, type SVGProps } from 'react'

export interface TemplatesIconProps extends SVGProps<SVGSVGElement> {
    /** Background accent color (default: #E9D4FF) */
    color?: string
}

export function TemplatesIcon({
    color = '#E9D4FF',
    width = 75,
    height = 48,
    ...props
}: TemplatesIconProps) {
    const clipId = useId()

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 75 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={props['aria-label'] ? undefined : true}
            {...props}
        >
            <g clipPath={`url(#${clipId})`}>
                <rect width="74.3369" height="48" rx="2" fill={color} />
                <rect
                    x="9.02051"
                    y="7.71289"
                    width="94.917"
                    height="66.2979"
                    fill="white"
                />
                <rect
                    x="13.4561"
                    y="12.8726"
                    width="56.624"
                    height="5.27686"
                    fill="#F2F4F8"
                />
                <rect
                    x="13.4561"
                    y="21.3613"
                    width="56.624"
                    height="5.27686"
                    fill="#F2F4F8"
                />
                <rect
                    x="13.4561"
                    y="29.8501"
                    width="26.1855"
                    height="22.103"
                    fill="#F2F4F8"
                />
                <rect
                    x="43.624"
                    y="29.8501"
                    width="26.4561"
                    height="22.103"
                    fill="#F2F4F8"
                />
            </g>
            <defs>
                <clipPath id={clipId}>
                    <rect width="74.3369" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

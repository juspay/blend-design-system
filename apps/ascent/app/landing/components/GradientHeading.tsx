import React from 'react'

export const GradientHeading = ({
    text,
    classes,
}: {
    text: string
    classes?: string
}) => {
    return (
        <div className={`mt-50 flex items-center ${classes}`}>
            <div
                className="text-8 tracking-[80px] uppercase"
                style={{
                    background:
                        'linear-gradient(90deg, #68686880 0%, #D0D0D0 53%, #68686880 100%)',
                    backgroundClip: 'text',
                }}
            >
                <p className="text-transparent">{text}</p>
            </div>
        </div>
    )
}

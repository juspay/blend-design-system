const GradientBorderComponent = ({
    children,
    thickness,
    borderColor,
    width,
    height,
    rounded,
    bgColor,
    className,
}: {
    children: React.ReactNode
    thickness: string
    borderColor: string
    width: string
    bgColor: string
    height?: string
    rounded?: string
    className?: string
}) => {
    return (
        <div
            className={`${thickness} ${borderColor} ${width} ${height} ${rounded}`}
        >
            <div className={`h-full w-full ${bgColor} ${rounded} ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default GradientBorderComponent

const StepperLine = ({
    color = '#CACFD8',
    strokeWidth = '1.2',
}: {
    color?: string
    strokeWidth?: string
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="2"
            viewBox="0 0 111 2"
            fill="none"
        >
            <path d="M0 1H110.708" stroke={color} strokeWidth={strokeWidth} />
        </svg>
    )
}

export default StepperLine

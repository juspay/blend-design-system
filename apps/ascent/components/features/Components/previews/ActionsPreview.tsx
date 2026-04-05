const ActionsPreview = () => (
    <div className="relative flex items-center justify-center w-full max-w-42">
        {/* Card container */}
        <div className="w-full bg-background rounded-lg border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)] p-3">
            {/* Button */}
            <div className="w-full h-8 flex items-center justify-center bg-primary rounded-md text-background text-[13px] font-medium text-center font-manrope">
                Button
            </div>
        </div>
        {/* Cursor */}
        <div className="absolute bottom-2 right-8 transform translate-x-1/2 translate-y-1/2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="31"
                viewBox="0 0 28 31"
                fill="none"
            >
                <g filter="url(#filter0_d_10511_13572)">
                    <path
                        d="M3.03218 2.10066C3.03487 0.390424 4.97124 -0.599729 6.35932 0.39934L23.2032 12.5227C24.8393 13.7003 24.0378 16.2828 22.0224 16.3271L13.4092 16.5163C12.7626 16.5305 12.1587 16.8418 11.772 17.36L6.7831 24.0461C5.57349 25.6672 2.99638 24.8094 2.99957 22.7868L3.03218 2.10066Z"
                        fill="#C96CFF"
                    />
                    <path
                        d="M3.73264 2.10203C3.73443 0.961876 5.0253 0.301802 5.95069 0.967847L22.7943 13.0905C23.8849 13.8755 23.3507 15.5974 22.0075 15.6273L13.3943 15.8165C12.5323 15.8354 11.7267 16.2506 11.2111 16.9416L6.22178 23.6279C5.41523 24.7081 3.69725 24.1359 3.69938 22.7877L3.73264 2.10203Z"
                        stroke="white"
                        strokeWidth="1.40016"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_10511_13572"
                        x="0"
                        y="0"
                        width="27.0801"
                        height="30.8943"
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
                        <feOffset dy="3" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_10511_13572"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_10511_13572"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    </div>
)

export default ActionsPreview

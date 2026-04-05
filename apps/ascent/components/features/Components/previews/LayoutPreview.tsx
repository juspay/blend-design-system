const LayoutPreview = () => (
    <div className="relative flex flex-col items-center justify-center gap-2.5 w-full">
        {/* Top card - smaller */}
        <div className="w-48 flex items-center justify-between p-3 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            <div className="flex-1 h-1.5 bg-border rounded-full" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
                className="text-primary ml-2"
            >
                <path
                    d="M10.9618 0.30873C10.924 0.217366 10.8599 0.13927 10.7777 0.0843161C10.6955 0.0293627 10.5989 2.04755e-05 10.5 1.5489e-07H0.500374C0.40143 -7.77087e-05 0.304688 0.0292027 0.222394 0.0841345C0.1401 0.139066 0.0759557 0.217179 0.038081 0.308585C0.000206239 0.39999 -0.00969568 0.500578 0.00962875 0.597614C0.0289532 0.69465 0.0766351 0.783771 0.146638 0.853694L5.14644 5.85337C5.19287 5.89985 5.24802 5.93673 5.30871 5.96189C5.36941 5.98705 5.43447 6 5.50018 6C5.56588 6 5.63094 5.98705 5.69164 5.96189C5.75233 5.93673 5.80748 5.89985 5.85391 5.85337L10.8537 0.853694C10.9236 0.783735 10.9712 0.694617 10.9904 0.597613C11.0097 0.500608 10.9997 0.400076 10.9618 0.30873Z"
                    fill="currentColor"
                />
            </svg>
        </div>
        {/* Middle card - larger */}
        <div className="w-full max-w-56 flex flex-col gap-2 p-3 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            <div className="flex items-center justify-between">
                <div className="flex-1 h-1.5 bg-border rounded-full" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="6"
                    viewBox="0 0 11 6"
                    fill="none"
                    className="text-primary ml-3 rotate-180"
                >
                    <path
                        d="M10.9618 0.30873C10.924 0.217366 10.8599 0.13927 10.7777 0.0843161C10.6955 0.0293627 10.5989 2.04755e-05 10.5 1.5489e-07H0.500374C0.40143 -7.77087e-05 0.304688 0.0292027 0.222394 0.0841345C0.1401 0.139066 0.0759557 0.217179 0.038081 0.308585C0.000206239 0.39999 -0.00969568 0.500578 0.00962875 0.597614C0.0289532 0.69465 0.0766351 0.783771 0.146638 0.853694L5.14644 5.85337C5.19287 5.89985 5.24802 5.93673 5.30871 5.96189C5.36941 5.98705 5.43447 6 5.50018 6C5.56588 6 5.63094 5.98705 5.69164 5.96189C5.75233 5.93673 5.80748 5.89985 5.85391 5.85337L10.8537 0.853694C10.9236 0.783735 10.9712 0.694617 10.9904 0.597613C11.0097 0.500608 10.9997 0.400076 10.9618 0.30873Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <div className="w-3/4 h-1.5 bg-border rounded-full" />
            <div className="w-1/2 h-1.5 bg-border rounded-full" />
        </div>
        {/* Bottom card - smaller */}
        <div className="w-48 flex items-center justify-between p-3 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            <div className="flex-1 h-1.5 bg-border rounded-full" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
                className="text-primary ml-3"
            >
                <path
                    d="M10.9618 0.30873C10.924 0.217366 10.8599 0.13927 10.7777 0.0843161C10.6955 0.0293627 10.5989 2.04755e-05 10.5 1.5489e-07H0.500374C0.40143 -7.77087e-05 0.304688 0.0292027 0.222394 0.0841345C0.1401 0.139066 0.0759557 0.217179 0.038081 0.308585C0.000206239 0.39999 -0.00969568 0.500578 0.00962875 0.597614C0.0289532 0.69465 0.0766351 0.783771 0.146638 0.853694L5.14644 5.85337C5.19287 5.89985 5.24802 5.93673 5.30871 5.96189C5.36941 5.98705 5.43447 6 5.50018 6C5.56588 6 5.63094 5.98705 5.69164 5.96189C5.75233 5.93673 5.80748 5.89985 5.85391 5.85337L10.8537 0.853694C10.9236 0.783735 10.9712 0.694617 10.9904 0.597613C11.0097 0.500608 10.9997 0.400076 10.9618 0.30873Z"
                    fill="currentColor"
                />
            </svg>
        </div>
        {/* Cursor pointing at middle card chevron */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 translate-x-2">
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

export default LayoutPreview

import PreviewCursorIcon from '@/icons/PreviewCursorIcon'

const LayoutPreview = () => (
    <div className="relative flex flex-col items-center justify-center gap-2.5 w-full">
        {/* Top card - smaller */}
        <div className="w-48 flex items-center justify-between p-3 bg-background rounded-xl border border-border shadow-card">
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
        <div className="w-full max-w-56 flex flex-col gap-2 p-3 bg-background rounded-xl border border-border shadow-card">
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
        <div className="w-48 flex items-center justify-between p-3 bg-background rounded-xl border border-border shadow-card">
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
            <PreviewCursorIcon />
        </div>
    </div>
)

export default LayoutPreview

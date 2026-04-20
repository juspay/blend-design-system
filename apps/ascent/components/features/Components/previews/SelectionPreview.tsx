const SelectionPreview = () => (
    <div className="flex flex-col justify-center items-center gap-2.5 w-full">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)] w-56">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-background"
                >
                    <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="flex-1 h-1.5 bg-border rounded-full" />
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)] w-46">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-background"
                >
                    <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="flex-1 h-2 bg-border rounded-full" />
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 bg-background rounded-lg border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)] w-38">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-background"
                >
                    <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="flex-1 h-2 bg-border rounded-full" />
        </div>
    </div>
)

export default SelectionPreview

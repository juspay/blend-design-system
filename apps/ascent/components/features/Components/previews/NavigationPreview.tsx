const NavigationPreview = () => (
    <div className="flex items-center justify-center w-full max-w-64">
        <div className="w-full flex items-center gap-2 px-3 py-2.5 bg-background rounded-xl border border-border shadow-card">
            {/* Home icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-foreground"
            >
                <path
                    d="M14 7.50002V13.5C14 13.6326 13.9473 13.7598 13.8536 13.8536C13.7598 13.9473 13.6326 14 13.5 14H10C9.86739 14 9.74021 13.9473 9.64645 13.8536C9.55268 13.7598 9.5 13.6326 9.5 13.5V10.25C9.5 10.1837 9.47366 10.1201 9.42678 10.0732C9.37989 10.0264 9.3163 10 9.25 10H6.75C6.6837 10 6.62011 10.0264 6.57322 10.0732C6.52634 10.1201 6.5 10.1837 6.5 10.25V13.5C6.5 13.6326 6.44732 13.7598 6.35355 13.8536C6.25979 13.9473 6.13261 14 6 14H2.5C2.36739 14 2.24021 13.9473 2.14645 13.8536C2.05268 13.7598 2 13.6326 2 13.5V7.50002C2.00012 7.23486 2.10556 6.98059 2.29312 6.79315L7.29313 1.79315C7.48064 1.60576 7.7349 1.50049 8 1.50049C8.2651 1.50049 8.51936 1.60576 8.70687 1.79315L13.7069 6.79315C13.8944 6.98059 13.9999 7.23486 14 7.50002Z"
                    fill="currentColor"
                />
            </svg>
            {/* Slash separator */}
            <div className="w-px h-5 bg-border rotate-12" />
            {/* First breadcrumb item */}
            <div className="flex-1 h-1.5 bg-border rounded-full" />
            {/* Slash separator */}
            <div className="w-px h-5 bg-border rotate-12" />
            {/* Second breadcrumb item */}
            <div className="flex-1 h-1.5 bg-border rounded-full" />
        </div>
    </div>
)

export default NavigationPreview

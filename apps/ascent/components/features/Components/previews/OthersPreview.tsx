const OthersPreview = () => (
    <div className="flex items-center justify-center w-full max-w-56">
        <div className="relative w-full flex items-center px-1 py-2 bg-background rounded-full border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            {/* Track - filled left part */}
            <div className="absolute left-1 h-2.5 w-1/2 bg-primary rounded-full" />
            {/* Track - empty right part */}
            <div className="absolute left-1/2 h-2 w-[calc(50%-8px)]  rounded-full" />
            {/* Ticks on right side */}
            <div className="absolute right-4 flex items-center gap-1.5">
                {[...Array(14)].map((_, i) => (
                    <div key={i} className="w-px h-2 bg-border rounded-full" />
                ))}
            </div>
            {/* Handle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-6 border-background shadow-xl z-10" />
        </div>
    </div>
)

export default OthersPreview

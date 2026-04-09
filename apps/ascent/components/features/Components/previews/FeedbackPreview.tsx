import PreviewCursorIcon from '@/icons/PreviewCursorIcon'

const FeedbackPreview = () => (
    <div className="relative flex items-center justify-center w-full max-w-44">
        {/* Card container */}
        <div className="w-full flex flex-col items-center gap-3 px-6 py-5 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            {/* Avatar circle */}
            <div className="w-8 h-8 rounded-full bg-border" />
            {/* Text lines */}
            <div className="w-full h-1.5 bg-border rounded-full" />
            <div className="w-3/4 h-1.5 bg-border rounded-full" />
            {/* Button */}
            <div className="w-22 h-5 bg-primary rounded-lg mt-1" />
        </div>
        {/* Cursor */}
        <div className="absolute bottom-3 right-10 transform translate-x-1/2 translate-y-1/2">
            <PreviewCursorIcon />
        </div>
    </div>
)

export default FeedbackPreview

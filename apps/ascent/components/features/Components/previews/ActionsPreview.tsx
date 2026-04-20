import PreviewCursorIcon from '@/icons/PreviewCursorIcon'

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
            <PreviewCursorIcon />
        </div>
    </div>
)

export default ActionsPreview

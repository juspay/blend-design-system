const FormInputPreview = () => (
    <div className="flex flex-col gap-1.5 w-full max-w-48">
        <div className="flex items-center gap-1.5 p-3 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="flex-1 h-1.5 bg-border rounded-full" />
        </div>
        <div className="flex items-center gap-1.5 p-3 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="flex-1 h-1.5 bg-border rounded-full" />
        </div>
        <div className="flex items-center gap-1.5 p-3 bg-background rounded-xl border border-border shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="flex-1 h-1.5 bg-border rounded-full" />
        </div>
    </div>
)

export default FormInputPreview

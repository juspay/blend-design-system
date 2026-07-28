import InstallCommand from './InstallCommand'
import { DottedMap } from './DottedMap'

export default function HeroSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] border-b border-border mx-auto">
            <h1 className="p-6 text-[42px] lg:px-7 lg:py-8 lg:text-[56px] font-normal text-primary tracking-tight lg:leading-16 leading-12 border-r border-border">
                Built to <span className="text-blue-600">Blend,</span>
                <br />
                Powered by <br className="hidden lg:block" />
                Tokens
            </h1>

            <div className="relative min-h-50 lg:min-h-70 overflow-hidden bg-surface">
                <div className="absolute inset-0">
                    <DottedMap />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 lg:p-12 border-t lg:border-t-0 border-border">
                    <InstallCommand />
                </div>
            </div>
        </div>
    )
}

import {
    XIcon,
    FileCodeIcon,
    ArrowSquareOutIcon,
} from '@phosphor-icons/react/dist/ssr'
import CopyButton from './CopyButton'
import Link from 'next/link'

export default function DeveloperSection() {
    return (
        <div className="border-r border-border px-6 lg:px-0">
            <div className="border-b border-border">
                <div className="border-r border-border py-2 flex items-center gap-2.5 w-fit px-3">
                    <FileCodeIcon className="text-muted-foreground" size={14} />
                    <span className="font-mono text-sm text-muted-foreground">
                        developers.txt
                    </span>
                    <XIcon size={14} className="text-muted-foreground" />
                </div>
            </div>

            <div className="p-4 pb-12">
                <div className="font-mono text-sm">
                    <div className="flex gap-4">
                        <div className="text-blue-300 select-none text-right w-4">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <div key={n} className="text-xs leading-7">
                                    {n}
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 text-foreground font-medium">
                            <div className="text-xs leading-7">For Devs</div>
                            <div className="flex items-center gap-2 text-xs leading-7">
                                <span className="text-muted-foreground">-</span>
                                <span>Component Library</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs leading-7">
                                <span className="text-muted-foreground">-</span>
                                <span>Code Examples &amp; Best Practices</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs leading-7">
                                <span className="text-muted-foreground">-</span>
                                <span>Tokens</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs leading-7">
                                <span className="text-muted-foreground">-</span>
                                <Link
                                    href="/docs"
                                    className="bg-secondary hover:underline inline-flex items-center gap-1.5 px-1 rounded-md cursor-pointer"
                                >
                                    <span className="underline">
                                        Developer Docs
                                    </span>
                                    <ArrowSquareOutIcon size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block border-t border-border">
                <div className="flex items-center gap-1 px-3 pt-2">
                    <button className="text-xs font-mono text-muted-foreground px-2 py-1">
                        OUTPUT
                    </button>
                    <button className="text-xs font-mono text-foreground px-2 py-1 border-b-2 border-foreground">
                        TERMINAL
                    </button>
                </div>
                <div className="px-3 py-2 flex items-center">
                    <code className="text-sm font-mono text-red-500 dark:text-blue-500 px-2">
                        npm install{' '}
                        <span className="text-muted-foreground">@</span>
                        juspay<span className="text-muted-foreground">/</span>
                        blend<span className="text-muted-foreground">-</span>
                        design<span className="text-muted-foreground">-</span>
                        system
                    </code>
                    <CopyButton text="npm install @juspay/blend-design-system" />
                </div>
            </div>
        </div>
    )
}

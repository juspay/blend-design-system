import { highlight } from 'sugar-high'

type MigrationCodeDiffProps = {
    v1: string
    v2: string
    v1Label?: string
    v2Label?: string
    kind?: 'api' | 'tokens'
}

const isCode = (value: string) =>
    /(^\s*(import|export|const|type)\s|<\/?[A-Z]|[{};=]|\b\w+\.\w+)/m.test(
        value
    )

function DiffCode({
    value,
    highlighted,
}: {
    value: string
    highlighted: boolean
}) {
    if (!highlighted) return <code>{value}</code>

    return <code dangerouslySetInnerHTML={{ __html: highlight(value) }} />
}

export function MigrationCodeDiff({
    v1,
    v2,
    v1Label = 'v1',
    v2Label = 'v2',
    kind = 'api',
}: MigrationCodeDiffProps) {
    const v1IsCode = isCode(v1)
    const v2IsCode = isCode(v2)
    const beforeLabel = kind === 'tokens' ? 'V1 tokens' : 'V1'
    const afterLabel = kind === 'tokens' ? 'V2 tokens' : 'V2'

    return (
        <figure className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-background">
            <div className="grid overflow-hidden md:grid-cols-2">
                <section className="min-w-0 border-b border-border md:border-r md:border-b-0">
                    <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground">
                            −
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                            {beforeLabel}
                        </span>
                        {v1Label !== 'v1' && (
                            <span className="truncate border-l border-border pl-2 font-mono text-xs text-foreground">
                                {v1Label}
                            </span>
                        )}
                    </div>
                    <pre
                        className={`m-0 min-h-20 overflow-x-auto px-4 py-3.5 text-foreground ${
                            v1IsCode
                                ? 'font-mono text-[13px] leading-6'
                                : 'whitespace-pre-wrap break-words font-sans text-sm leading-6 text-secondary-foreground'
                        }`}
                    >
                        <DiffCode value={v1} highlighted={v1IsCode} />
                    </pre>
                </section>
                <section className="min-w-0">
                    <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground">
                            +
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                            {afterLabel}
                        </span>
                        {v2Label !== 'v2' && (
                            <span className="truncate border-l border-border pl-2 font-mono text-xs text-foreground">
                                {v2Label}
                            </span>
                        )}
                    </div>
                    <pre
                        className={`m-0 min-h-20 overflow-x-auto px-4 py-3.5 text-foreground ${
                            v2IsCode
                                ? 'font-mono text-[13px] leading-6'
                                : 'whitespace-pre-wrap break-words font-sans text-sm leading-6 text-secondary-foreground'
                        }`}
                    >
                        <DiffCode value={v2} highlighted={v2IsCode} />
                    </pre>
                </section>
            </div>
        </figure>
    )
}

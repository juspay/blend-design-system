import Link from 'next/link'
import { Ellipse } from '../../../icons/ellipse'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib'
import Circles from './Circles'

/** Small blue dot at border intersections for editorial grid aesthetic */
function BlueDot({ className = '' }: { className?: string }) {
    return (
        <div
            className={cn('absolute w-1.5 h-1.5 bg-blue-600 z-10', className)}
            aria-hidden="true"
        />
    )
}

export default function DescriptionSection() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] mx-auto">
                <div className="relative overflow-hidden bg-background max-h-120 hidden lg:block">
                    <Circles />
                </div>

                <div className="relative p-6 lg:p-10 lg:border-l border-border">
                    <BlueDot className="-top-[3px] -left-[3px] hidden lg:block" />
                    <BlueDot className="-top-[3px] -right-[3px] hidden lg:block" />
                    <BlueDot className="-bottom-[3px] -left-[3px] hidden lg:block" />
                    <BlueDot className="-bottom-[3px] -right-[3px] hidden lg:block" />
                    <div className="space-y-8">
                        <p className="text-[15px] text-foreground leading-relaxed">
                            Some products are consumer-facing. Some are merchant
                            tools. Others are deeply operational. They differ in
                            brand, tone, and context but for users, they&apos;re
                            part of one connected experience.
                        </p>

                        <p className="text-[15px] text-foreground leading-relaxed">
                            Blend is built to adapt to the systems it lives
                            within, shaping itself around existing patterns
                            rather than forcing a new identity. It stays
                            consistent where consistency matters, and flexible
                            where expression is needed. What you build keeps its
                            character. What users experience stays familiar.
                            Blend doesn&apos;t ask to be noticed. It works
                            quietly in the background, aligning with your system
                            so the product, not the framework, takes focus.
                        </p>

                        <div className="pt-2">
                            <p className="text-[15px] text-foreground leading-relaxed">
                                This belief shaped the Blend Design System.
                            </p>
                            <p className="text-[15px] text-foreground leading-relaxed">
                                Read why we named it &ldquo;
                                <Link
                                    href={ROUTES.blogWhyWeNamedItBlend}
                                    className="text-primary underline underline-offset-4 transition-colors"
                                >
                                    Blend
                                </Link>
                                &rdquo;.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

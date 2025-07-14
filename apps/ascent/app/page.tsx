'use client'
import { Snackbar } from 'blend-v1'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Snackbar />
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <Link
                        href="/docs"
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                    >
                        Docs
                    </Link>
                </div>
            </main>
        </div>
    )
}

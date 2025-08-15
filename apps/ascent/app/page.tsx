'use client'
import Link from 'next/link'
import { motion } from 'motion/react'

export default function Home() {
    return (
        // <div className="min-h-screen text-[var(--foreground)] flex items-center justify-center px-4 [background:var(--landing-background)]">
        //     <div className="max-w-2xl mx-auto text-center">
        //         {/* Logo/Brand */}
        //         <motion.div
        //             initial={{ opacity: 0, y: 20 }}
        //             animate={{ opacity: 1, y: 0 }}
        //             transition={{ duration: 0.6 }}
        //             className="mb-8"
        //         >
        //             <h1 className="text-7xl sm:text-8xl font-bold text-[var(--foreground)] mb-4">
        //                 Blend
        //             </h1>
        //             <p className="text-xl text-[var(--muted-foreground)] font-light">
        //                 Design System
        //             </p>
        //         </motion.div>

        //         {/* Coming Soon Badge */}
        //         <motion.div
        //             initial={{ opacity: 0, y: 20 }}
        //             animate={{ opacity: 1, y: 0 }}
        //             transition={{ duration: 0.6, delay: 0.2 }}
        //             className="mb-8"
        //         >
        //             <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--muted)] border border-[var(--border)] text-sm text-[var(--muted-foreground)]">
        //                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        //                 Coming Soon
        //             </div>
        //         </motion.div>

        //         {/* Description */}
        //         <motion.div
        //             initial={{ opacity: 0, y: 20 }}
        //             animate={{ opacity: 1, y: 0 }}
        //             transition={{ duration: 0.6, delay: 0.4 }}
        //             className="mb-12"
        //         >
        //             <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-lg mx-auto">
        //                 A comprehensive design system for modern applications.
        //                 Explore our documentation to get started.
        //             </p>
        //         </motion.div>

        //         {/* CTA Button */}
        //         <motion.div
        //             initial={{ opacity: 0, y: 20 }}
        //             animate={{ opacity: 1, y: 0 }}
        //             transition={{ duration: 0.6, delay: 0.6 }}
        //         >
        //             <Link
        //                 href="/docs"
        //                 className="inline-flex items-center px-6 py-3 text-base font-medium text-[var(--foreground)] bg-[var(--muted)] border border-[var(--border)] rounded-lg hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200"
        //             >
        //                 <span>View Documentation</span>
        //                 <svg
        //                     className="ml-2 w-4 h-4"
        //                     fill="none"
        //                     stroke="currentColor"
        //                     viewBox="0 0 24 24"
        //                 >
        //                     <path
        //                         strokeLinecap="round"
        //                         strokeLinejoin="round"
        //                         strokeWidth={2}
        //                         d="M9 5l7 7-7 7"
        //                     />
        //                 </svg>
        //             </Link>
        //         </motion.div>
        //     </div>
        // </div>
        <div className="min-h-screen [background:var(--landing-background)]">
            <p className="text-white">Hello</p>
        </div>
    )
}

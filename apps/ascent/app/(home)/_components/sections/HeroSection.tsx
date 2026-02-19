'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { CopyIcon } from '../icons'

const PACKAGE_MANAGERS = {
    npm: 'npm i',
    pnpm: 'pnpm add',
    yarn: 'yarn add',
} as const

type PackageManager = keyof typeof PACKAGE_MANAGERS

const PACKAGE_NAME = '@juspay/blend-design-system'

export default function HeroSection() {
    const [copied, setCopied] = useState(false)
    const [packageManager, setPackageManager] = useState<PackageManager>('npm')

    const installCommand = `${PACKAGE_MANAGERS[packageManager]} ${PACKAGE_NAME}`

    const handleCopy = () => {
        navigator.clipboard.writeText(installCommand)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border-b border-gray-200 mx-auto max-w-[1152px] border-l border-r">
            <div className="flex items-center p-6 lg:p-10">
                <h1 className="text-4xl lg:text-6xl font-normal text-gray-900 leading-[1.08] tracking-tight">
                    Built to <span className="text-blue-600">Blend,</span>
                    <br />
                    Powered by
                    <br />
                    Tokens
                </h1>
            </div>

            <div className="relative min-h-[200px] lg:min-h-[280px] overflow-hidden bg-gray-100">
                <div className="absolute inset-0">
                    <Image
                        src="/images/map.png"
                        alt="World map"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 lg:p-12">
                    <div className="max-w-sm">
                        <div>
                            <select
                                className="text-xs font-mono text-[#646464] font-medium bg-white border border-gray-200 border-b-0 rounded-t-lg px-2.5 py-1 outline-none cursor-pointer"
                                aria-label="Package manager"
                                value={packageManager}
                                onChange={(e) =>
                                    setPackageManager(
                                        e.target.value as PackageManager
                                    )
                                }
                            >
                                <option value="npm">npm</option>
                                <option value="pnpm">pnpm</option>
                                <option value="yarn">yarn</option>
                            </select>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-b-lg rounded-tr-lg py-2 px-4 flex items-center jus shadow-sm gap-3">
                            <p className="text-xs text-[#646464] truncate font-medium tracking-wider">
                                {installCommand}
                            </p>
                            <button
                                onClick={handleCopy}
                                className="hover:bg-gray-100 rounded transition-colors shrink-0"
                                aria-label="Copy install command"
                            >
                                {copied ? (
                                    <Check
                                        size={14}
                                        className="text-gray-600"
                                    />
                                ) : (
                                    <CopyIcon />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

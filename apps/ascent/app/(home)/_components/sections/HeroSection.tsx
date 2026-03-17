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
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] border-b border-gray-200 mx-auto max-w-[1152px] lg:border-l lg:border-r">
            <h1 className="p-6 text-[42px] lg:px-7 lg:py-8 lg:text-[56px] font-normal text-gray-900 tracking-tight lg:leading-16 leading-12">
                Built to <span className="text-blue-600">Blend,</span>
                <br />
                Powered by <br className="hidden lg:block" />
                Tokens
            </h1>

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

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 lg:p-12 border-t lg:border-t-0 border-gray-200">
                    <div className="max-w-sm">
                        <div>
                            <div className="relative inline-block">
                                <select
                                    className="appearance-none 
               text-xs font-mono font-medium text-[#646464]
               bg-white border border-gray-200 border-b-0
               rounded-t-lg
               pl-4 pr-5 py-1.5
               outline-none cursor-pointer"
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

                                <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center mr-1">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.64645 4.14645C2.84171 3.95118 3.15829 3.95118 3.35355 4.14645L6 6.79289L8.64645 4.14645C8.84171 3.95118 9.15829 3.95118 9.35355 4.14645C9.54882 4.34171 9.54882 4.65829 9.35355 4.85355L6.35355 7.85355C6.15829 8.04882 5.84171 8.04882 5.64645 7.85355L2.64645 4.85355C2.45118 4.65829 2.45118 4.34171 2.64645 4.14645Z"
                                            fill="#646464"
                                        />
                                    </svg>
                                </div>
                            </div>
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

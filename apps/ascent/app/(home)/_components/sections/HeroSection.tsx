'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Dither from '../effects/Dither'

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
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-200">
            <div className="flex items-center p-6 lg:p-10 lg:border-r border-gray-200">
                <h1 className="text-4xl lg:text-6xl font-normal text-gray-900 leading-[1.08] tracking-tight">
                    Built to <span className="text-blue-600">Blend,</span>
                    <br />
                    Powered by
                    <br />
                    Tokens
                </h1>
            </div>

            <div className="relative min-h-[200px] lg:min-h-[280px] overflow-hidden">
                <div className="absolute inset-0 opacity-50">
                    <Dither
                        waveColor={[1, 1, 1]}
                        disableAnimation={false}
                        enableMouseInteraction
                        mouseRadius={0}
                        colorNum={2}
                        pixelSize={2}
                        waveAmplitude={0.85}
                        waveFrequency={1.5}
                        waveSpeed={0.02}
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 lg:p-12">
                    <div className="w-full max-w-sm">
                        <div>
                            <select
                                className="text-sm font-mono text-gray-600 bg-white border border-gray-200 border-b-0 rounded-t-lg px-2.5 py-1 outline-none cursor-pointer"
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

                        <div className="bg-white border border-gray-200 rounded-b-lg rounded-tr-lg p-3 flex items-center justify-between shadow-sm">
                            <code className="text-sm font-mono text-gray-800 truncate">
                                {installCommand}
                            </code>
                            <button
                                onClick={handleCopy}
                                className="ml-3 p-1.5 hover:bg-gray-100 rounded transition-colors shrink-0"
                                aria-label="Copy install command"
                            >
                                {copied ? (
                                    <Check
                                        size={14}
                                        className="text-green-600"
                                    />
                                ) : (
                                    <Copy size={14} className="text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { CopyIcon } from '../../../icons'

const PACKAGE_MANAGERS = {
    npm: 'npm i',
    pnpm: 'pnpm add',
    yarn: 'yarn add',
} as const

type PackageManager = keyof typeof PACKAGE_MANAGERS

const PACKAGE_NAME = '@juspay/blend-design-system'

export default function InstallCommand() {
    const [copied, setCopied] = useState(false)
    const [packageManager, setPackageManager] = useState<PackageManager>('npm')

    const installCommand = `${PACKAGE_MANAGERS[packageManager]} ${PACKAGE_NAME}`

    const handleCopy = () => {
        navigator.clipboard.writeText(installCommand)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="max-w-sm">
            <div>
                <div className="relative inline-block">
                    <select
                        className="appearance-none 
                           text-xs font-mono font-medium text-foreground
                           bg-background border border-border border-b-0
                           rounded-t-lg
                           pl-4 pr-5 py-1.5
                           outline-none cursor-pointer"
                        aria-label="Package manager"
                        value={packageManager}
                        onChange={(e) =>
                            setPackageManager(e.target.value as PackageManager)
                        }
                    >
                        <option value="npm">npm</option>
                        <option value="pnpm">pnpm</option>
                        <option value="yarn">yarn</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center mr-1">
                        <ChevronDown size={12} className="text-foreground" />
                    </div>
                </div>
            </div>

            <div className="bg-background border border-border rounded-b-lg rounded-tr-lg py-2 px-4 flex items-center shadow-sm gap-3">
                <p className="text-xs text-foreground truncate font-medium tracking-wider">
                    {installCommand}
                </p>
                <button
                    onClick={handleCopy}
                    className="hover:bg-surface rounded transition-colors shrink-0"
                    aria-label="Copy install command"
                >
                    {copied ? (
                        <Check size={14} className="text-gray-600" />
                    ) : (
                        <CopyIcon />
                    )}
                </button>
            </div>
        </div>
    )
}

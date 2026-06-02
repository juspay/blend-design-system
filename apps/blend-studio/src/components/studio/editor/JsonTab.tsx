/**
 * JsonTab
 *
 * Raw JSON editor for the brand configuration with light/dark token preview.
 */

import { useState, useEffect } from 'react'
import {
    CaretDownIcon,
    CaretRightIcon,
    SunIcon,
    MoonStarsIcon,
} from '@phosphor-icons/react'
import type { EditorTabProps } from './types'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    CodeEditorV2,
} from '@juspay/blend-design-system'
import CollapsableHeader from '@/components/shared/CollapsableHeader'

export function JsonTab({ brand }: EditorTabProps) {
    const [validJson, setValidJson] = useState(() =>
        JSON.stringify(brand, null, 2)
    )
    const [isJsonOpen, setIsJsonOpen] = useState(true)
    const [isLightDarkTokensOpen, setIsLightDarkTokensOpen] = useState(false)

    useEffect(() => {
        setValidJson(JSON.stringify(brand, null, 2))
    }, [brand])

    const getLightTokens = () => ({
        theme: 'light',
        colors: brand.colors,
        font: brand.font,
        radius: brand.radius,
        shadows: brand.shadows,
        componentOverrides: brand.componentOverrides,
    })

    const getDarkTokens = () => ({
        theme: 'dark',
        colors: brand.darkModeOverrides?.colors || brand.colors,
        font: brand.font,
        radius: brand.darkModeOverrides?.radius || brand.radius,
        shadows: brand.darkModeOverrides?.shadows || brand.shadows,
        componentOverrides: brand.componentOverrides,
    })

    return (
        <div className="h-full flex flex-col min-h-0">
            <CollapsableHeader
                title="Valid JSON"
                isOpen={isJsonOpen}
                onToggle={() => setIsJsonOpen(!isJsonOpen)}
            />
            {isJsonOpen ? (
                <div className="flex-1 min-h-0 overflow-auto px-[12px] py-[12px]">
                    <CodeEditorV2
                        value={validJson}
                        language="json"
                        readOnly
                        header={{
                            showHeader: false,
                        }}
                        height={isLightDarkTokensOpen ? '33vh' : '83.5vh'}
                    />
                </div>
            ) : (
                <div className="flex-1 min-h-0" />
            )}

            <div className="shrink-0 w-full flex items-center justify-between px-[16px] py-[12px] outline outline-1 outline-gray-200 bg-white">
                <h3 className="font-medium text-gray-900 text-[14px] leading-[20px] inter-display">
                    Light/Dark Mode Tokens
                </h3>
                <ButtonV2
                    onClick={() =>
                        setIsLightDarkTokensOpen(!isLightDarkTokensOpen)
                    }
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.MEDIUM}
                    subType={ButtonV2SubType.INLINE}
                    leftSlot={{
                        slot: isLightDarkTokensOpen ? (
                            <CaretDownIcon size={16} />
                        ) : (
                            <CaretRightIcon size={16} />
                        ),
                    }}
                />
            </div>
            {isLightDarkTokensOpen && (
                <div className="max-h-[500px] overflow-y-auto">
                    <div className="shrink-0 px-[12px] pt-[12px]">
                        <CodeEditorV2
                            value={JSON.stringify(getLightTokens(), null, 2)}
                            language="json"
                            readOnly
                            header={{
                                showHeader: true,
                                title: 'Light Tokens',
                                leftSlot: <SunIcon size={20} weight="fill" />,
                            }}
                            height="300px"
                        />
                    </div>
                    <div className="shrink-0 px-[12px] py-[12px]">
                        <CodeEditorV2
                            value={JSON.stringify(getDarkTokens(), null, 2)}
                            language="json"
                            readOnly
                            header={{
                                showHeader: true,
                                title: 'Dark Tokens',
                                leftSlot: (
                                    <MoonStarsIcon size={20} weight="fill" />
                                ),
                            }}
                            height="300px"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

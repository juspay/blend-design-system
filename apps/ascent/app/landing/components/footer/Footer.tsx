import React from 'react'
import { ColoredLogo } from '../../icons/ColoredLogo'
import { FooterLogoText } from '../../icons/FooterLogoText'
import { FooterLinksData } from '../../data/footer-links-data'
import { Separator } from '../Separator'
import { IsoIcon } from '../../icons/IsoIcon'
import { GdprIcon } from '../../icons/GdprIcon'
import { PciIcon } from '../../icons/PciIcon'

export const Footer = () => {
    return (
        <footer className="px-[160px] pt-[80px] pb-[20px] border-t-[1px] border-white/20 rounded-[100px] w-full items-center justify-center flex flex-col gap-[48px]">
            <div className="flex gap-32">
                <div className="flex flex-col gap-[68px] pr-8">
                    <div className="flex items-center gap-1">
                        <ColoredLogo />
                        <FooterLogoText />
                    </div>
                    <div className="text-[#777E90] text-[14px]">
                        <p>29/30 Fitzwilliam Square S,</p>
                        <p>Dublin 2, Ireland</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-[80px]">
                    {FooterLinksData.map((data, key) => (
                        <div key={key} className="flex flex-col gap-8">
                            <p className="text-[18px] font-[700] text-white">
                                {data.title}
                            </p>
                            <div className="flex flex-col gap-4 text-[14px] text-[#777E90]">
                                {data.links.map((link, ind) => (
                                    <p key={ind}>{link.name}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Separator />
            <div className="mb-[48px] py-[24px] flex items-center gap-10 text-[#777E90] w-full">
                <p className="font-[12px]">
                    Copyright © 2024. Juspay Technologies . All rights reserved
                </p>
                <div className="flex items-center gap-4 flex-1 justify-end">
                    <p>Privacy Policy</p>
                    <div className="w-1 h-1 bg-[#777E90] rounded-full"></div>
                    <p>Terms of Service</p>
                </div>
                <div className="flex items-center gap-[14px] text-white">
                    <IsoIcon />
                    {/* <GdprIcon />
                <PciIcon /> */}
                </div>
            </div>
        </footer>
    )
}

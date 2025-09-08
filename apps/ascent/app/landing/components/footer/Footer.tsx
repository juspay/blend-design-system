'use client'

import React from 'react'
import { useState } from 'react'
import { ColoredLogo } from '../../icons/ColoredLogo'
import { FooterLogoText } from '../../icons/FooterLogoText'
import { FooterLinksData } from '../../data/footer-links-data'
import { Separator } from '../Separator'
import { IsoIcon } from '../../icons/IsoIcon'
import Link from 'next/link'
import { Modal } from '../connect-with-us/Modal'
import { GdprIcon } from '../../icons/GdprIcon'
import { PciIcon } from '../../icons/PciIcon'
import { MoveToTopArrow } from '../../icons/MoveToTopArrow'

export const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    return (
        <footer className="lg:px-40 md:px-15 sm:px-10 px-8 pt-20 pb-5 border-t-[1px] border-white/20 rounded-[100px] w-full items-center justify-center flex flex-col gap-[48px] bg-[#0C0C0C] z-30">
            <div className="flex justify-between w-full">
                <div className="grid md:grid-cols-4 grid-cols-1 gap-y-10 w-full justify-center">
                    <div className="flex flex-col lg:gap-8 gap-4  pr-8 w-fit">
                        <div className="flex items-center gap-1">
                            <ColoredLogo />
                            <FooterLogoText />
                        </div>
                        <div className="text-[var(--footer-text-color)] sm:text-[14px] text-[12px]">
                            <p>Bengaluru, India</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 justify-between gap-y-10 lg:gap-x-20 gap-x-12 w-full col-span-2">
                        {FooterLinksData.map((data, key) => (
                            <div key={key} className="flex flex-col gap-8">
                                <p className="sm:text-[18px] text-[14px] font-bold text-white capitalize">
                                    {data.title}
                                </p>
                                <div className="flex flex-col gap-4 sm:text-[14px] text-[12px] text-[var(--footer-text-color)]">
                                    {data.links.map((link, ind) =>
                                        link.name == 'Contact' ? (
                                            <p
                                                className="cursor-pointer"
                                                onClick={handleOpenModal}
                                                key={ind}
                                            >
                                                {link.name}
                                            </p>
                                        ) : (
                                            <Link
                                                href={link.link}
                                                key={ind}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p className="cursor-pointer">
                                                    {link.name}
                                                </p>
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}

                        {isModalOpen && <Modal onClose={handleCloseModal} />}
                    </div>
                </div>
                <div className="flex sm:justify-center">
                    <div
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        className="rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center opacity-80 border-[length:var(--padding-1-pixel)] border-[var(--footer-text-color)]"
                    >
                        <MoveToTopArrow />
                    </div>
                </div>
            </div>
            <Separator />
            <div className="sm:mb-12 py-6 flex sm:flex-row flex-col items-center sm:gap-10 gap-5 text-[var(--footer-text-color)] w-full sm:text-[14px] text-[12px]">
                <p className="font-[12px]">
                    Copyright © 2024. Juspay Technologies . All rights reserved
                </p>
                <div className="flex items-center gap-4 flex-1 justify-end">
                    <Link
                        href="https://juspay.io/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="cursor-pointer">Privacy Policy</p>
                    </Link>
                    <div className="w-1 h-1 bg-[var(--footer-circle-separator-color)] rounded-full"></div>
                    <Link
                        href="https://juspay.io/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="cursor-pointer">Terms of Service</p>
                    </Link>
                </div>
                <div className="flex items-center gap-[14px] text-white">
                    <IsoIcon />
                    <GdprIcon />
                    <PciIcon />
                </div>
            </div>
        </footer>
    )
}

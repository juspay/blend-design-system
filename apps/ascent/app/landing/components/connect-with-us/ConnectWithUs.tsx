'use client'

import React, { useState } from 'react'
import { ConnectWithUsBox } from '../../icons/ConnectWithUsBox'
import { InfoBtn } from '../InfoBtn'
import { FooterGradientAndSparkles } from '../../icons/FooterGradientAndSparkles'
import { Modal } from './Modal'

export const ConnectWithUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="lg:py-50 md:py-40 sm:py-32 py-20 flex flex-col items-center gap-10 relative overflow-hidden w-full max-w-screen">
            <div className="flex items-end">
                <ConnectWithUsBox />
                <p className="lg:text-5xl md:text-3xl sm:text-xl xs:text-md text-sm text-[var(--gray-text)] font-light -ml-10">
                    We're listening--tell us what you think.
                </p>
            </div>
            <div className="w-full flex items-center justify-center mt-5">
                <InfoBtn
                    text="Connect with us"
                    onClick={handleOpenModal}
                    style="absolute z-20"
                />
            </div>
            <FooterGradientAndSparkles />
            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </div>
    )
}

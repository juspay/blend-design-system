'use client'

import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        console.log('Is modal open state: ', isModalOpen)
    }, [isModalOpen])

    return (
        <div className="py-50 flex flex-col items-center gap-10 relative overflow-hidden w-full max-w-[100vw]">
            <div className="flex items-end">
                <ConnectWithUsBox />
                <p className="text-[48px] text-[#9E9E9E] font-[300] -ml-10">
                    We're listening--tell us what you think.
                </p>
            </div>
            <div>
                <InfoBtn
                    text="Connect with us"
                    onClick={handleOpenModal}
                    style="absolute z-[20]"
                />
            </div>
            <FooterGradientAndSparkles />
            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </div>
    )
}

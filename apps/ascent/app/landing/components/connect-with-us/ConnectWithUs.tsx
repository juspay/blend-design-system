import React from 'react'
import { ConnectWithUsBox } from '../../icons/ConnectWithUsBox'
import { InfoBtn } from '../InfoBtn'
import { FooterGradientAndSparkles } from '../../icons/FooterGradientAndSparkles'

export const ConnectWithUs = () => {
    return (
        <div className="my-50 flex flex-col items-center gap-10">
            <div className="flex items-end">
                <ConnectWithUsBox />
                <p className="text-[48px] text-[#9E9E9E] font-[300] -ml-10">
                    We're listening--tell us what you think.
                </p>
            </div>
            <InfoBtn text="Connect with us" />
            {/* <FooterGradientAndSparkles /> */}
        </div>
    )
}

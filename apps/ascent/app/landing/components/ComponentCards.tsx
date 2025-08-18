import React from 'react'
import { CompC1R1 } from '../icons/CompC1R1'
import { CompC1R2 } from '../icons/CompC1R2'
import { CompC2R1 } from '../icons/CompC2R1'
import { CompC2R2 } from '../icons/CompC2R2'
import { CompC3R1 } from '../icons/CompC3R1'
import { CompC3R2 } from '../icons/CompC3R2'
import { CompC4R1 } from '../icons/CompC4R1'
import { CompC4R2 } from '../icons/CompC4R2'

export const ComponentCards = () => {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
            <div className=" grid grid-cols-1 grid-rows-3 gap-y-6">
                <div className="row-span-1">
                    <CompC1R1 />
                </div>
                <div className="row-span-2">
                    <CompC1R2 />
                </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-2 gap-y-6">
                <div className="row-span-1">
                    <CompC2R1 />
                </div>
                <div className="row-span-1">
                    <CompC2R2 />
                </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-3 gap-y-6">
                <div className="row-span-2">
                    <CompC3R1 />
                </div>
                <div className="row-span-1">
                    <CompC3R2 />
                </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-3 ">
                <div className="row-span-1">
                    <CompC4R1 />
                </div>
                <div className="row-span-2 -mt-6">
                    <CompC4R2 />
                </div>
            </div>
        </div>
    )
}

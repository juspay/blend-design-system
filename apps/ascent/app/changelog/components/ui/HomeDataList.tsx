import React from 'react'
import HomeData from '../../data/home.data'
import { ChangeLogCard, DateBadge } from './ChangelogBlocks'
import { InfoBtn } from '@/app/(home)/_components/InfoBtn'

const HomeDataList: React.FC = () => {
    return (
        <>
            {HomeData.map((obj, key) => (
                <ChangeLogCard key={key}>
                    <DateBadge>{obj.date}</DateBadge>
                    <h2 className="text-[var(--grey-100)] lg:text-[length:var(--text-40)] md:text-3xl sm:text-2xl xs:text-xl text-lg">
                        {obj.heading}
                    </h2>
                    <div className="lg:text-2xl md:text-xl sm:text-lg xs:text-base text-sm text-[var(--grey-500)]">
                        {obj.paragraph}
                    </div>
                    <InfoBtn
                        text="Read more"
                        href={obj.link}
                        openSamePage={true}
                    />
                </ChangeLogCard>
            ))}
        </>
    )
}

export default HomeDataList

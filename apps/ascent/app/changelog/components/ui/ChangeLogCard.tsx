import DateBadge from './DateBadge'
import GradientBorderComponent from './GradientBorderWrapper'

const ChangeLogCard = () => {
    return (
        <article>
            <GradientBorderComponent
                thickness="p-[var(--pixel)]"
                borderColor="bg-[var(--grey-500)]"
                width="w-full"
                rounded="rounded-[var(--rounded-50)]"
                bgColor="bg-black"
                className="p-14 flex flex-col gap-16"
            >
                <DateBadge>August 14, 2025</DateBadge>
                <div className="flex flex-col gap-8">
                    <h2 className="text-[var(--grey-100)] text-[length:var(--text-40)]">
                        v 1.5.6 Bug Fix : Button Icon Alignment
                    </h2>
                    <p className="text-2xl text-[var(--grey-500)]">
                        This inconsistency was especially noticeable in cases
                        where buttons contained both leading and trailing icons,
                        making the layout feel visually off-balance and reducing
                        readability. We resolved this by refining the internal
                        padding values and updating the flex alignment rules
                        applied to the button’s content. Now, both text and
                        icons are vertically and horizontally centered,
                        maintaining consistent spacing across all button states
                        and variants (default, hover, active, and disabled).
                        This fix ensures that buttons look uniform across
                        different screen sizes and browsers, improving the
                        overall polish and usability of the component.
                    </p>
                </div>
            </GradientBorderComponent>
        </article>
    )
}

export default ChangeLogCard

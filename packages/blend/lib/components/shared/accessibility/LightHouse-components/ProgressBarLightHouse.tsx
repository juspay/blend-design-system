import {
    ProgressBar,
    ProgressBarSize,
    ProgressBarVariant,
    ProgressBarType,
} from '../../../ProgressBar'

const ProgressBarLightHouse = () => {
    return (
        <>
            {/* Linear Solid - Small */}
            <ProgressBar
                value={25}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.SOLID}
            />

            {/* Linear Solid - Medium */}
            <ProgressBar
                value={50}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
            />

            {/* Linear Solid - Large */}
            <ProgressBar
                value={75}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.SOLID}
            />

            {/* Linear Segmented - Small */}
            <ProgressBar
                value={30}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.SEGMENTED}
            />

            {/* Linear Segmented - Medium */}
            <ProgressBar
                value={60}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SEGMENTED}
            />

            {/* Linear Segmented - Large */}
            <ProgressBar
                value={90}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.SEGMENTED}
            />

            {/* Circular Solid - Small */}
            <ProgressBar
                value={25}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
            />

            {/* Circular Solid - Medium */}
            <ProgressBar
                value={50}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
            />

            {/* Circular Solid - Large */}
            <ProgressBar
                value={75}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
            />

            {/* Circular Segmented - Small */}
            <ProgressBar
                value={30}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
            />

            {/* Circular Segmented - Medium */}
            <ProgressBar
                value={60}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
            />

            {/* Circular Segmented - Large */}
            <ProgressBar
                value={90}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
            />

            {/* With Label - Linear Solid */}
            <ProgressBar
                value={45}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />

            {/* With Label - Linear Segmented */}
            <ProgressBar
                value={65}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SEGMENTED}
                showLabel={true}
            />

            {/* With Label - Circular Solid */}
            <ProgressBar
                value={80}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
                showLabel={true}
            />

            {/* With Label - Circular Segmented */}
            <ProgressBar
                value={35}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
                showLabel={true}
            />

            {/* Zero Value */}
            <ProgressBar
                value={0}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
            />

            {/* Full Value */}
            <ProgressBar
                value={100}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />

            {/* Custom Min/Max - Linear */}
            <ProgressBar
                value={50}
                min={0}
                max={200}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />

            {/* Custom Min/Max - Circular */}
            <ProgressBar
                value={75}
                min={0}
                max={150}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
                showLabel={true}
            />

            {/* Low Value */}
            <ProgressBar
                value={10}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />

            {/* Medium Value */}
            <ProgressBar
                value={50}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />

            {/* High Value */}
            <ProgressBar
                value={90}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />

            {/* All Linear Variants with Label */}
            <ProgressBar
                value={40}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.SOLID}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.SEGMENTED}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.SEGMENTED}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.SEGMENTED}
                showLabel={true}
            />

            {/* All Circular Variants with Label */}
            <ProgressBar
                value={40}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SOLID}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.SMALL}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.MEDIUM}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
                showLabel={true}
            />
            <ProgressBar
                value={40}
                size={ProgressBarSize.LARGE}
                variant={ProgressBarVariant.CIRCULAR}
                type={ProgressBarType.SEGMENTED}
                showLabel={true}
            />
        </>
    )
}

export default ProgressBarLightHouse

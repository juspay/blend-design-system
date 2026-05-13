export const getEffectiveTooltipContent = (
    text: string,
    tooltipContent?: string
): string => {
    return tooltipContent ?? text
}

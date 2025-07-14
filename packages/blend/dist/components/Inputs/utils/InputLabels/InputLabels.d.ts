type InputLabelsProps = {
    label: string
    sublabel?: string
    disabled?: boolean
    helpIconHintText?: string
    name?: string
    required?: boolean
}
/**
 * @description InputLabels is a component that displays a label and sublabel for an input field.
 * @param {string} label - The label for the input field.
 * @param {string} sublabel - The sublabel for the input field.
 * @param {boolean} disabled - Whether the input field is disabled.
 * @param {string} helpIconHintText - The hint text for the help icon.
 * @param {boolean} required - Whether the input field is required.
 */
declare const InputLabels: ({
    label,
    sublabel,
    disabled,
    helpIconHintText,
    name,
    required,
}: InputLabelsProps) => import('react/jsx-runtime').JSX.Element
export default InputLabels

import { useState } from 'react'
import {
    StepperV2Step,
    StepperV2StepStatus,
    StepperV2Type,
} from '../../../../packages/blend/lib/components/StepperV2/stepperV2.types'
import { StepperV2 } from '../../../../packages/blend/lib/components/StepperV2'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2Type,
} from '../../../../packages/blend/lib/components/ButtonV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

const StepperV2Demo = () => {
    const { theme } = useTheme()
    const [horizontalSteps, setHorizontalSteps] = useState<StepperV2Step[]>([
        { id: 1, title: 'Step 1', status: StepperV2StepStatus.CURRENT },
        { id: 2, title: 'Step 2', status: StepperV2StepStatus.PENDING },
        { id: 3, title: 'Step 3', status: StepperV2StepStatus.PENDING },
        { id: 4, title: 'Step 4', status: StepperV2StepStatus.PENDING },
    ])

    const [verticalSteps, setVerticalSteps] = useState<StepperV2Step[]>([
        { id: 1, title: 'Step 1', status: StepperV2StepStatus.CURRENT },
        {
            id: 2,
            title: 'Step 2',
            status: StepperV2StepStatus.PENDING,
            substeps: [
                {
                    id: 1,
                    title: 'Substep 2.1',
                    status: StepperV2StepStatus.PENDING,
                },
                {
                    id: 2,
                    title: 'Substep 2.2',
                    status: StepperV2StepStatus.PENDING,
                },
                {
                    id: 3,
                    title: 'Substep 2.3',
                    status: StepperV2StepStatus.PENDING,
                },
            ],
        },
        { id: 3, title: 'Step 3', status: StepperV2StepStatus.PENDING },
        { id: 4, title: 'Step 4', status: StepperV2StepStatus.PENDING },

        {
            id: 5,
            title: 'Step 5',
            status: StepperV2StepStatus.PENDING,
            substeps: [
                {
                    id: 1,
                    title: 'Substep 5.1',
                    status: StepperV2StepStatus.PENDING,
                },
                {
                    id: 2,
                    title: 'Substep 5.2',
                    status: StepperV2StepStatus.PENDING,
                },
                {
                    id: 3,
                    title: 'Substep 5.3',
                    status: StepperV2StepStatus.PENDING,
                },
            ],
        },
    ])

    const handleHorizontalStepClick = (index: number) => {
        console.log('horizontal step clicked', index)
        setHorizontalSteps((prev) =>
            prev.map((step, i) => {
                if (i < index) {
                    return {
                        ...step,
                        status:
                            step.status === StepperV2StepStatus.COMPLETED
                                ? StepperV2StepStatus.COMPLETED
                                : StepperV2StepStatus.SKIPPED,
                    }
                }
                if (i > index) {
                    return {
                        ...step,
                        status:
                            step.status === StepperV2StepStatus.COMPLETED
                                ? StepperV2StepStatus.COMPLETED
                                : StepperV2StepStatus.PENDING,
                    }
                }
                if (i === index) {
                    return {
                        ...step,
                        status: StepperV2StepStatus.CURRENT,
                    }
                }

                return step
            })
        )
    }

    console.log({ horizontalSteps })

    const substepsAllPending = (step: StepperV2Step) =>
        step.substeps?.map((ss) => ({
            ...ss,
            status: StepperV2StepStatus.PENDING,
        }))

    const handleVerticalStepClick = (stepIndex: number) => {
        setVerticalSteps((prev) =>
            prev.map((step, i) => {
                if (i < stepIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.SKIPPED
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                if (i > stepIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.PENDING
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                return {
                    ...step,
                    status: StepperV2StepStatus.CURRENT,
                    substeps: substepsAllPending(step),
                }
            })
        )
    }
    /**
     * StepperV2 vertical API: (stepId, substepOrdinal) where substepOrdinal is 1-based
     * (matches VerticalStepperV2 passing subIdx + 1).
     */
    const handleVerticalSubstepClick = (
        stepId: number,
        substepOrdinal1Based: number
    ) => {
        const subArrayIndex = substepOrdinal1Based - 1

        setVerticalSteps((prev) => {
            const stepArrayIndex = prev.findIndex((s) => s.id === stepId)
            if (stepArrayIndex < 0) return prev

            const target = prev[stepArrayIndex]
            if (
                !target.substeps ||
                subArrayIndex < 0 ||
                subArrayIndex >= target.substeps.length
            ) {
                return prev
            }

            return prev.map((step, i) => {
                if (i < stepArrayIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.SKIPPED
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                if (i > stepArrayIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.PENDING
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                return {
                    ...step,
                    status: StepperV2StepStatus.CURRENT,
                    substeps: step.substeps!.map((ss, j) => ({
                        ...ss,
                        status:
                            j < subArrayIndex
                                ? StepperV2StepStatus.COMPLETED
                                : j === subArrayIndex
                                  ? StepperV2StepStatus.CURRENT
                                  : StepperV2StepStatus.PENDING,
                    })),
                }
            })
        })
    }

    const getCurrentIndex = () => {
        const idx = horizontalSteps.findIndex(
            (s) => s.status === StepperV2StepStatus.CURRENT
        )
        return idx >= 0 ? idx : 0
    }

    const handleHorizontalNext = () => {
        const curr = getCurrentIndex()
        const next = Math.min(curr + 1, horizontalSteps.length - 1)
        setHorizontalSteps((prev) =>
            prev.map((s, i) =>
                i < next
                    ? { ...s, status: StepperV2StepStatus.COMPLETED }
                    : i === next
                      ? { ...s, status: StepperV2StepStatus.CURRENT }
                      : { ...s, status: StepperV2StepStatus.PENDING }
            )
        )
    }

    const handleHorizontalPrev = () => {
        const curr = getCurrentIndex()
        const prevIdx = Math.max(curr - 1, 0)
        setHorizontalSteps((prev) =>
            prev.map((s, i) =>
                i < prevIdx
                    ? { ...s, status: StepperV2StepStatus.COMPLETED }
                    : i === prevIdx
                      ? { ...s, status: StepperV2StepStatus.CURRENT }
                      : { ...s, status: StepperV2StepStatus.PENDING }
            )
        )
    }

    const handleVerticalNext = () => {
        setVerticalSteps((prev) => {
            const steps = prev.map((s) => ({
                ...s,
                substeps: s.substeps
                    ? s.substeps.map((ss) => ({ ...ss }))
                    : s.substeps,
            }))
            type Entry =
                | { kind: 'step'; si: number }
                | { kind: 'sub'; si: number; subi: number }
            const entries: Entry[] = []
            steps.forEach((s, si) => {
                entries.push({ kind: 'step', si })
                if (s.substeps)
                    s.substeps.forEach((_, subi) =>
                        entries.push({ kind: 'sub', si, subi })
                    )
            })
            const findCurrent = (): number => {
                // Prefer CURRENT substep over step when both are CURRENT
                for (let i = 0; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'sub') {
                        const sub = steps[e.si].substeps![e.subi]
                        if (sub.status === StepperV2StepStatus.CURRENT) return i
                    }
                }
                for (let i = 0; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'step') {
                        if (steps[e.si].status === StepperV2StepStatus.CURRENT)
                            return i
                    }
                }
                return 0
            }
            const cur = findCurrent()
            const currEntry = entries[cur]

            const setStepStatus = (si: number, status: StepperV2StepStatus) => {
                steps[si].status = status
            }
            const setSubStatus = (
                si: number,
                subi: number,
                status: StepperV2StepStatus
            ) => {
                if (steps[si].substeps)
                    steps[si].substeps![subi].status = status
            }

            const setFuturePending = (fromIndex: number) => {
                for (let i = fromIndex; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'sub')
                        setSubStatus(e.si, e.subi, StepperV2StepStatus.PENDING)
                    else setStepStatus(e.si, StepperV2StepStatus.PENDING)
                }
            }

            if (currEntry.kind === 'step') {
                const s = steps[currEntry.si]
                if (s.substeps && s.substeps.length > 0) {
                    // Enter first substep; keep step CURRENT
                    setSubStatus(currEntry.si, 0, StepperV2StepStatus.CURRENT)
                    // Mark earlier items as completed where applicable
                    for (let i = 0; i < cur; i++) {
                        const e = entries[i]
                        if (e.kind === 'sub')
                            setSubStatus(
                                e.si,
                                e.subi,
                                StepperV2StepStatus.COMPLETED
                            )
                        else setStepStatus(e.si, StepperV2StepStatus.COMPLETED)
                    }
                    // Set future pending
                    setFuturePending(cur + 2) // we set current sub explicitly below
                } else {
                    // Complete simple step and move on
                    setStepStatus(currEntry.si, StepperV2StepStatus.COMPLETED)
                }
            } else {
                // substep
                setSubStatus(
                    currEntry.si,
                    currEntry.subi,
                    StepperV2StepStatus.COMPLETED
                )
                const s = steps[currEntry.si]
                const isLastSub =
                    s.substeps && currEntry.subi === s.substeps.length - 1
                if (isLastSub) {
                    setStepStatus(currEntry.si, StepperV2StepStatus.COMPLETED)
                } else {
                    // Next sub becomes current
                    setSubStatus(
                        currEntry.si,
                        currEntry.subi + 1,
                        StepperV2StepStatus.CURRENT
                    )
                    // Keep step CURRENT while substeps in progress
                    setStepStatus(currEntry.si, StepperV2StepStatus.CURRENT)
                    // Mark previous entries completed
                    for (let i = 0; i < cur; i++) {
                        const e = entries[i]
                        if (e.kind === 'sub')
                            setSubStatus(
                                e.si,
                                e.subi,
                                StepperV2StepStatus.COMPLETED
                            )
                        else if (steps[e.si].substeps) {
                            // Steps with substeps complete only when last sub done; before that keep CURRENT or COMPLETED if already
                            // no-op
                        } else
                            setStepStatus(e.si, StepperV2StepStatus.COMPLETED)
                    }
                    setFuturePending(cur + 2)
                    return steps
                }
            }

            // Determine next current after handling completion
            const afterCur = Math.min(cur + 1, entries.length - 1)
            const nextE = entries[afterCur]
            // Set next current appropriately
            if (nextE.kind === 'step') {
                const ns = steps[nextE.si]
                setStepStatus(nextE.si, StepperV2StepStatus.CURRENT)
                if (ns.substeps && ns.substeps.length > 0) {
                    // First substep should also be CURRENT on entering a step with substeps
                    ns.substeps.forEach((_, idx) =>
                        setSubStatus(
                            nextE.si,
                            idx,
                            idx === 0
                                ? StepperV2StepStatus.CURRENT
                                : StepperV2StepStatus.PENDING
                        )
                    )
                }
            } else {
                setStepStatus(nextE.si, StepperV2StepStatus.CURRENT)
                setSubStatus(nextE.si, nextE.subi, StepperV2StepStatus.CURRENT)
            }
            // Set all in-between before nextE as completed respecting rule #2
            for (let i = 0; i < afterCur; i++) {
                const e = entries[i]
                if (e.kind === 'sub')
                    setSubStatus(e.si, e.subi, StepperV2StepStatus.COMPLETED)
                else {
                    const subs = steps[e.si].substeps
                    if (
                        !subs ||
                        subs.every(
                            (ss) => ss.status === StepperV2StepStatus.COMPLETED
                        )
                    ) {
                        setStepStatus(e.si, StepperV2StepStatus.COMPLETED)
                    }
                }
            }
            // Set after nextE pending
            setFuturePending(afterCur + 1)

            return steps
        })
    }

    const handleVerticalPrev = () => {
        setVerticalSteps((prev) => {
            const steps = prev.map((s) => ({
                ...s,
                substeps: s.substeps
                    ? s.substeps.map((ss) => ({ ...ss }))
                    : s.substeps,
            }))
            type Entry =
                | { kind: 'step'; si: number }
                | { kind: 'sub'; si: number; subi: number }
            const entries: Entry[] = []
            steps.forEach((s, si) => {
                entries.push({ kind: 'step', si })
                if (s.substeps)
                    s.substeps.forEach((_, subi) =>
                        entries.push({ kind: 'sub', si, subi })
                    )
            })
            const findCurrent = (): number => {
                // Prefer CURRENT substep over step when both are CURRENT
                for (let i = 0; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'sub') {
                        const sub = steps[e.si].substeps![e.subi]
                        if (sub.status === StepperV2StepStatus.CURRENT) return i
                    }
                }
                for (let i = 0; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'step') {
                        if (steps[e.si].status === StepperV2StepStatus.CURRENT)
                            return i
                    }
                }
                return 0
            }
            const cur = findCurrent()
            const prevIndex = Math.max(cur - 1, 0)
            const prevE = entries[prevIndex]

            const setStepStatus = (si: number, status: StepperV2StepStatus) => {
                steps[si].status = status
            }
            const setSubStatus = (
                si: number,
                subi: number,
                status: StepperV2StepStatus
            ) => {
                if (steps[si].substeps)
                    steps[si].substeps![subi].status = status
            }

            // Set later items pending
            for (let i = prevIndex + 1; i < entries.length; i++) {
                const e = entries[i]
                if (e.kind === 'sub')
                    setSubStatus(e.si, e.subi, StepperV2StepStatus.PENDING)
                else setStepStatus(e.si, StepperV2StepStatus.PENDING)
            }
            // Keep earlier items completed if they already are
            for (let i = 0; i < prevIndex; i++) {
                const e = entries[i]
                if (e.kind === 'sub') {
                    if (
                        steps[e.si].substeps![e.subi].status !==
                        StepperV2StepStatus.COMPLETED
                    ) {
                        setSubStatus(
                            e.si,
                            e.subi,
                            StepperV2StepStatus.COMPLETED
                        )
                    }
                } else {
                    const subs = steps[e.si].substeps
                    if (subs) {
                        if (
                            subs.every(
                                (ss) =>
                                    ss.status === StepperV2StepStatus.COMPLETED
                            )
                        ) {
                            setStepStatus(e.si, StepperV2StepStatus.COMPLETED)
                        }
                    } else setStepStatus(e.si, StepperV2StepStatus.COMPLETED)
                }
            }

            // Set previous as current
            if (prevE.kind === 'step') {
                setStepStatus(prevE.si, StepperV2StepStatus.CURRENT)
            } else {
                setStepStatus(prevE.si, StepperV2StepStatus.CURRENT)
                setSubStatus(prevE.si, prevE.subi, StepperV2StepStatus.CURRENT)
            }

            return steps
        })
    }

    // Derive current vertical step and substep for panel display
    const currentVerticalStep =
        verticalSteps.find((s) => s.status === StepperV2StepStatus.CURRENT) ||
        verticalSteps[0]
    const currentVerticalSubstep = currentVerticalStep?.substeps?.find(
        (ss) => ss.status === StepperV2StepStatus.CURRENT
    )

    return (
        <div className="p-8">
            <div className="flex gap-8 flex-col">
                <div
                    className={`space-y-6 border border-gray-300 p-6 rounded-2xl ${theme === Theme.DARK ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}
                >
                    <h2
                        className={`text-xl font-semibold ${theme === Theme.DARK ? 'text-gray-100' : 'text-gray-900'}`}
                    >
                        Horizontal Stepper
                    </h2>
                    <StepperV2
                        steps={horizontalSteps}
                        clickable={true}
                        onStepClick={handleHorizontalStepClick}
                        stepperType={StepperV2Type.HORIZONTAL}
                    />
                    <div
                        className={`rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8 ${theme === Theme.DARK ? 'text-gray-100' : 'text-gray-900'}`}
                    >
                        {horizontalSteps.map(
                            (step) =>
                                step.status === StepperV2StepStatus.CURRENT && (
                                    <h1>Step {step.id}</h1>
                                )
                        )}
                    </div>
                    <div className="mt-4 flex gap-3">
                        <ButtonV2
                            text="Previous"
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.MEDIUM}
                            onClick={handleHorizontalPrev}
                        />
                        <ButtonV2
                            text="Next"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.MEDIUM}
                            onClick={handleHorizontalNext}
                        />
                    </div>
                </div>

                <div
                    className={`space-y-6 border border-gray-300 p-6 rounded-2xl ${theme === Theme.DARK ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'}`}
                >
                    <h2
                        className={`text-xl font-semibold ${theme === Theme.DARK ? 'text-gray-100' : 'text-gray-900'}`}
                    >
                        Vertical Stepper
                    </h2>
                    <div className="w-full flex items-stretch gap-8">
                        <StepperV2
                            steps={verticalSteps}
                            clickable={true}
                            onStepClick={handleVerticalStepClick}
                            onSubstepClick={handleVerticalSubstepClick}
                            stepperType={StepperV2Type.VERTICAL}
                        />
                        <div
                            className={`rounded-2xl w-full flex-1 self-stretch flex justify-center items-center outline-1 outline-gray-200 p-8 ${theme === Theme.DARK ? 'text-gray-100' : 'text-gray-900'}`}
                        >
                            {currentVerticalSubstep ? (
                                <h1>
                                    Step {currentVerticalStep?.id} - Substep{' '}
                                    {currentVerticalStep?.id}.
                                    {currentVerticalSubstep.id}
                                </h1>
                            ) : (
                                <h1>Step {currentVerticalStep?.id}</h1>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                        <ButtonV2
                            text="Previous"
                            buttonType={ButtonV2Type.SECONDARY}
                            size={ButtonV2Size.MEDIUM}
                            onClick={handleVerticalPrev}
                        />
                        <ButtonV2
                            text="Next"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.MEDIUM}
                            onClick={handleVerticalNext}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepperV2Demo

import { useState } from 'react'
import {
    Step,
    Stepper,
    StepperType,
    StepState,
} from '../../../../packages/blend/lib/main'

const StepperDemo = () => {
    const [horizontalSteps, setHorizontalSteps] = useState<Step[]>([
        { id: 1, title: 'Step 1', status: StepState.CURRENT },
        { id: 2, title: 'Step 2', status: StepState.PENDING },
        { id: 3, title: 'Step 3', status: StepState.PENDING },
        { id: 4, title: 'Step 4', status: StepState.PENDING },
    ])

    const [verticalSteps, setVerticalSteps] = useState<Step[]>([
        { id: 1, title: 'Step 1', status: StepState.CURRENT },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.PENDING,
            substeps: [
                { id: 1, title: 'Substep 2.1', status: StepState.PENDING },
                { id: 2, title: 'Substep 2.2', status: StepState.PENDING },
                { id: 3, title: 'Substep 2.3', status: StepState.PENDING },
            ],
        },
        { id: 3, title: 'Step 3', status: StepState.PENDING },
        { id: 4, title: 'Step 4', status: StepState.PENDING },

        {
            id: 5,
            title: 'Step 5',
            status: StepState.PENDING,
            substeps: [
                { id: 1, title: 'Substep 5.1', status: StepState.PENDING },
                { id: 2, title: 'Substep 5.2', status: StepState.PENDING },
                { id: 3, title: 'Substep 5.3', status: StepState.PENDING },
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
                            step.status === StepState.COMPLETED
                                ? StepState.COMPLETED
                                : StepState.SKIPPED,
                    }
                }
                if (i > index) {
                    return {
                        ...step,
                        status:
                            step.status === StepState.COMPLETED
                                ? StepState.COMPLETED
                                : StepState.PENDING,
                    }
                }
                if (i === index) {
                    return {
                        ...step,
                        status: StepState.CURRENT,
                    }
                }

                return step
            })
        )
    }

    console.log({ horizontalSteps })

    const handleVerticalStepClick = (stepIndex: number) => {
        console.log('vertical step clicked', stepIndex)
    }
    const handleVerticalSubstepClick = (
        stepIndex: number,
        substepIndex: number
    ) => {
        console.log('vertical substep clicked', stepIndex, substepIndex)
    }

    const getCurrentIndex = () => {
        const idx = horizontalSteps.findIndex(
            (s) => s.status === StepState.CURRENT
        )
        return idx >= 0 ? idx : 0
    }

    const handleHorizontalNext = () => {
        const curr = getCurrentIndex()
        const next = Math.min(curr + 1, horizontalSteps.length - 1)
        setHorizontalSteps((prev) =>
            prev.map((s, i) =>
                i < next
                    ? { ...s, status: StepState.COMPLETED }
                    : i === next
                      ? { ...s, status: StepState.CURRENT }
                      : { ...s, status: StepState.PENDING }
            )
        )
    }

    const handleHorizontalPrev = () => {
        const curr = getCurrentIndex()
        const prevIdx = Math.max(curr - 1, 0)
        setHorizontalSteps((prev) =>
            prev.map((s, i) =>
                i < prevIdx
                    ? { ...s, status: StepState.COMPLETED }
                    : i === prevIdx
                      ? { ...s, status: StepState.CURRENT }
                      : { ...s, status: StepState.PENDING }
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
                        if (sub.status === StepState.CURRENT) return i
                    }
                }
                for (let i = 0; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'step') {
                        if (steps[e.si].status === StepState.CURRENT) return i
                    }
                }
                return 0
            }
            const cur = findCurrent()
            const currEntry = entries[cur]

            const setStepStatus = (si: number, status: StepState) => {
                steps[si].status = status
            }
            const setSubStatus = (
                si: number,
                subi: number,
                status: StepState
            ) => {
                if (steps[si].substeps)
                    steps[si].substeps![subi].status = status
            }

            const setFuturePending = (fromIndex: number) => {
                for (let i = fromIndex; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'sub')
                        setSubStatus(e.si, e.subi, StepState.PENDING)
                    else setStepStatus(e.si, StepState.PENDING)
                }
            }

            if (currEntry.kind === 'step') {
                const s = steps[currEntry.si]
                if (s.substeps && s.substeps.length > 0) {
                    // Enter first substep; keep step CURRENT
                    setSubStatus(currEntry.si, 0, StepState.CURRENT)
                    // Mark earlier items as completed where applicable
                    for (let i = 0; i < cur; i++) {
                        const e = entries[i]
                        if (e.kind === 'sub')
                            setSubStatus(e.si, e.subi, StepState.COMPLETED)
                        else setStepStatus(e.si, StepState.COMPLETED)
                    }
                    // Set future pending
                    setFuturePending(cur + 2) // we set current sub explicitly below
                } else {
                    // Complete simple step and move on
                    setStepStatus(currEntry.si, StepState.COMPLETED)
                }
            } else {
                // substep
                setSubStatus(currEntry.si, currEntry.subi, StepState.COMPLETED)
                const s = steps[currEntry.si]
                const isLastSub =
                    s.substeps && currEntry.subi === s.substeps.length - 1
                if (isLastSub) {
                    setStepStatus(currEntry.si, StepState.COMPLETED)
                } else {
                    // Next sub becomes current
                    setSubStatus(
                        currEntry.si,
                        currEntry.subi + 1,
                        StepState.CURRENT
                    )
                    // Keep step CURRENT while substeps in progress
                    setStepStatus(currEntry.si, StepState.CURRENT)
                    // Mark previous entries completed
                    for (let i = 0; i < cur; i++) {
                        const e = entries[i]
                        if (e.kind === 'sub')
                            setSubStatus(e.si, e.subi, StepState.COMPLETED)
                        else if (steps[e.si].substeps) {
                            // Steps with substeps complete only when last sub done; before that keep CURRENT or COMPLETED if already
                            // no-op
                        } else setStepStatus(e.si, StepState.COMPLETED)
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
                setStepStatus(nextE.si, StepState.CURRENT)
                if (ns.substeps && ns.substeps.length > 0) {
                    // First substep should also be CURRENT on entering a step with substeps
                    ns.substeps.forEach((_, idx) =>
                        setSubStatus(
                            nextE.si,
                            idx,
                            idx === 0 ? StepState.CURRENT : StepState.PENDING
                        )
                    )
                }
            } else {
                setStepStatus(nextE.si, StepState.CURRENT)
                setSubStatus(nextE.si, nextE.subi, StepState.CURRENT)
            }
            // Set all in-between before nextE as completed respecting rule #2
            for (let i = 0; i < afterCur; i++) {
                const e = entries[i]
                if (e.kind === 'sub')
                    setSubStatus(e.si, e.subi, StepState.COMPLETED)
                else {
                    const subs = steps[e.si].substeps
                    if (
                        !subs ||
                        subs.every((ss) => ss.status === StepState.COMPLETED)
                    ) {
                        setStepStatus(e.si, StepState.COMPLETED)
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
                        if (sub.status === StepState.CURRENT) return i
                    }
                }
                for (let i = 0; i < entries.length; i++) {
                    const e = entries[i]
                    if (e.kind === 'step') {
                        if (steps[e.si].status === StepState.CURRENT) return i
                    }
                }
                return 0
            }
            const cur = findCurrent()
            const prevIndex = Math.max(cur - 1, 0)
            const prevE = entries[prevIndex]

            const setStepStatus = (si: number, status: StepState) => {
                steps[si].status = status
            }
            const setSubStatus = (
                si: number,
                subi: number,
                status: StepState
            ) => {
                if (steps[si].substeps)
                    steps[si].substeps![subi].status = status
            }

            // Set later items pending
            for (let i = prevIndex + 1; i < entries.length; i++) {
                const e = entries[i]
                if (e.kind === 'sub')
                    setSubStatus(e.si, e.subi, StepState.PENDING)
                else setStepStatus(e.si, StepState.PENDING)
            }
            // Keep earlier items completed if they already are
            for (let i = 0; i < prevIndex; i++) {
                const e = entries[i]
                if (e.kind === 'sub') {
                    if (
                        steps[e.si].substeps![e.subi].status !==
                        StepState.COMPLETED
                    ) {
                        setSubStatus(e.si, e.subi, StepState.COMPLETED)
                    }
                } else {
                    const subs = steps[e.si].substeps
                    if (subs) {
                        if (
                            subs.every(
                                (ss) => ss.status === StepState.COMPLETED
                            )
                        ) {
                            setStepStatus(e.si, StepState.COMPLETED)
                        }
                    } else setStepStatus(e.si, StepState.COMPLETED)
                }
            }

            // Set previous as current
            if (prevE.kind === 'step') {
                setStepStatus(prevE.si, StepState.CURRENT)
            } else {
                setStepStatus(prevE.si, StepState.CURRENT)
                setSubStatus(prevE.si, prevE.subi, StepState.CURRENT)
            }

            return steps
        })
    }

    // Derive current vertical step and substep for panel display
    const currentVerticalStep =
        verticalSteps.find((s) => s.status === StepState.CURRENT) ||
        verticalSteps[0]
    const currentVerticalSubstep = currentVerticalStep?.substeps?.find(
        (ss) => ss.status === StepState.CURRENT
    )

    return (
        <div className="p-8">
            <div className="flex gap-8 flex-col">
                <div className="space-y-6 border border-gray-300 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold">
                        Horizontal Stepper
                    </h2>
                    <Stepper
                        steps={horizontalSteps}
                        clickable={true}
                        onStepClick={handleHorizontalStepClick}
                    />
                    <div className="rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
                        {horizontalSteps.map(
                            (step) =>
                                step.status === StepState.CURRENT && (
                                    <h1>Step {step.id}</h1>
                                )
                        )}
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={handleHorizontalPrev}
                            className="px-3 py-2 bg-gray-200 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleHorizontalNext}
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="space-y-6 border border-gray-300 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold">Vertical Stepper</h2>
                    <div className="w-full flex items-stretch gap-8">
                        <Stepper
                            steps={verticalSteps}
                            clickable={true}
                            onStepClick={handleVerticalStepClick}
                            onSubstepClick={handleVerticalSubstepClick}
                            stepperType={StepperType.VERTICAL}
                        />
                        <div className="rounded-2xl w-full flex-1 self-stretch flex justify-center items-center outline-1 outline-gray-200 p-8">
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
                        <button
                            onClick={handleVerticalPrev}
                            className="px-3 py-2 bg-gray-200 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleVerticalNext}
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepperDemo

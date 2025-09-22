'use client'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { useEffect, useRef } from 'react'

export default function HomeRiveAnimation() {
    const STATE_MACHINE = 'State Machine 1'
    const containerRef = useRef<HTMLDivElement>(null)

    // Load rive with the state machine
    const { rive, RiveComponent } = useRive({
        src: '/design_system_website_V4.riv',
        stateMachines: STATE_MACHINE,
        autoplay: false, // manual control
        onLoad: () => {
            setupObserver()
        },
    })

    // Define inputs
    const closedVersion = useStateMachineInput(
        rive,
        STATE_MACHINE,
        'CLOSED VERSION'
    )
    const openVersion = useStateMachineInput(
        rive,
        STATE_MACHINE,
        'open version'
    )
    const card1 = useStateMachineInput(rive, STATE_MACHINE, 'card 1')
    const card2 = useStateMachineInput(rive, STATE_MACHINE, 'card 2')
    const card3 = useStateMachineInput(rive, STATE_MACHINE, 'card 3')
    const loop = useStateMachineInput(rive, STATE_MACHINE, 'LOOP')
    const colouredVersion = useStateMachineInput(
        rive,
        STATE_MACHINE,
        'COLOURED VERSION'
    )

    const setupObserver = () => {
        if (!containerRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    playSequence()
                }
            },
            { threshold: 0.5 }
        )

        observer.observe(containerRef.current)
    }

    const trigger = (input: any, delay = 1000) =>
        new Promise<void>((resolve) => {
            if (input?.fire) input.fire()
            setTimeout(() => resolve(), delay)
        })

    const playSequence = async () => {
        if (!rive) return

        await trigger(closedVersion, 500)
        await trigger(openVersion, 600)
        await trigger(card1, 800)
        await trigger(card2, 800)
        await trigger(card3, 1000)

        // then loop + colour run continuously
        rive.play('LOOP')
        rive.play('COLOURED VERSION')
    }

    return (
        <div
            ref={containerRef}
            style={{ width: '800px', height: '600px', margin: '0 auto' }}
        >
            <RiveComponent style={{ width: '100%', height: '100%' }} />
        </div>
    )
}

import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface WelcomeCardProps {
    style?: React.CSSProperties
    className?: string
    logoSize?: number
    logoPriority?: boolean
    animatedLogo?: boolean
}

export function WelcomeCard({
    style,
    className,
    logoSize = 60,
    logoPriority,
    animatedLogo,
}: WelcomeCardProps) {
    return (
        <div
            style={style}
            className={cn(
                'flex flex-col items-center justify-center text-center px-8 backdrop-blur-sm',
                className
            )}
        >
            <Image
                src="/images/juspay.svg"
                alt="Welcome to Blend"
                width={logoSize}
                height={logoSize}
                priority={logoPriority}
                draggable={false}
                className={cn('mb-4', animatedLogo && 'hover:rotate-360')}
            />
            <h1 className="text-2xl font-medium text-foreground mb-2 leading-tight font-manrope italic">
                Juspay's Blend
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed font-manrope">
                The system behind every Juspay experience.
            </p>
        </div>
    )
}

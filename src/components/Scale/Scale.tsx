import { type CSSProperties } from 'react';

import styles from './Scale.module.scss';
import { useRevealOnIntersect } from '../../hooks/useRevealOnIntersect';

type SizeValue = string | number;

export type ScaleProps = {
    height?: SizeValue
    borderRadius?: SizeValue
    color?: CSSProperties['backgroundColor']
    width?: SizeValue
    percent?: number
}

const normalizeSize = (value?: SizeValue) => {
    if (typeof value === 'number') {
        return `${value}px`
    }

    return value
}

const clampPercent = (value?: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return 0
    }

    return Math.min(Math.max(value, 0), 100)
}

const Scale = ({
    height = 8,
    borderRadius = 999,
    color,
    width = '100%',
    percent = 0,
}: ScaleProps) => {
    const { ref: scaleRef, isVisible } = useRevealOnIntersect<HTMLDivElement>({
        threshold: 0.35,
        rootMargin: '0px 0px -5% 0px',
    })
    const normalizedHeight = normalizeSize(height)
    const normalizedBorderRadius = normalizeSize(borderRadius)
    const normalizedWidth = normalizeSize(width)
    const clampedPercent = clampPercent(percent)

    const scaleStyles: CSSProperties = {
        height: normalizedHeight,
        width: normalizedWidth,
        borderRadius: normalizedBorderRadius,
    }

    const percentStyles: CSSProperties = {
        height: normalizedHeight,
        width: `${clampedPercent}%`,
        borderRadius: normalizedBorderRadius,
        backgroundColor: color,
    }

    return (
        <div ref={scaleRef} className={`${styles.scale} ${isVisible ? styles.visibleScale : ''}`} style={scaleStyles}>
            <div className={`${styles.percent} ${isVisible ? styles.visible : ''}`} style={percentStyles}></div>
        </div>
    )
}

export default Scale;

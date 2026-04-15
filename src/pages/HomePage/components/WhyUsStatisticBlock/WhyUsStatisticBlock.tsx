import { type CSSProperties } from 'react';

import Scale from '../../../../components/Scale/Scale';
import styles from './WhyUsStatisticBlock.module.scss';

type WhyUsStatisticBlockTheme = 'black' | 'white';
type WhyUsStatisticBlockStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined
}

export type WhyUsStatisticBlockProps = {
    title: string
    percent: number
    description: string
    color: string
    element: string
    theme: WhyUsStatisticBlockTheme
    isVisible?: boolean
    revealDelayMs?: number
}

const WhyUsStatisticBlock = ({
    title,
    percent,
    description,
    color,
    element,
    theme,
    isVisible = false,
    revealDelayMs = 700,
}: WhyUsStatisticBlockProps) => {
    const blockStyle: WhyUsStatisticBlockStyle = {
        '--why-us-statistic-block-element': element ? `url("${element}")` : undefined,
        '--why-us-statistic-block-accent-color': color,
        '--why-us-line-delay': `${revealDelayMs}ms`,
    }

    return(
        <div className={`${styles.whyUsStatisticBlock} ${styles[theme]} ${isVisible ? styles.visible : ''}`} style={blockStyle}>
            <div className={styles.header}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.percent}>{percent}%</p>
            </div>
            <div className={styles.scaleWrapper}>
                <Scale width="100%" height={6} borderRadius={3} color={color} percent={percent}/>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    )
}

export default WhyUsStatisticBlock;

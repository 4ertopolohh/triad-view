import { type CSSProperties } from 'react';
import styles from '../WhyUsSecondBlock/WhyUsSecondBlock.module.scss';

type WhyUsSecondBlockTheme = 'black' | 'white';
type WhyUsSecondBlockType = 'big';
type WhyUsSecondBlockStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined
}

export type WhyUsSecondBlockProps = {
    title: string
    element: string
    type?: WhyUsSecondBlockType
    subtitle?: string
    theme: WhyUsSecondBlockTheme
    isVisible?: boolean
    revealDelayMs?: number
}

const WhyUsSecondBlock = ({
    title,
    element,
    type,
    subtitle,
    theme,
    isVisible = false,
    revealDelayMs = 700,
}:WhyUsSecondBlockProps) => {
    const blockStyle: WhyUsSecondBlockStyle = {
        '--why-us-second-block-element': element ? `url("${element}")` : undefined,
        '--why-us-line-delay': `${revealDelayMs}ms`,
    }

    return(
        <div
            className={`${styles.whyUsSecondBlock} ${styles[theme]} ${type === 'big' ? styles.big : ''} ${isVisible ? styles.visible : ''}`}
            style={blockStyle}
        >
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                {type === 'big' && subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>
        </div>
    )
}

export default WhyUsSecondBlock;

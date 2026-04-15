import { type CSSProperties } from 'react';
import styles from '../WhyUsFirstBlock/WhyUsFirstBlock.module.scss';

type WhyUsFirstBlockTheme = 'black' | 'white';
type WhyUsFirstBlockStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined
}

export type WhyUsFirstBlockProps = {
    title: string
    subtitle: string
    theme: WhyUsFirstBlockTheme
    element: string
}

const WhyUsFirstBlock = ({ title, subtitle, theme, element }:WhyUsFirstBlockProps) => {
    const blockStyle: WhyUsFirstBlockStyle = {
        '--why-us-first-block-element': element ? `url("${element}")` : undefined,
    }

    return(
        <div className={`${styles.whyUsFirstBlock} ${styles[theme]}`} style={blockStyle}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.desc}>{subtitle}</p>
        </div>
    )
}

export default WhyUsFirstBlock;

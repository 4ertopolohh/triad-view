import { type CSSProperties } from 'react';
import styles from '../WhyUsSpeedBlock/WhyUsSpeedBlock.module.scss';

import speedIcon from '../../../../assets/images/icons/speedIcon.png';

type WhyUsSpeedBlockStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined
}

type WhyUsSpeedBlockProps = {
    isVisible?: boolean
    revealDelayMs?: number
}

const WhyUsSpeedBlock = ({ isVisible = false, revealDelayMs = 700 }: WhyUsSpeedBlockProps) => {
    const blockStyle: WhyUsSpeedBlockStyle = {
        '--why-us-line-delay': `${revealDelayMs}ms`,
    }

    return(
        <div className={`${styles.speedBlock} ${isVisible ? styles.visible : ''}`} style={blockStyle}>
            <div className={styles.desc}>
                <p>Средняя скорость загрузки:</p>
                <p>1.46 секунды</p>
            </div>
            <img src={speedIcon} alt="Speed Icon" loading='lazy' className={styles.speedIcon}/>
        </div>
    )
}

export default WhyUsSpeedBlock;

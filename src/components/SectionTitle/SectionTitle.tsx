import { useRevealOnIntersect } from '../../hooks/useRevealOnIntersect';
import styles from '../SectionTitle/SectionTitle.module.scss';

export type SectionTitleProps = {
    title: string
    subtitle?: string
}

const SectionTitle = ({ title, subtitle }:SectionTitleProps) => {
    const { ref: titleRef, isVisible } = useRevealOnIntersect<HTMLDivElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
    });

    return(
        <div
            ref={titleRef}
            className={styles.sectionTitleWrapper}
        >
            <h3 className={`${styles.sectionTitle} ${styles.revealItem} ${isVisible ? styles.revealItemVisible : ''}`}>
                {title}
            </h3>
            {subtitle ? (
                <p className={`${styles.subtitle} ${styles.revealItem} ${isVisible ? styles.revealItemVisible : ''}`}>
                    {subtitle}
                </p>
            ) : null}
        </div>
    )
}

export default SectionTitle;

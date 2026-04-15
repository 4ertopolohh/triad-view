import styles from '../WhyUsSectionSlogan/WhyUsSectionSlogan.module.scss';
import { useRevealOnIntersect } from '../../../../hooks/useRevealOnIntersect';

const WhyUsSectionSlogan = () => {
    const { ref: sloganRef, isVisible } = useRevealOnIntersect<HTMLHeadingElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
    });

    return(
        <h4
            ref={sloganRef}
            className={`${styles.whyUsSectionSlogan} ${styles.revealItem} ${isVisible ? styles.revealItemVisible : ''}`}
        >
            триад студио - три этапа разработки
        </h4>
    )
}

export default WhyUsSectionSlogan;

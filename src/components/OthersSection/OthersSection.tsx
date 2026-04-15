import { type CSSProperties } from 'react';
import OthersCard from '../OthersCard/OthersCard';
import styles from '../OthersSection/OthersSection.module.scss';
import { useRevealOnIntersect } from '../../hooks/useRevealOnIntersect';

import chatImage2 from '../../assets/images/pictures/chatImage2.png';
import docsImage from '../../assets/images/pictures/docsImage.png';
import infoImage from '../../assets/images/pictures/infoImage.png';

const OthersSection = () => {
    const { ref: sectionRef, isVisible } = useRevealOnIntersect<HTMLElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
    });

    const cards = [
        {
            image: chatImage2,
            desc: 'Связаться с нашим менеджером',
            link: '/',
        },
        {
            image: docsImage,
            desc: 'Ознакомиться с договором',
            link: '/',
        },
        {
            image: infoImage,
            desc: 'Подробнее про наш стек',
            link: '/',
        },
    ];

    return (
        <section ref={sectionRef} className={styles.othersSection}>
            <div className={`container ${styles.container}`}>
                {cards.map((card, index) => (
                    <div
                        key={card.desc}
                        className={`${styles.cardWrapper} ${isVisible ? styles.cardVisible : ''}`}
                        style={{ '--others-card-delay': `${index * 120}ms` } as CSSProperties}
                    >
                        <OthersCard image={card.image} desc={card.desc} link={card.link} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default OthersSection;

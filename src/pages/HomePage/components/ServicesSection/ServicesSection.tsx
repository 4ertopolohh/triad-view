import { type CSSProperties, useRef } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useIntersectionState } from '../../../../hooks/useIntersectionState';
import { useStaggeredRevealList } from '../../../../hooks/useStaggeredRevealList';
import type { ServiceCardProps } from '../ServiceCard/ServiceCard';
import ServiceCard from '../ServiceCard/ServiceCard';
import styles from '../ServicesSection/ServicesSection.module.scss';

import glassSpiral1 from '../../../../assets/images/pictures/glassSpiral1.png'
import glassSpiral2 from '../../../../assets/images/pictures/glassSpiral2.png'
import glassSpiral3 from '../../../../assets/images/pictures/glassSpiral3.png'
import glassSpiral4 from '../../../../assets/images/pictures/glassSpiral4.png'
import LinkOnPageButton from '../../../../components/LinkOnPageButton/LinkOnPageButton';

type ServiceCardRevealStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined;
};

const SERVICE_CARDS: ServiceCardProps[] = [
    {
        title: 'Многостраничный сайт',
        subtitle: 'Сайт из нескольких связанных между собой страниц, выполняющих различный обширный функционал, например презентация вашей компании',
        price: '79 900',
        spiral: glassSpiral1,
        width: 400,
        arrowType: 'horizontal',
        variant: 'glass',
        padding: 20,
    },
    {
        title: 'Лендинг',
        subtitle: 'Одностраничный сайт, для продвижения, рекламы и заявок',
        price: '14 900',
        spiral: glassSpiral2,
        width: 220,
        arrowType: 'diagonal',
        variant: 'blue',
        padding: 15,
    },
    {
        title: 'Интернет магазин',
        subtitle: 'Удобный инструмент с каталогом, корзиной и оплатой на сайте.',
        price: '99 900',
        spiral: glassSpiral3,
        width: 220,
        arrowType: 'diagonal',
        variant: 'black',
        padding: 15,
    },
    {
        title: 'Корпора- тивный сайт',
        subtitle: 'Сайт компании, рассказывающий о ней, ее услугах и деятельности.',
        price: '59 900',
        spiral: glassSpiral4,
        width: 220,
        arrowType: 'diagonal',
        variant: 'blue',
        padding: 15,
    },
];

const ServicesSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isRuntimeActive = useIntersectionState(sectionRef, {
        threshold: 0,
        rootMargin: '320px 0px',
        fallbackInView: true,
    });
    const { setItemRef, visibleItems } = useStaggeredRevealList<HTMLDivElement>(SERVICE_CARDS.length, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
    });

    return(
        <section
            ref={sectionRef}
            className={styles.servicesSection}
            data-services-runtime={isRuntimeActive ? 'active' : 'idle'}
        >
            <div className={`container ${styles.container}`}>
                <SectionTitle title='наши услуги'/>
                <div className={styles.content}>
                    <div className={styles.cards}>
                        {SERVICE_CARDS.map((card, index) => {
                            const revealStyle: ServiceCardRevealStyle = {
                                '--reveal-delay': `${index * 110}ms`,
                            };

                            return (
                                <div
                                    key={card.title}
                                    ref={(node) => {
                                        setItemRef(index, node);
                                    }}
                                    data-reveal-index={index}
                                    className={`${styles.cardReveal} ${visibleItems[index] ? styles.cardRevealVisible : ''}`}
                                    style={revealStyle}
                                >
                                    <ServiceCard {...card} />
                                </div>
                            );
                        })}
                    </div>
                    <LinkOnPageButton text='другие услуги' link='/services'/>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection;

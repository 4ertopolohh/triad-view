import { type CSSProperties } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useStaggeredRevealList } from '../../../../hooks/useStaggeredRevealList';
import WhyUsFirstBlock from '../WhyUsFirstBlock/WhyUsFirstBlock';
import styles from '../WhyUsSection/WhyUsSection.module.scss';
import WhyUsSectionSlogan from '../WhyUsSectionSlogan/WhyUsSectionSlogan';

import element1 from '../../../../assets/images/pictures/element1.png'
import element2 from '../../../../assets/images/pictures/element2.png'
import element3 from '../../../../assets/images/pictures/element3.png'
import graphIcon from '../../../../assets/images/icons/graphIcon.png'
import devIcon from '../../../../assets/images/icons/devIcon.png'
import blocksIcon from '../../../../assets/images/icons/blocksIcon.png'
import chatIcon from '../../../../assets/images/icons/chatIcon.png'
import figmaIcon from '../../../../assets/images/icons/figmaIcon.png'
import optIcon from '../../../../assets/images/icons/optIcon.png'
import panelIcon from '../../../../assets/images/icons/panelIcon.png'
import statisticElement1 from '../../../../assets/images/icons/statisticElement1.png'
import statisticElement2 from '../../../../assets/images/icons/statisticElement2.png'

import WhyUsSecondBlock from '../WhyUsSecondBlock/WhyUsSecondBlock';
import WhyUsStatisticBlock from '../WhyUsStatisticBlock/WhyUsStatisticBlock';
import WhyUsSpeedBlock from '../WhyUsSpeedBlock/WhyUsSpeedBlock';

type WhyUsRevealStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined;
}

const WHY_US_ITEMS_COUNT = 13;
const REVEAL_DURATION_MS = 700;

const WhyUsSection = () => {
    const { setItemRef, visibleItems } = useStaggeredRevealList<HTMLDivElement>(WHY_US_ITEMS_COUNT, {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
    });

    const getRevealProps = (itemIndex: number, itemDelay: number, extraClassName?: string) => {
        const revealStyle: WhyUsRevealStyle = {
            '--reveal-delay': `${itemDelay}ms`,
        };

        return {
            ref: (node: HTMLDivElement | null) => {
                setItemRef(itemIndex, node);
            },
            'data-reveal-index': itemIndex,
            className: `${styles.revealItem} ${visibleItems[itemIndex] ? styles.revealItemVisible : ''} ${extraClassName ?? ''}`.trim(),
            style: revealStyle,
        };
    };

    const getLineDelay = (itemDelay: number) => REVEAL_DURATION_MS + itemDelay;

    return(
        <section className={styles.whyUsSection}>
            <div className={`container ${styles.container}`}>
                <SectionTitle title='почему стоит выбрать нас?'/>
                <WhyUsSectionSlogan />
                <div className={styles.content}>
                    <div className={styles.lineContent}>
                        <div {...getRevealProps(0, 0)}>
                            <WhyUsFirstBlock 
                                title='Разработка дизайна'
                                subtitle='Создание современного и продающего дизайна по всем нормам, который гарантированно принесет приятный user experience и успех вашему сайту'
                                theme='white'
                                element={element1}
                            />
                        </div>
                        <div {...getRevealProps(1, 120)}>
                            <WhyUsFirstBlock 
                                title='Разработка интерфейса'
                                subtitle='Создание того, что будет видеть пользователь на вашем сайте. Пишем чистый код без шаблонов, легко расширяемый в дальнейшем'
                                theme='white'
                                element={element2}
                            />
                        </div>
                        <div {...getRevealProps(2, 240)}>
                            <WhyUsFirstBlock 
                                title='Разработка серверной части'
                                subtitle='Создание надежного внутреннего механизма сайта. Мы обеспечиваем полную безопасность и надежность для вашего продукта'
                                theme='black'
                                element={element3}
                            />
                        </div>
                    </div>
                    <div className={styles.lineContent}>
                        <div {...getRevealProps(3, 0)}>
                            <WhyUsSecondBlock 
                                title='Анализ конкурентов'
                                element={graphIcon}
                                theme='white'
                                isVisible={visibleItems[3]}
                                revealDelayMs={getLineDelay(0)}
                            />
                        </div>
                        <div {...getRevealProps(4, 120)}>
                            <WhyUsSecondBlock 
                                title='Чистый и расширяемый код'
                                element={devIcon}
                                theme='white'
                                isVisible={visibleItems[4]}
                                revealDelayMs={getLineDelay(120)}
                            />
                        </div>
                        <div {...getRevealProps(5, 240)}>
                            <WhyUsSecondBlock 
                                title='Построение архитектуры'
                                element={blocksIcon}
                                theme='black'
                                isVisible={visibleItems[5]}
                                revealDelayMs={getLineDelay(240)}
                            />
                        </div>
                    </div>
                    <div className={styles.lineContent}>
                        <div {...getRevealProps(6, 0, styles.animationWrapper)}>
                            <WhyUsSecondBlock 
                                title='Учет требований клиента'
                                element={chatIcon}
                                theme='white'
                                type='big'
                                subtitle='На всех этапах разработки мы согласовываем все с вами, показываем промежуточные результаты, держим в курсе процесса и все решения принимаем только после согласования. Мы заботимся о вашем продукте'
                                isVisible={visibleItems[6]}
                                revealDelayMs={getLineDelay(0)}
                            />
                        </div>
                    </div>
                    <div className={styles.lineContent}>
                        <div {...getRevealProps(7, 0)}>
                            <WhyUsSecondBlock 
                                title='Создание макета в Figma'
                                element={figmaIcon}
                                theme='white'
                                isVisible={visibleItems[7]}
                                revealDelayMs={getLineDelay(0)}
                            />
                        </div>
                        <div {...getRevealProps(8, 120)}>
                            <WhyUsSecondBlock 
                                title='Устойчивая база для SEO'
                                element={optIcon}
                                theme='white'
                                isVisible={visibleItems[8]}
                                revealDelayMs={getLineDelay(120)}
                            />
                        </div>
                        <div {...getRevealProps(9, 240)}>
                            <WhyUsSecondBlock 
                                title='Понятная админ-панель'
                                element={panelIcon}
                                theme='black'
                                isVisible={visibleItems[9]}
                                revealDelayMs={getLineDelay(240)}
                            />
                        </div>
                    </div>
                    <div className={styles.lineContent}>
                        <div {...getRevealProps(10, 0)}>
                            <WhyUsStatisticBlock 
                                title='Уникальность дизайна - от 70%'
                                percent={70}
                                description='Процент уникальности сайта'
                                color='#70E9A4'
                                element={statisticElement1}
                                theme='white'
                                isVisible={visibleItems[10]}
                                revealDelayMs={getLineDelay(0)}
                            />
                        </div>
                        <div {...getRevealProps(11, 120)}>
                            <WhyUsSpeedBlock
                                isVisible={visibleItems[11]}
                                revealDelayMs={getLineDelay(120)}
                            />
                        </div>
                        <div {...getRevealProps(12, 240)}>
                            <WhyUsStatisticBlock 
                                title='Уровень защиты сайта и данных от угроз'
                                percent={99}
                                description='Процент безопасности'
                                color='#70E9A4'
                                element={statisticElement2}
                                theme='black'
                                isVisible={visibleItems[12]}
                                revealDelayMs={getLineDelay(240)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyUsSection;

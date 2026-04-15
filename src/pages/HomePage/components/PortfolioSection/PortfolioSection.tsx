import { type CSSProperties, useRef } from 'react';
import LinkOnPageButton from '../../../../components/LinkOnPageButton/LinkOnPageButton';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useIntersectionState } from '../../../../hooks/useIntersectionState';
import { useStaggeredRevealList } from '../../../../hooks/useStaggeredRevealList';
import BigPortfolioCard from '../BigPortfolioCard/BigPortfolioCard';
import styles from '../PortfolioSection/PortfolioSection.module.scss';

import photoEditorLogo from '../../../../assets/images/pictures/photoEditorLogo.png'
import MiniPortfolioCard from '../MiniPortfolioCard/MiniPortfolioCard';
import minus12Logo from '../../../../assets/images/pictures/minus12Logo.png';
import instrumentLogo from '../../../../assets/images/pictures/instrumentLogo.png';

type PortfolioCardRevealStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined;
};

const PHOTO_EDITOR_ITEMS = [
    'Обрезка фото',
    'Сжатие фото',
    'Сохранение в разных форматах',
    'Удаление фона',
    'Хостинг на нашем сервере',
];

const MINUS_12_ITEMS = [
    'Админ панель',
    'Эквайринг',
    'Заявки',
    'Адаптивность',
    'Хостинг на нашем сервере',
];

const INSTRUMENT_ITEMS = [
    'Админ панель',
    'Каталог',
    'Заявки',
    'Адаптивность',
    'Хостинг на нашем сервере',
];

const PortfolioSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isRuntimeActive = useIntersectionState(sectionRef, {
        threshold: 0,
        rootMargin: '320px 0px',
        fallbackInView: true,
    });
    const { setItemRef, visibleItems } = useStaggeredRevealList<HTMLDivElement>(3, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
    });

    const bigCardRevealStyle: PortfolioCardRevealStyle = {
        '--reveal-delay': '0ms',
    };

    const firstMiniCardRevealStyle: PortfolioCardRevealStyle = {
        '--reveal-delay': '110ms',
    };

    const secondMiniCardRevealStyle: PortfolioCardRevealStyle = {
        '--reveal-delay': '220ms',
    };

    return(
        <section
            ref={sectionRef}
            className={styles.portfolioSection}
            data-portfolio-runtime={isRuntimeActive ? 'active' : 'idle'}
        >
            <div className={`container ${styles.container}`}>
                <SectionTitle
                    title='Портфолио'
                    subtitle='Подбираем визуальную систему под задачу бизнеса: от имиджевых студийных сайтов до продающих лендингов и масштабных корпоративных решений'
                />
                <div className={styles.content}>
                    <div className={styles.cards}>
                        <div
                            ref={(node) => {
                                setItemRef(0, node);
                            }}
                            data-reveal-index={0}
                            className={`${styles.cardReveal} ${visibleItems[0] ? styles.cardRevealVisible : ''}`}
                            style={bigCardRevealStyle}
                        >
                            <BigPortfolioCard
                                number='01'
                                miniTitle='Фоторедактор от '
                                title='триад Студио'
                                logo={photoEditorLogo}
                                link='/portfolio'
                                items={PHOTO_EDITOR_ITEMS}
                            />
                        </div>
                        <div className={styles.miniCards}>
                            <div
                                ref={(node) => {
                                    setItemRef(1, node);
                                }}
                                data-reveal-index={1}
                                className={`${styles.cardReveal} ${visibleItems[1] ? styles.cardRevealVisible : ''}`}
                                style={firstMiniCardRevealStyle}
                            >
                                <MiniPortfolioCard
                                    number='02'
                                    title='Практикум по похудению'
                                    logo={minus12Logo}
                                    link='/portfolio'
                                    items={MINUS_12_ITEMS}
                                    variant='black'
                                />
                            </div>
                            <div
                                ref={(node) => {
                                    setItemRef(2, node);
                                }}
                                data-reveal-index={2}
                                className={`${styles.cardReveal} ${visibleItems[2] ? styles.cardRevealVisible : ''}`}
                                style={secondMiniCardRevealStyle}
                            >
                                <MiniPortfolioCard
                                    number='03'
                                    title='Магазин инструментов'
                                    logo={instrumentLogo}
                                    link='/portfolio'
                                    items={INSTRUMENT_ITEMS}
                                    variant='black'
                                />
                            </div>
                        </div>
                    </div>
                    <LinkOnPageButton text='Все работы' link='/portfolio'/>
                </div>
            </div>
        </section>
    )
}

export default PortfolioSection;

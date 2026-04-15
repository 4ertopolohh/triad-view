import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import StageCard from '../StageCard/StageCard';
import styles from '../StagesSection/StagesSection.module.scss';

import fileImage from '../../../../assets/images/pictures/fileImage.png';
import paperImage from '../../../../assets/images/pictures/paperImage.png';
import loupeImage from '../../../../assets/images/pictures/loupeImage.png';
import chatImage from '../../../../assets/images/pictures/chatImage.png';
import tickImage from '../../../../assets/images/pictures/tickImage.png'; 
import starImage from '../../../../assets/images/pictures/starImage.png'; 
import menuImage from '../../../../assets/images/pictures/menuImage.png';
import settingsImage from '../../../../assets/images/pictures/settingsImage.png';
import showImage from '../../../../assets/images/pictures/showImage.png';
import dangerImage from '../../../../assets/images/pictures/dangerImage.png';
import bookmarkImage from '../../../../assets/images/pictures/bookmarkImage.png';
import playImage from '../../../../assets/images/pictures/playImage.png';
import activityImage from '../../../../assets/images/pictures/activityImage.png';
import paperPlusImage from '../../../../assets/images/pictures/paperPlusImage.png';
import shieldImage from '../../../../assets/images/pictures/shieldImage.png';

const stages = [
    {
        title: 'консультация',
        description: 'Мы бесплатно консультируем клиента, помогаем определиться с целями и задачами, предлагая оптимальные решения для достижения успеха',
        count: '1',
        image: chatImage,
    },
    {
        title: 'составление тз',
        description: 'Если у клиента нет технического задания, аккуратно и просто помогаем его составить, исходя из пожеланий',
        count: '2',
        image: fileImage,
    },
    {
        title: 'Заключение договора',
        description: 'Подписываем договор с клиентом, получаем предоплату и приступаем к работе',
        count: '3',
        image: paperImage,
    },
    {
        title: 'Анализ конкурентов',
        description: 'Мы анализируем сайты с похожей тематикой, сравниваем плюсы и минусы, а затем подбираем уникальный и эффективный подход именно для вас',
        count: '4',
        image: loupeImage,
    },
    {
        title: 'создание набросков',
        description: 'Мы предлагаем несколько идей для реализации сайта, а клиент выбирает лучшую',
        count: '5',
        image: tickImage,
    },
    {
        title: 'создание дизайна',
        description: 'По утвержденной задумке мы создаем дизайн в Figma, постоянно консультируясь с клиентом, учитывая все пожелания',
        count: '6',
        image: starImage,
    },
    {
        title: 'разработка интерфейса',
        description: 'По макету разрабатывается та часть сайта, что будет видна пользователю. Мы пишем код готовый к расширению сайта в будущем',
        count: '7',
        image: showImage,
    },
    {
        title: 'тесты, оптимизация',
        description: 'Тестируем работу интерфейса, согласовываем все с клиентом, оптимизируем для быстрой загрузки и работы',
        count: '8',
        image: settingsImage,
    },
    {
        title: 'серверная часть',
        description: 'Создаем удобную админ панель и прочий функционал (например эквайринг, заявки). Процесс идет параллельно с разработкой интерфейса',
        count: '9',
        image: menuImage,
    },
    {
        title: 'тесты, оптимизация',
        description: 'Тесты серверного функционала, настройка безопасности и надежности работы, интеграции с аналитикой и прочими сервисами',
        count: '10',
        image: dangerImage,
    },
    {
        title: 'утверждение результата',
        description: 'Показываем результат клиенту, вносим правки, даем протестировать функционал',
        count: '11',
        image: bookmarkImage,
    },
    {
        title: 'хостиг сайта',
        description: 'Запускаем сайт на сервере, тестируем работу, проводим аналитику, при необходимости вносим правки и оптимизируем',
        count: '12',
        image: playImage,
    },
    {
        title: 'SEO оптимизация',
        description: 'Создаем твердую базу для работы SEO специалистов. Инструменты для тегов в админ панели, оптимизированный для браузеров и ботов код',
        count: '13',
        image: activityImage,
    },
    {
        title: 'создание документации',
        description: 'Составляем понятную инструкцию к админ панели и всему проекту, для простого использования клиентом или иным разработчиком в будущем',
        count: '14',
        image: paperPlusImage,
    },
    {
        title: 'поддержка',
        description: 'Поддержка продукта после запуска, доработки, правки, консультации по развитию и продвижению. Постоянная связь с клиентом',
        count: '15',
        image: shieldImage,
    },
];

const StagesSection = () => {
    const initialActiveIndex = stages.length > 1 ? 1 : 0;
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    return (
        <section className={styles.stagesSection}>
            <div className={`container ${styles.container}`}>
                <SectionTitle title='этапы работы' subtitle='От идеи до готового сайта' />
            </div>
            <Swiper
                className={styles.swiper}
                slidesPerView='auto'
                centeredSlides
                initialSlide={initialActiveIndex}
                spaceBetween={55}
                speed={500}
                autoHeight
                grabCursor
                watchSlidesProgress
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {stages.map((stage, index) => (
                    <SwiperSlide
                        key={`${stage.count}-${stage.title}-${index}`}
                        className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`}
                    >
                        <StageCard
                            title={stage.title}
                            description={stage.description}
                            count={stage.count}
                            image={stage.image}
                            active={index === activeIndex}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default StagesSection;

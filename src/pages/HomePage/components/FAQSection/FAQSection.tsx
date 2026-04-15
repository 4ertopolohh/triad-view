import { type CSSProperties } from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useRevealOnIntersect } from '../../../../hooks/useRevealOnIntersect';
import FAQCard from '../FAQCard/FAQCard';
import styles from '../FAQSection/FAQSection.module.scss';

const faqItems = [
    {
        question: 'Как мы работаем?',
        answer: 'Мы работаем по договору о сотрудничестве, который предоставляем и подписываем с клиентом перед началом работ. Так же мы всегда работаем по предоплате 50%',
    },
    {
        question: 'Делаете только самописные сайты?',
        answer: 'Да, мы создаем только самописные сайты, без шаблонов и готовых решений, только чистый код',
    },
    {
        question: 'Что такое самописный сайт?',
        answer: 'Это веб-ресурс, созданный «с нуля» без использования готовых систем управления контентом (CMS вроде WordPress) или конструкторов',
    },
    {
        question: 'В чем отличие?',
        answer: 'В самописных сайтах можно реализовать функционал любой сложности, пока в CMS он ограничен встроенными инструментами. Так же они быстрее работают, у них лучше безопасность, и все контролируете только вы, без посредников ',
    },
    {
        question: 'Сколько длится разработка?',
        answer: 'В среднем от 3 до 8 недель — зависит от сложности и объёма проекта',
    },
    {
        question: 'Сколько стоит сайт?',
        answer: 'Стоимость рассчитывается индивидуально после обсуждения задач и функционала',
    },
    {
        question: 'Можно ли купить отдельные услуги?',
        answer: 'Да, если у вас например уже есть дизайн, или нужен лендинг без серверной части, или еще какая то задача, вы можете обратиться к нам',
    },
    {
        question: 'Какие технологии используете?',
        answer: 'React для интерфейса и Django для серверной части. Это современный, быстрый и гибкий стек',
    },
];

const FAQSection = () => {
    const { ref: sectionRef, isVisible } = useRevealOnIntersect<HTMLElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
    });

    return(
        <section ref={sectionRef} className={styles.faqSection}>
            <div className={`container ${styles.container}`}>
                <SectionTitle title='FAQ' subtitle='Ответы на часто задаваемые вопросы'/>
                <div className={styles.content}>
                    {faqItems.map((item, index) => (
                        <div
                            key={item.question}
                            className={`${styles.cardWrapper} ${isVisible ? styles.cardVisible : ''}`}
                            style={{ '--faq-card-delay': `${index * 120}ms` } as CSSProperties}
                        >
                            <FAQCard question={item.question} answer={item.answer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQSection;

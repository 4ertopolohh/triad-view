import styles from '../DomenSectionBlock/DomenSectionBlock.module.scss';
import { useRevealOnIntersect } from '../../../../hooks/useRevealOnIntersect';

import glassHomeIcon from '../../../../assets/images/pictures/glassHomeIcon.png'
import { Link } from 'react-router';

const DomenSectionBlock = () => {
    const { ref: blockRef, isVisible } = useRevealOnIntersect<HTMLAnchorElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
    });

    return(
        <Link
            to={'/chat'}
            ref={blockRef}
            className={`${styles.domenSectionBlock} ${isVisible ? styles.domenSectionBlockVisible : ''}`}
        >
            <div className={styles.desc}>
                <h4 className={styles.title}>Домен на год в подарок!</h4>
                <p className={styles.subtitle}>Не нужно беспокоиться о покупке домена для вашего сайта, мы сделаем все за вас! При покупке полного цикла разработки от нашей студии, любой домен (кроме .ru, .su, .рф и .com) за наш счет!</p>
            </div>
            <img src={glassHomeIcon} alt="" loading='lazy' className={styles.icon}/>
        </Link>
    )
}

export default DomenSectionBlock;

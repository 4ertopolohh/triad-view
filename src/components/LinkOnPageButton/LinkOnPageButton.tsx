import { Link } from 'react-router';
import styles from '../LinkOnPageButton/LinkOnPageButton.module.scss';
import { useRevealOnIntersect } from '../../hooks/useRevealOnIntersect';

import diagonalArrow from '../../assets/images/icons/diagonalArrow.png'

export type LinkOnPageButtonProps = {
    text: string
    link: string
}

const LinkOnPageButton = ({ text, link }:LinkOnPageButtonProps) => {
    const { ref: buttonRef, isVisible } = useRevealOnIntersect<HTMLDivElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
    });

    return(
        <div
            ref={buttonRef}
            className={`${styles.linkOnPageButtonReveal} ${isVisible ? styles.linkOnPageButtonRevealVisible : ''}`}
        >
            <Link to={link} className={styles.linkOnPageButton}>
                <span className='blockSpan'>{text}</span>
                <img src={diagonalArrow} alt="" className={styles.icon} loading='lazy'/>
            </Link>
        </div>
    )
}

export default LinkOnPageButton;

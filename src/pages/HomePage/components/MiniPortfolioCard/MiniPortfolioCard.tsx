import { Link } from 'react-router';
import WatcWorkButton from '../../../../components/WatcWorkButton/WatcWorkButton';
import styles from '../MiniPortfolioCard/MiniPortfolioCard.module.scss';

export type MiniPortfolioCardProps = {
    number: string
    title: string
    logo: string
    link: string
    items: string[]
    variant?: 'black' | 'blue'
}

const MiniPortfolioCard = ({ number, title, logo, link, items, variant = 'black' }:MiniPortfolioCardProps) => {
    return(
        <Link to={link} className={`${styles.miniPortfolioCard} ${styles[variant]}`}>
            <div className={styles.header}>
                <h2 className={styles.number}>{number}</h2>
                <h1 className={styles.title}>{title}</h1>
            </div>
            <div className={styles.body}>
                <div className={styles.wrapper}>
                    <img src={logo} alt="" loading='lazy' className={styles.logo}/>
                </div>
                <div className={styles.desc}>
                    <ul className={styles.info}>
                        {items.map((item, index) => (
                            <li key={`${item}-${index}`} className={styles.item}>
                                - {item}
                            </li>
                        ))}
                    </ul>
                    <WatcWorkButton variant='white' link={link}/>
                </div>
            </div>
        </Link>
    )
}

export default MiniPortfolioCard;

import { Link } from 'react-router';
import styles from '../BigPortfolioCard/BigPortfolioCard.module.scss';
import WatcWorkButton from '../../../../components/WatcWorkButton/WatcWorkButton';

export type BigPortfolioCardProps = {
    number: string
    miniTitle: string
    title: string
    logo: string
    link: string
    items: string[]
}

const BigPortfolioCard = ({ number, miniTitle, title, logo, link, items }:BigPortfolioCardProps) => {
    return(
        <Link to={'/portfoio'} className={styles.bigPortfolioCard}>
            <h2 className={styles.number}>{number}</h2>
            <div className={styles.title}>
                <p className={styles.miniTitle}>{miniTitle}</p>
                <h1 className={styles.bigTitle}>{title}</h1>
            </div>
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
                <WatcWorkButton variant='black' link={link}/>
            </div>
        </Link>
    ) 
}

export default BigPortfolioCard;

import { Link } from 'react-router';
import styles from '../OthersCard/OthersCard.module.scss';

export type OthersCardProps = {
    image: string;
    desc: string;
    link: string
}

const OthersCard = ({ image, desc, link }: OthersCardProps) => {
    return(
        <Link className={styles.othersCard} to={link}>
            <img src={image} alt="" loading='lazy' className={styles.image}/>
            <p className={styles.desc}>{desc}</p>
        </Link> 
    )
}

export default OthersCard;
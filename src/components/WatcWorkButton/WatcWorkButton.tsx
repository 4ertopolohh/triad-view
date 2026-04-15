import { Link } from 'react-router';
import styles from '../WatcWorkButton/WatcWorkButton.module.scss';

export type WatcWorkButtonProps = {
    variant?: 'black' | 'white'
    link: string
}

const WatcWorkButton = ({ link, variant = 'black' }: WatcWorkButtonProps) => {
    return(
        <Link to={link} className={`${styles.watcWorkButton} ${styles[variant]}`}>
            <span className='blockSpan'>Смотреть работу</span>
        </Link>
    )
}

export default WatcWorkButton;

import { Link } from 'react-router';
import styles from '../SuitsMeButton/SuitsMeButton.module.scss';

type SuitsMeButtonVariant = 'white' | 'black';

type SuitsMeButtonProps = {
    variant?: SuitsMeButtonVariant
}

const suitsMeIcons: Record<SuitsMeButtonVariant, string> = {
    white: `data:image/svg+xml;utf8,${encodeURIComponent('<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6L1.99965 12L-8.7464e-08 9.99906L4.00071 6L-4.37073e-07 2.00094L1.99965 -8.74073e-08L8 6Z" fill="#303030"/></svg>')}`,
    black: `data:image/svg+xml;utf8,${encodeURIComponent('<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6L1.99965 12L-8.7464e-08 9.99906L4.00071 6L-4.37073e-07 2.00094L1.99965 -8.74073e-08L8 6Z" fill="#F2F2F2"/></svg>')}`,
}

const SuitsMeButton = ({ variant = 'black' }: SuitsMeButtonProps) => {
    return(
        <Link to={'/chat'} className={`${styles.suitsMeButton} ${styles[variant]}`}>
            <span className='blockSpan'>Мне подходит</span>
            <img className={styles.icon} src={suitsMeIcons[variant]} alt="" loading='lazy'/>
        </Link>
    )
}

export default SuitsMeButton;

import { Link } from 'react-router';
import styles from '../WantButton/WantButton.module.scss';

const WantButton = () => {
    return(
        <Link to={'/services'} className={styles.wantButton}>
            <span className='blockSpan'>ХОЧУ!</span>
        </Link>
    )
}

export default WantButton;
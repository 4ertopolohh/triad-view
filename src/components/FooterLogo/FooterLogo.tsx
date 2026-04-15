import { Link } from 'react-router';
import styles from '../FooterLogo/FooterLogo.module.scss';

import headerLogo from '../../assets/images/pictures/headerLogo.png'

const FooterLogo = () => {
    return(
        <Link to={'/'} className={styles.footerLogo}>
            <img src={headerLogo} alt="" loading='lazy'/>
            <h5>триад студио</h5>
        </Link>
    )
}

export default FooterLogo;
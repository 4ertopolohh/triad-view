import { Link } from 'react-router';

import styles from '../HeaderLogo/HeaderLogo.module.scss';

import headerLogo from '../../assets/images/pictures/headerLogo.png'

const HeaderLogo = () => {
    return(
        <Link to='/' className={styles.headerLogo}>
            <img src={headerLogo} alt="" loading='lazy'/>
        </Link>
    )
}

export default HeaderLogo;

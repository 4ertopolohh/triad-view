import { Link } from 'react-router';

import styles from '../OnHomeButton/OnHomeButton.module.scss';

const OnHomeButton = () => {
    return(
        <Link to="/" className={styles.onHomeButton}>
            <span className='blockSpan'>{'\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e'}</span>
        </Link>
    )
}

export default OnHomeButton;

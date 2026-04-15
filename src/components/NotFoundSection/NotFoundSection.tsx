import styles from '../NotFoundSection/NotFoundSection.module.scss';
import OnHomeButton from '../OnHomeButton/OnHomeButton';

const NotFoundSection = () => {
    return(
        <section className={styles.notFoundSection}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>404</h1>
                <h6 className={styles.subtitle}>страница не найдена</h6>
                <OnHomeButton />
            </div>
        </section>
    )
}

export default NotFoundSection;
import styles from '../InDevSection/InDevSection.module.scss';
import OnHomeButton from '../OnHomeButton/OnHomeButton';

export type InDevSectionProps = {
    title: string
}

const InDevSection = ({ title }:InDevSectionProps) => {
    return(
        <section className={styles.inDevSection}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.subtitle}>страница в разработке</h5>
                <OnHomeButton />
            </div>
        </section>
    )
}

export default InDevSection;
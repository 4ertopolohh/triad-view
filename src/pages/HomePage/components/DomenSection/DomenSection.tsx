import styles from '../DomenSection/DomenSection.module.scss';
import DomenSectionBlock from '../DomenSectionBlock/DomenSectionBlock';

const DomenSection = () => {
    return(
        <section className={styles.domenSection}>
            <div className={`container ${styles.container}`}>
                <DomenSectionBlock />
            </div>
        </section>
    )
}

export default DomenSection;
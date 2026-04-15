import ReactLogo3D from '../../../../components/ReactLogo3D/ReactLogo3D';
import styles from '../WelcomeSection/WelcomeSection.module.scss';
import WelcomeSectionDesc from '../WelcomeSectionDesc/WelcomeSectionDesc';

const WelcomeSection = () => {
    return(
        <section className={styles.welcomeSection}>
            <div className={`container ${styles.container}`}>
                <WelcomeSectionDesc />
                <ReactLogo3D renderOnView adaptiveOptimisation='off' stylePreset='metallic'/>
            </div>
        </section>
    )
}

export default WelcomeSection;

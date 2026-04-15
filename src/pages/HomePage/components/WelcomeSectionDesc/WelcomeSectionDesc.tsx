import ContactsButton from '../../../../components/ContactsButton/ContactsButton';
import styles from '../WelcomeSectionDesc/WelcomeSectionDesc.module.scss';

const WelcomeSectionDesc = () => {
    return(
        <div className={styles.welcomeSectionDesc}>
            <h1 className={styles.title}>триад студио</h1>
            <p className={styles.subtitle}>Студия разработки самописных веб-сайтов <br/> Никаких шаблонов - только ваши требования</p>
            <ContactsButton text='ПРОКОНСУЛЬТИРОВАТЬСЯ' width={312} height={50} borderRadius={25}/>
        </div>
    )
}

export default WelcomeSectionDesc;
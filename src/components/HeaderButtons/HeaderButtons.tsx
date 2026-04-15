import ChangeLanguageButton from '../ChangeLanguageButton/ChangeLanguageButton';
import ContactsButton from '../ContactsButton/ContactsButton';
import styles from '../HeaderButtons/HeaderButtons.module.scss';
import SingInButton from '../SingInButton/SingInButton';

const HeaderButtons = () => {
    return(
        <div className={styles.headerButtons}>
            <ContactsButton text='СВЯЗАТЬСЯ' width={160} height={40} borderRadius={20}/>
            <ChangeLanguageButton />
            <SingInButton />
        </div>
    )
}

export default HeaderButtons;
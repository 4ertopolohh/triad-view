import styles from '../Footer/Footer.module.scss';

import googleIcon from '../../assets/images/pictures/googleIcon.png'
import gitIcon from '../../assets/images/pictures/gitIcon.png'
import vkIcon from '../../assets/images/pictures/vkIcon.png'
import tgIcon from '../../assets/images/pictures/tgIcon.png'
import FooterLogo from '../FooterLogo/FooterLogo';

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <FooterLogo />
                </div>
                <div className={styles.content}>
                    <a href="https://4ertopolohh.github.io/image-editor-view/" className={styles.photoEditorLink}>
                        Наш фоторедактор
                    </a>
                    <div className={styles.socialsBlock}>
                        <h6 className={styles.title}>
                            Соц. сети
                        </h6>
                        <ul className={styles.socialsList}>
                            <li className={styles.socialsListItem}>
                                <a href="" className={styles.socialsListLink}>
                                    <img src={googleIcon} alt="" loading='lazy'/>
                                </a>
                            </li>
                            <li className={styles.socialsListItem}>
                                <a href="" className={styles.socialsListLink}>
                                    <img src={gitIcon} alt="" loading='lazy'/>
                                </a>
                            </li>
                            <li className={styles.socialsListItem}>
                                <a href="" className={styles.socialsListLink}>
                                    <img src={vkIcon} alt="" loading='lazy'/>
                                </a>
                            </li>
                            <li className={styles.socialsListItem}>
                                <a href="" className={styles.socialsListLink}>
                                    <img src={tgIcon} alt="" loading='lazy'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.docsBlock}>
                        <a href="" className={styles.docLink}>Договор оферты</a>
                        <a href="" className={styles.docLink}>Политика конфиденциальности</a>
                        <span className={styles.devLink}>Разработано <a href="https://t.me/T3riadStudio">Триад Студио</a></span>
                    </div>
                    <div className={styles.allRights}>
                        <h6>2026 Все права защищены</h6>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
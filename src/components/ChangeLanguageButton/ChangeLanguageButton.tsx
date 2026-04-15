import { useState } from 'react';

import styles from './ChangeLanguageButton.module.scss';

const ChangeLanguageButton = () => {
    const [isEnglishActive, setIsEnglishActive] = useState(false)

    const handleLanguageToggle = () => {
        setIsEnglishActive((prevState) => !prevState)
    }

    return (
        <button
            type="button"
            className={styles.changeLanguageButton}
            onClick={handleLanguageToggle}
            aria-pressed={isEnglishActive}
            aria-label={isEnglishActive ? 'Current language is English' : 'Current language is Russian'}
        >
            <span className={styles.languageText}>
                <span
                    className={`${styles.languagePart} ${isEnglishActive ? styles.languagePartActive : styles.languagePartInactive}`}
                >
                    EN
                </span>
                <span className={styles.separator}> | </span>
                <span
                    className={`${styles.languagePart} ${isEnglishActive ? styles.languagePartInactive : styles.languagePartActive}`}
                >
                    RU
                </span>
            </span>
        </button>
    )
}

export default ChangeLanguageButton;

import { useEffect, useState } from 'react';

import styles from './Header.module.scss'
import HeaderButtons from '../HeaderButtons/HeaderButtons';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderNav from '../HeaderNav/HeaderNav';

type HeaderProps = {
    navItems: {
        label: string
        to: string
    }[]
}

const Header = ({ navItems }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(() => {
        if (typeof window === 'undefined') {
            return false
        }

        return window.scrollY > 0
    })

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled((previousIsScrolled) => {
                const nextIsScrolled = window.scrollY > 0

                return previousIsScrolled === nextIsScrolled ? previousIsScrolled : nextIsScrolled
            })
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return(
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <HeaderLogo />
                <HeaderNav navItems={navItems} />
                <HeaderButtons />
            </div>
        </header>
    )
}

export default Header;

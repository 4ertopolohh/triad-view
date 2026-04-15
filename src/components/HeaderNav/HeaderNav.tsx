import { NavLink } from 'react-router';

import styles from '../HeaderNav/HeaderNav.module.scss'

type HeaderNavProps = {
    navItems: {
        label: string
        to: string
    }[]
}

const HeaderNav = ({ navItems }: HeaderNavProps) => {
    return(
        <nav className={styles.headerNav}>
            <ul className={styles.headerNavList}>
                {navItems.map((item) => (
                    <li key={item.to} className={styles.headerNavListItem}>
                        <NavLink
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.headerNavListItemLink} ${styles.headerNavListItemLinkActive}`
                                    : styles.headerNavListItemLink
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderNav;

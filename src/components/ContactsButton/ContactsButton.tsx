import type { CSSProperties } from 'react';

import styles from './ContactsButton.module.scss';
import { Link } from 'react-router';

type SizeValue = string | number;

export type ContactsButtonProps = {
    text: string
    width?: SizeValue
    height?: SizeValue
    borderRadius?: number
}

const normalizeSize = (value?: SizeValue) => {
    if (typeof value === 'number') {
        return `${value}px`
    }

    return value
}

const ContactsButton = ({ text, width, height, borderRadius }: ContactsButtonProps) => {
    const contactsButtonStyles: CSSProperties = {
        width: normalizeSize(width),
        height: normalizeSize(height),
        borderRadius: normalizeSize(borderRadius),
    }

    return (
        <Link to="/chat" className={styles.contactsButton} style={contactsButtonStyles}>
            <span className='blockSpan'>{text}</span>
        </Link>
    )
}

export default ContactsButton;

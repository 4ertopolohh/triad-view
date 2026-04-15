import styles from '../SingInButton/SingInButton.module.scss';

const SingInButton = () => {
    return(
        <button className={styles.SingInButton}>
            <span className='blockSpan'>
                Войти
            </span>
        </button>
    )
}

export default SingInButton;
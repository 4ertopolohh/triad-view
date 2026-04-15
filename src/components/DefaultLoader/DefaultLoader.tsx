import styles from './DefaultLoader.module.scss'

type DefaultLoaderVariant = 'fullscreen' | 'inline'

type DefaultLoaderProps = {
  label?: string
  variant?: DefaultLoaderVariant
}

const DefaultLoader = ({
  label = 'Загрузка',
  variant = 'fullscreen',
}: DefaultLoaderProps) => {
  return (
    <div
      className={`${styles.defaultLoader} ${styles[variant]}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={styles.body}>
        <div className={styles.mark} aria-hidden="true">
          <span className={`${styles.ring} ${styles.ringBase}`} />
          <span className={`${styles.ring} ${styles.ringPrimary}`} />
          <span className={`${styles.ring} ${styles.ringSecondary}`} />
          <span className={styles.orbitTrack}>
            <span className={styles.orbitDot} />
          </span>
          <span className={styles.core} />
        </div>

        <div className={styles.caption}>
          <span className={styles.brand}>triad studio</span>
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    </div>
  )
}

export default DefaultLoader

import styles from '../StageCard/StageCard.module.scss';

export type StageCardProps = {
    count: string
    title: string
    image: string
    description: string
    active?: boolean
}

const StageCard = ({ count, title, image, description, active }: StageCardProps) => {
    return (
        <div className={`${styles.stageCard} ${active ? styles.active : ''}`}>
            <div className={styles.header}>
                <div className={styles.count}>
                    <span className='blockSpan'>{count}</span>
                </div>
                <h5 className={styles.title}>{title}</h5>
            </div>
            <img src={image} alt={title} loading='lazy' className={styles.image} />
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default StageCard;

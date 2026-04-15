import styles from '../FAQCard/FAQCard.module.scss';

export type FAQCardProps = {
    question: string;
    answer: string;
}

const FAQCard = ({ question, answer }: FAQCardProps) => {
    return(
        <div className={styles.faqCard}>
            <h3 className={styles.question}>{question}</h3>
            <p className={styles.answer}>{answer}</p>
        </div>
    )
}

export default FAQCard;
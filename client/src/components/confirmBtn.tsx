import styles from "../css/check.module.css"

interface Props {
    content: string;
  }

function ConfirmBtn({ content }: Props){
    return(
        <section className={styles.ipsect}>
                <button className={styles.check}>
                    {content}
                </button>
        </section>
    );
}


export default ConfirmBtn;
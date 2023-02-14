import styles from "../css/check.module.css"

function Check(){
    return(
        <section className={styles.ipsect}>
                <button className={styles.check}>
                    확인
                </button>
        </section>
    );
}


export default Check;
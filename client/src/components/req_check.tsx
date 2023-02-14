import styles from "../css/req_check.module.css"

function Req_check(){
    return(
        <section className={styles.ipsect}>
                <button className={styles.check}>
                    _원 결제하기
                </button>
        </section>
    );
}

export default Req_check;
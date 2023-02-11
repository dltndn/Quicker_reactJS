import styles from "../css/req_weight.module.css"

function Req_weight() {
    return (
        <section className={styles.bc}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div>
                            <span className={styles.reqfont}>물품 중량</span>
                        </div>
                        <div className={styles.ipdiv2}>
                            <select name="weight" className={styles.ipval}>
                                <option value="10">10 이상</option>
                                <option value="20">20 이상</option>
                            </select>
                        </div>
                    </div>
                </div>
        </section>
    );
  }
  
  export default Req_weight;
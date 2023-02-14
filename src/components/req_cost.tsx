import styles from "../css/req_cost.module.css"

function Req_cost() {
    return (
        <section className={styles.bc}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div>
                            <span className={styles.reqfont}>의뢰 비용</span>
                        </div>
                        <div className={styles.ipdiv2}>
                            <input type="number" className={styles.ipval} placeholder="지갑 잔액을 확인하세요"/>
                        </div>
                    </div>
                </div>
        </section>
    );
  }
  
  export default Req_cost;
import styles from "../../css/req_detail.module.css"

function Req_detail() {
    return (
        <section className={styles.bc}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div>
                            <span className={styles.reqfont}>세부사항</span>
                        </div>
                        <div className={styles.ipdiv2}>
                            <input type="text" className={styles.ipval} placeholder="내용을 입력해주세요"/>
                        </div>
                    </div>
                </div>
        </section>
    );
  }
  
  export default Req_detail;
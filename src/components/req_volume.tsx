import styles from "../css/req_volume.module.css"

function Req_volume() {
    return (
        <section className={styles.bc}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div>
                            <span className={styles.reqfont}>물품 부피</span>
                        </div>
                        <div className={styles.btdiv}>
                            <ul className={styles.btul}>
                                <li>
                                    <span className={styles.sppa0}>가로</span>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>cm</span>
                                </li>
                                <li>
                                    <span className={styles.sppa0}>가로</span>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>cm</span>
                                </li>
                                <li>
                                    <span className={styles.sppa0}>가로</span>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>cm</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </section>
    );
  }
  
  export default Req_volume;
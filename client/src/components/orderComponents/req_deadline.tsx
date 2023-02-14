import styles from "../../css/req_deadline.module.css"
import { BsCalendar3, BsClock} from "react-icons/bs";

function Req_deadline() {
    return (
        <section className={styles.bc}>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div>
                            <span className={styles.reqfont}>배송기한</span>
                        </div>
                        <div className={styles.btdiv}>
                            <ul className={styles.btul}>
                                <li className={styles.leftbt}>
                                    <BsCalendar3></BsCalendar3>
                                </li>
                                <li>
                                    <input type="number" className={styles.ipval0} placeholder=""/>
                                    <span className={styles.sppa1}>년</span>
                                </li>
                                <li>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>월</span>
                                </li>
                                <li>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>일</span>
                                </li>
                            </ul>
                            <div className={styles.btdiv}>
                            <ul className={styles.btul}>
                                <li className={styles.leftbt}>
                                    <BsClock></BsClock>
                                </li>
                                <li>
                                    <button className={styles.ipbutton0}>
                                        인증
                                    </button>
                                    <button className={styles.ipbutton1}>
                                        인증
                                    </button>
                                </li>
                                <li>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>시</span>
                                </li>
                                <li>
                                    <input type="number" className={styles.ipval} placeholder=""/>
                                    <span className={styles.sppa1}>분</span>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
        </section>
    );
  }
  
  export default Req_deadline;
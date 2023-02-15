import styles from "../../css/main_textimage.module.css"

const img1 = require('../../image/ex1.jpg')

function Main_textimage() {

    return (
        <>
        <section className={styles.mainsc}>
            <div className={styles.main1}>
                <li className={styles.maintx1}>가다나라마바사</li>
                <li className={styles.maintx2}>가나다라마바사<br />
                    가나다라마바사<br />
                    가나다라마바사
                </li>
            </div>
            <div className={styles.main1}>
                <button className={styles.imbutton}>
                    <div className={styles.divimg}>
                    <img src={img1} alt="" />
                    </div>
                </button>
            </div>
        </section>
        <section className={styles.mainsc}>
            <div className={styles.main1}>
                <button className={styles.imbutton}>
                    <div className={styles.divimg}>
                    <img src={img1} alt="" />
                    </div>
                </button>
            </div>
            <div className={styles.main1}>
                <li className={styles.maintx1}>가다나라마바사</li>
                <li className={styles.maintx2}>가나다라마바사<br />
                    가나다라마바사<br />
                    가나다라마바사
                </li>
            </div>
        </section>
        </>
    );
  }
  
  export default Main_textimage;
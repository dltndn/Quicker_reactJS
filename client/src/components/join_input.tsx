import {Icon} from 'semantic-ui-react';
import styles from "../css/join_input.module.css"

function Join_input(){
    return(
        <>
        <section className={styles.ipsect0}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    이름
                </span>
            </div>
            <div className={styles.ipdiv2}>
                <input type="text" className={styles.ipval} placeholder="성함을 입력해주세요"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    생년월일
                </span>
            </div>
            <div className={styles.ipbth}>
                <input type="date" className={styles.ipdate} placeholder="0000"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    이메일 주소
                </span>
            </div>
            <div className={styles.ipem0}>
                <input type="text" className={styles.ipval} placeholder="ex0"/>
            </div>
            <div className={styles.ipic}>
                <Icon name='at' />
            </div>
            <div className={styles.ipem1}>
                <input type="number" className={styles.ipval} placeholder="gmail.com"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    연락처
                </span>
            </div>
            <div className={styles.ipnum0}>
                <input type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum1}>
                <input type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum2}>
                <input type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum0}>
                <button className={styles.ipbutton}>
                    인증
                </button>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    지갑 주소
                </span>
            </div>
        </section>
        <section className={styles.ipsect}>
            <div className={styles.divwal}>
                <button className={styles.btwal}>주소 내용</button>
            </div>
        </section>
        </>
    );
}


export default Join_input;
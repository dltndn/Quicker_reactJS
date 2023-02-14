import {Icon} from 'semantic-ui-react';
import styles from "../css/main_phrase.module.css"

function GoSignUpPage(){
    window.location.href="/signUp"
}

function Main_phrase() {
    return (
        <section>
            <div className={styles.phrase_div}>
                <span className={styles.phrase_1}>안녕하세요!<br /></span>
                <span className={styles.phrase_2}>접속을 환영합니다.</span>
                <button className={styles.button} onClick={GoSignUpPage}><Icon link name = 'angle right'/></button>
            </div>
        </section>
    );
  }
  
  export default Main_phrase;
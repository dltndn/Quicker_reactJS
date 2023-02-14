import {Button} from 'semantic-ui-react';
import styles from "../css/main_notice.module.css"

function Main_notice() {

    return (
        <section className={styles.bont}>
            <Button fluid>
                <ul className={styles.notice}>
                <li>
                    <span className={styles.noticetx1}>공지</span>
                    <span className={styles.noticetx2}>가나다라마바사</span>
                </li>
                </ul>
            </Button>
        </section>
    );
  }
  
  export default Main_notice;
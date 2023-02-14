import {Icon} from 'semantic-ui-react';
import styles from "../css/join_topbar.module.css"

function GoMainPage(){
    window.location.href="/"
}

function Jointopbar(){
    return(
        <section className={styles.header}>
            <div>
                <button className={styles.button} onClick={GoMainPage} ><Icon link name = 'angle left'/></button>
                <span className={styles.headertext}>
                    회원가입
                </span>
            </div>
        </section>
    );
}

export default Jointopbar;
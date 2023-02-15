import {Icon} from 'semantic-ui-react';
import styles from "../../css/main_topbar.module.css"

function Main_topbar() {

    return (
        <section>
            <div className={styles.maintab}>
                <span className={styles.Quicker}>Quicker</span>
                <button className={styles.bellbutton}><Icon link name='bell outline'/></button>
            </div>
        </section>
    );
  }
  
  export default Main_topbar;
import styles from "../css/req_topbar.module.css"
import { BsHouseDoor, BsBell,BsChevronLeft  } from "react-icons/bs";

function Req_topbar() {
    return (
        <section>
            <div className={styles.topdiv}>
                <button className={styles.leftbt}><BsChevronLeft></BsChevronLeft></button>
                <button className={styles.homebt}><BsHouseDoor></BsHouseDoor></button>
                <button className={styles.bellbt}><BsBell></BsBell></button>
            </div>
        </section>
    );
  }
  
  export default Req_topbar;
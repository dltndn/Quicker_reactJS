import styles from "../css/req_topbar.module.css"
import { BsHouseDoor, BsBell,BsChevronLeft  } from "react-icons/bs";
import { To, useNavigate } from "react-router-dom";

interface Props {
    title: string
    redirectLogic: ()=> void
  }

function TopBarOthers({ title, redirectLogic }: Props) {
    const navigate = useNavigate();

    return (
        <section>
            <div className={styles.topdiv}>
                <button className={styles.leftbt} onClick={() => redirectLogic()}><BsChevronLeft></BsChevronLeft></button>
                <span className={styles.headertext}>
                    {title}
                </span>
                <button className={styles.homebt} onClick={() => navigate('/')}><BsHouseDoor></BsHouseDoor></button>
                <button className={styles.bellbt}><BsBell></BsBell></button>
            </div>
        </section>
    );
  }
  
  export default TopBarOthers;
import styles from "../css/req_topbar.module.css"
import { BsHouseDoor, BsBell,BsChevronLeft  } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string;
    redirect: string
  }

function TopBarOthers({ title, redirect }: Props) {
    const navigate = useNavigate();
    return (
        <section>
            <div className={styles.topdiv}>
                <button className={styles.leftbt} onClick={() => navigate(redirect)}><BsChevronLeft></BsChevronLeft></button>
                <span className={styles.headertext}>
                    {title}
                </span>
                <button className={styles.homebt}><BsHouseDoor></BsHouseDoor></button>
                <button className={styles.bellbt}><BsBell></BsBell></button>
            </div>
        </section>
    );
  }
  
  export default TopBarOthers;
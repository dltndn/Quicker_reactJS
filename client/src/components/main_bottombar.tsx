import {Icon} from 'semantic-ui-react';
import styles from "../css/main_bottombar.module.css"

function GoRequestPage(){
    window.location.href="/request"
}

function GoSearchPage(){
    window.location.href="/search"
}

function GoChattingPage(){
    window.location.href="/chatting"
}

function GoInformationPage(){
    window.location.href="/imformation"
}

function Main_Bottombar() {

    return (
        <div className={styles.btposition}>
           <ul className={styles.btul}>
                <li>
                    <button onClick={GoRequestPage}>
                        <span className={styles.icon}>
                        <Icon link name = 'plus square outline'/></span>
                        <span>의뢰하기</span>
                    </button>
                </li>
                <li>
                    <button onClick={GoSearchPage}>
                        <span className={styles.icon}>
                        <Icon link name = 'truck'/></span>
                        <span >검색</span>
                    </button>
                </li>
                <li>
                    <button onClick={GoChattingPage}>
                        <span className={styles.icon}>
                        <Icon link name = 'comment alternate outline' /></span>
                        <span >채팅</span>
                    </button>
                </li>
                <li>
                    <button onClick={GoInformationPage}>
                        <span className={styles.icon}>
                        <Icon link name = 'user outline'/></span>
                        <span >내정보</span>
                    </button>
                </li>
           </ul>
        </div>
    );
  }
  
  export default Main_Bottombar;
import {Button, Progress, Icon, Container, Header, Image, Grid} from 'semantic-ui-react';
import styles from "./example1.module.css"

const img1 = require('../image/ex1.jpg')

function ExampleComponent() {

    return (
        <>
        <section className={styles.info}>
            <div>
                <li className={styles.infotext1}>가다나라마바사</li>
                <li className={styles.infotext2}>가나다라마바사<br />
                가나다라마바사<br />
                가나다라마바사
                </li>
            </div>
            <div>
                <button className={styles.button}>
                <img className={styles.imgbutton} src={img1} alt=""  />
                </button>
            </div>
        </section>

        <section className={styles.info}>
            <div>
                <button className={styles.button}>
                <img className={styles.imgbutton} src={img1} alt="" />
                </button>
            </div>
            <div>
                <li className={styles.infotext1}>가다나라마바사</li>
                <li className={styles.infotext2}>가나다라마바사<br />
                가나다라마바사<br />
                가나다라마바사
                </li>
            </div>
        </section>

        <section>
            <Button fluid>
                <ul className={styles.notice}>
                <li>
                    <span className={styles.noticetext1}>공지</span>
                    <span className={styles.noticetext2}>가나다라마바사</span>
                </li>
                </ul>
            </Button>
        </section>

        <div>
           <ul className={styles.bottom}>
            <li><button className={styles.btbutton}><Icon link name = 'plus square outline'/><span className={styles.text}>의뢰하기</span></button></li>
            <li><button className={styles.btbutton}><Icon link name = 'truck'/><span className={styles.text}>검색</span></button></li>
            <li><button className={styles.btbutton}><Icon link name = 'comment alternate outline'/><span className={styles.text}>채팅</span></button></li>
            <li><button className={styles.btbutton}><Icon link name = 'user outline'/><span className={styles.text}>내정보</span></button></li>
           </ul>
        </div>

        </>
      
    );
  }
  
  export default ExampleComponent;
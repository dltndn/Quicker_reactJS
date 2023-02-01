import {Button, Progress, Icon, Container, Header, Image, Grid, Input} from 'semantic-ui-react';
import styles from "./example2.module.css"

function ExampleComponent2(){
    return(
        <>
        <section className={styles.header}>
            <div>
                <button className={styles.button}><Icon link name = 'angle left'/></button>
                <span className={styles.headertext}>
                    회원가입
                </span>
            </div>
        </section>

        <section>
            <div className={styles.maintext}>
                환영합니다.
            </div>
        </section>

        <section className={styles.inputback}>
            <div className={styles.ipflex}>
                <span className={styles.iptext}>이름</span>
                <input className={styles.iptag1} type="text" placeholder="성함을 입력해주세요"></input>
            </div>
            <div className={styles.ipflex}>
                <span className={styles.iptext}>생년월일</span>
                <input className={styles.iptag2} type="number" placeholder='0000'></input>
                <input className={styles.iptag3} type="number" placeholder='0000'></input>
                <input className={styles.iptag3} type="number" placeholder='0000'></input>
            </div>
            <div>
                <span>이메일 주소</span>
                <span><Input placeholder='이메일을 입력해주세요'/></span>
                <span><Icon name='at' /><Input placeholder='gamil.com'/></span>
            </div>
            <div>
                <span>연락처</span>
                <span><Input placeholder='0000'/><Input placeholder='0000'/><Input placeholder='0000'/></span>
                <span><Button primary>인증</Button></span>
            </div>
        </section>

        <section>
            <div>
                지갑 주소
            </div>
            <div>
                <Button.Group widths='12'>
                    <Button disabled>123456789</Button>
                </Button.Group>
            </div>
        </section>

        <section>
            <div>
                <Button.Group widths='12'>
                    <Button primary>확인</Button>
                </Button.Group>
            </div>
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


export default ExampleComponent2;
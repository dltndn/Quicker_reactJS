import React, {useState, useRef, ReactDOM} from 'react';
import {Icon} from 'semantic-ui-react';
import styles from "../css/join_input.module.css"

interface refs {
    name: React.RefObject<HTMLInputElement>, 
    birthday : React.RefObject<HTMLInputElement>
    email : React.RefObject<HTMLInputElement>
    prePhoneNumber : React.RefObject<HTMLInputElement>
    middlePhoneNumber : React.RefObject<HTMLInputElement>
    lastPhoneNumber: React.RefObject<HTMLInputElement>
}

interface props {
    refs : refs
}
    // name : String | null,
    // birthday : String | null,
    // email : String | null,
    // prePhoneNumber : String | null,
    // middlePhoneNumber : String | null,
    // lastPhoneNumber : String | null
    // name, birthday, email, prePhoneNumber, middlePhoneNumber, lastPhoneNumber
function Join_input({refs} : props){
    // useref로 지정 
    // 온클릭 이벤트 설정
    // setData 반영

    // const name = useRef<HTMLInputElement>(null);
    // const birthday = useRef<HTMLInputElement>(null);
    // const email = useRef<HTMLInputElement>(null);
    // const prePhoneNumber = useRef<HTMLInputElement>(null);
    // const middlePhoneNumber = useRef<HTMLInputElement>(null);
    // const lastPhoneNumber = useRef<HTMLInputElement>(null);
    // const [data , setData] = useState<sendObject>({
    //     name : null,
    //     birthday : null,
    //     email : null,
    //     prePhoneNumber : null,
    //     middlePhoneNumber : null,
    //     lastPhoneNumber : null
    // })

    // const onClick = () => { 
    //     let registerData = {
    //         name : name.current!.value,
    //         birthday : birthday.current!.value,
    //         email : email.current!.value,
    //         prePhoneNumber : prePhoneNumber.current!.value,
    //         middlePhoneNumber : middlePhoneNumber.current!.value,
    //         lastPhoneNumber : lastPhoneNumber.current!.value
    //     }
    //     setData(registerData)
    // }

    return(
        <>
        <section className={styles.ipsect0}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    이름
                </span>
            </div>
            <div className={styles.ipdiv2}>
                <input ref={refs.name} type="text" className={styles.ipval} placeholder="성함을 입력해주세요"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    생년월일
                </span>
            </div>
            <div className={styles.ipbth}>
                <input ref={refs.birthday} type="date" className={styles.ipdate} placeholder="0000"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    이메일 주소
                </span>
            </div>
            <div className={styles.ipem0}>
                <input ref={refs.email}  type="text" className={styles.ipval} placeholder="ex0"/>
            </div>
            <div className={styles.ipic}>
                <Icon name='at' />
            </div>
            <div className={styles.ipem1}>
                <input type="number" className={styles.ipval} placeholder="gmail.com"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    연락처
                </span>
            </div>
            <div className={styles.ipnum0}>
                <input ref={refs.prePhoneNumber} type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum1}>
                <input ref={refs.middlePhoneNumber} type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum2}>
                <input ref={refs.lastPhoneNumber} type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum0}>
                <button className={styles.ipbutton}>
                    인증
                </button>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    지갑 주소
                </span>
            </div>
        </section>
        <section className={styles.ipsect}>
            <div className={styles.divwal}>
                <button className={styles.btwal}>주소 내용</button>
            </div>
        </section>
        </>
    );
}


export default Join_input;
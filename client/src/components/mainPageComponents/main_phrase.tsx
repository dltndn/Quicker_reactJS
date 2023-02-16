import { Web3Button } from "@web3modal/react";
import { Icon } from "semantic-ui-react";
import styles from "../../css/main_phrase.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type isConnectToWallet = {
  isConnect: boolean;
};
function Main_phrase({ isConnect }: isConnectToWallet) {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState<boolean>(false);
  let userName = "member";

  return (
    <>
      {isConnect ? (
        isMember ? (
          <div>
            <section>
              <div className={styles.phrase_div}>
                <span className={styles.phrase_1}>
                  {userName}님!
                  <br />
                </span>
                <span className={styles.phrase_2}>
                  현재 배송원이 물건을 배송 중입니다.
                </span>
                <button
                  className={styles.button}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <Icon link name="angle right" />
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div>
            <section>
              <div className={styles.phrase_div}>
                <span className={styles.phrase_1}>
                  안녕하세요!
                  <br />
                </span>
                <span className={styles.phrase_2}>
                  회원가입을 진행해주세요.
                </span>
                <button
                  className={styles.button}
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  <Icon link name="angle right" />
                </button>
              </div>
            </section>
          </div>
        )
      ) : (
        <div>
          <section>
            <div className={styles.phrase_div}>
              <span className={styles.phrase_1}>
                안녕하세요!
                <br />
              </span>
              <span className={styles.phrase_2}>지갑을 연결해주세요.</span>
<<<<<<< HEAD
              <Web3Button icon="hide" label="지갑연결" balance="hide" />
=======
              <Web3Button icon="hide" label="지갑연결" balance="hide"/>
>>>>>>> 146dc51f055aa3df9df50f01cffc12fbbb37b3e9
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Main_phrase;

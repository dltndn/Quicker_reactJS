import { Icon } from "semantic-ui-react";
import styles from "../../css/main_phrase.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Main_phrase() {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState<boolean>(false);

  return (
    <>
      {isMember ? (
        <div>
          <section>
            <div className={styles.phrase_div}>
              <span className={styles.phrase_1}>
                member님!
                <br />
              </span>
              <span className={styles.phrase_2}>현재 배송원이 물건을 배송 중입니다.</span>
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
              <span className={styles.phrase_2}>회원가입을 진행해주세요.</span>
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
      )}
    </>
  );
}

export default Main_phrase;

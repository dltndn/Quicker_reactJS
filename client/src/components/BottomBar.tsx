import { Icon } from "semantic-ui-react";
import styles from "../css/main_bottombar.module.css";
import { useNavigate } from "react-router-dom";

function BottomBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.btposition}>
      <ul className={styles.btul}>
        <li>
          <button onClick={() => navigate(`/request`)}>
            <span className={styles.icon}>
              <Icon link name="plus square outline" />
            </span>
            <span>의뢰하기</span>
          </button>
        </li>
        <li>
          <button onClick={() => navigate(`/search`)}>
            <span className={styles.icon}>
              <Icon link name="truck" />
            </span>
            <span>검색</span>
          </button>
        </li>
        <li>
          <button onClick={() => navigate(`/chatting`)}>
            <span className={styles.icon}>
              <Icon link name="comment alternate outline" />
            </span>
            <span>채팅</span>
          </button>
        </li>
        <li>
          <button onClick={() => navigate(`/profile`)}>
            <span className={styles.icon}>
              <Icon link name="user outline" />
            </span>
            <span>내정보</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BottomBar;

// type ContentName = {
//     title : string;
//     linkName : string;
//     route : string;

//   };
// function test({title, linkName, route}:ContentName) {
//     const navigate = useNavigate();
//   return <><li>
//   <button onClick={() => navigate({route})}>
//     <span className={styles.icon}>
//       <Icon link name={linkName} />
//     </span>
//     <span>{title}</span>
//   </button>
// </li></>;
// }

import ConfirmBtn from "../confirmBtn";
import { useState, useEffect } from "react";

interface ReceipientConfirmProp {
    orderNum: string | undefined
}
export default function ReceipientConfirm({ orderNum }: ReceipientConfirmProp) {
  const [hasImg, setHasImg] = useState<boolean>(false);

  const confirmLogic = () => {
    // 수취인 배달 확인 로직 작성
  };

  const getPicture = () => {
    // 배송완료 사진 불러오기
    // 불러온 후 setHasImg(true)

    // testcode
    const timeoutId = setTimeout(() => {
      setHasImg(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    getPicture()
  }, []);

  return (
    <>
      <h1>물품전달</h1>
      {hasImg ? <div>배송 사진</div> : <>배송 사진 로딩 애니메이션</>}
      <div>수행원이 배송을 완료했어요</div>
      <ConfirmBtn
        content="배송을 확인했어요"
        confirmLogic={() => confirmLogic()}
        isDisabled={false}
      />
    </>
  );
}

import { useNavigate } from "react-router-dom";
import { useNftState } from "./orderComponents/imfo";
import { getNftImgPath } from "../utils/CalAny";

import { NftProfileStyle } from "../StyleCollection";

const { NftImg } = new NftProfileStyle()

const NftProfile = () => {
  const navigate = useNavigate();

  const { imgState } = useNftState()

  return (
    <>
      <NftImg
        src={getNftImgPath(imgState)}
        onClick={() => navigate("/nftSetting")}
      />
    </>
  );
};

export default NftProfile;


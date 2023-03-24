import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ConfirmBtn from './confirmBtn';

const money = require('../image/money.png')

const scaleBounce = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

const Circle = styled.div`
    display:inline-block; 
    margin:0 3px; 
    width:10px; 
    height:10px; 
    background:#0047FF; 
    border-radius:50em;
    margin-bottom: 10px;
    animation: ${scaleBounce} 1s alternate infinite;
`;

const Div0 = styled.div`
    position: fixed;
    top: 80px;
    left: 20px;
`;

const Div0_1 = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const Div1 = styled.div`
    margin: 20px 10px 10px 40px;
`;

const Div1_1 = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const Div1_2 = styled(Div1_1)`
    font-size: 16px;
    font-weight: normal;
    margin-top: 10px;
    color: #9C9C9C;
`;

const Div2 = styled.div`
    margin: 50px 10px 30px 40px;
`;

const Se0 = styled.section`
    padding: 0 24px 0 24px;
`;

const Div3 = styled.div`
    display: flex;
    background-color: #EFEFEF;
    border-radius: 5px;
`;

const Div4 = styled(Div3)`
    margin-top: 5px;
`;

const Div4_1 = styled(Div4)`
    justify-content: space-between;
`;

const Div5 = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 80px 10px 0px 10px;
    font-size: 20px;
    color: #0D6EFD;
    font-weight: bold;
    text-align: center;
`;

const Divpo = styled.div`
    position: relative;
`;

const Div3_1 = styled.div`
    font-size : 14px;
    font-weight: bold;
    color: #909090;
`;

const Div3_2 = styled.div`
    padding: 16px;
`;

const Div3_1_1 = styled(Div3_1)`
    color: #000000;
`;

const Div3_2_1 = styled(Div3_2)`
    padding: 16px 0 16px 0;
`;

const Div5_1 = styled.div`
    font-size: 12px;
    color: #929292;
    font-weight: bold;
    padding-top: 10px;
`;

const SelectInput = styled.select`
    border: none;
    background-color: #EFEFEF;
    text-align: center;
    color: #000000;
    font-weight: bold;
    font-size: 14px;
    margin-right: 20px;
`;


function Search_Detail() {

    const onClick = () => {}

    return (
    <>
        <Se0>
            <Div0>
                <Div0_1>
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                </Div0_1>
            </Div0>
            <Div1>
                <Div1_1>
                    김포시 김포대로 926번길 46<br/>
                    <Div1_2>삼성아파트 309동 704호(출발지)</Div1_2>
                </Div1_1>
            </Div1>
            <Div2>
                <Div1_1>
                    김포시 김포대로 926번길 46<br/>
                    <Div1_2>삼성아파트 309동 704호(출발지)</Div1_2>
                </Div1_1>
            </Div2>
                <Div3>
                    <Div3_1>
                        <Div3_2>물품 부피</Div3_2>
                        <Div3_2>물품 중량</Div3_2>
                    </Div3_1>
                    <Div3_1_1>
                        <Div3_2_1>가로 10cm, 세로 10cm, 높이 10cm</Div3_2_1>
                        <Div3_2_1>40kg 이상</Div3_2_1>
                    </Div3_1_1>
                </Div3>
                <Div4>
                    <Div3_1>
                        <Div3_2>세부사항</Div3_2>
                    </Div3_1>
                    <Div3_1_1>
                        <Div3_2_1>세부사항 상세</Div3_2_1>
                    </Div3_1_1>
                </Div4>
                <Div4>
                    <Div3_1>
                        <Div3_2>배송기한</Div3_2>
                    </Div3_1>
                    <Div3_1_1>
                        <Div3_2_1>배송기한 상세</Div3_2_1>
                    </Div3_1_1>
                </Div4>
                <Div4_1>
                    <Div3_1>
                        <Div3_2>운송수단</Div3_2>
                    </Div3_1>
                        <SelectInput name="ex">
                            <option value="">운송수단</option>
                            <option value="ex1">도보</option>
                            <option value="ex2">자전거</option>
                        </SelectInput>
                </Div4_1>
                <Div5>
                    <div>수익<br/><Div5_1>보증금</Div5_1></div>
                    <Divpo>20,000<br/><Div5_1>5,000</Div5_1></Divpo>
                </Div5>
        </Se0>
        <ConfirmBtn content="확인" confirmLogic={() => {
        onClick()
        }} />
    </>
  );
  }
  
  export default Search_Detail;
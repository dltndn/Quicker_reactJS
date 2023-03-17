import styled from 'styled-components';
import { useState } from "react";
import { BsCalendar3, BsClock, BsFillCheckCircleFill} from "react-icons/bs";
import { useOrderStore } from '../../pages/OrderPage';

const walk = require('../../image/walk.png')
const bike = require('../../image/bike.png')
const kickboard = require('../../image/kickboard.png')
const motorcycle = require('../../image/motorcycle.png')
const car = require('../../image/car.png')
const truck = require('../../image/truck.png')

type Transport = "walk" | "bike" | "kickboard" | "motorcycle" | "car" | "truck";
type CheckedState = Record<Transport, boolean>;


const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div0 = styled.div`
  display: flex;  
    text-align:center;
    margin-top: 0.938rem;
    font-size: var(--font-micro);
`;

const Div1 = styled.div`
    flex: 1 1 16.66666666666667%;
`;

const Div2 = styled.div`
    margin-top: -0.313rem;  
`;

const Box = styled.div`
  border-radius: 0.313rem;
  margin-top: 0.5rem;
  width: 97%;
  height: 5.5rem;
  background-color: #ffffff;
  padding: 0.75rem 1.125rem 0.75rem 1.125rem;
`;

const Boxtrans = styled(Box)`
  height: 7.5rem;
`;

const Boxlimit = styled(Box)`
  height: 8.688rem;
`;

const ReqFont = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.313rem;
`;

const InputDiv = styled.div`
  margin-top: 0.625rem;
`;

const SelectInput = styled.select`
  width: 100%;
  height: 1.938rem;
  font-size: 0.75rem;
  border-radius: 0.313rem;
  border: 0px;
  outline: #efefef;
  background-color: #efefef;
  text-align: center;
  color: #a6a6a6;
`;

const Btdiv = styled.div`
     padding: 0.625rem 0 0 0;
`;

const Btul = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0.5rem 0;
`;

const Leftli = styled.li`
    justify-content: left;
    font-size: 1.375rem;
    padding: 0 0.313rem 0 0.313rem;
`;


const Btam= styled.button`
  width: 2.75rem;
  height: 1.375rem;
  font-size: var(--font-small);
  border-radius: 0.313rem;
  border: 0rem;
  outline: #efefef;
  background-color: #efefef;
  color: #a6a6a6;
  margin-right: 0.375rem;
`;

const Ip = styled.input`
width: 77%;
height: 1.375rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
text-align: center;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

const Ipval = styled.input`
    width: 2.75rem;
    height: 1.375rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #efefef;
    text-align: center;
    border: 1px solid #efefef; /* 테두리 */
    outline: none; /* 포커스 시 발생하는 외곽선 제거 */

    &:focus {
        border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
        background-color: #ffffff;
    }
`;

const Ipyear = styled(Ipval)`
    width: 4.688rem;
`;


const Ipdet = styled(Ipval)`
    margin-top: 0.625rem;
    width: 100%;
    height: 1.938rem;
`;

const Sp0 = styled.span`
    margin-right : 0.313rem;
`;

const Sp1 = styled.span`
    margin-left : 0.313rem;
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
    width: 1.875rem;
    height: 1.875rem;
`;
const CheckIcon = styled.div`
  position: absolute;
  top: -0.5rem;
  right: 0;
  font-size: 0.1rem;
`;
function Req() {


    const [isChecked, setIsChecked] = useState({
        walk: false,
        bike: false,
        kickboard: false,
        motorcycle: false,
        car: false,
        truck: false,
      });

      const handleImgClick = (transport: Transport) => {
        setIsChecked((prevState) => ({
          ...prevState,
          [transport]: !prevState[transport],
        }));
      };
    
      const [isAMSelected, setIsAMSelected] = useState(true);
      const handleClickAM = () => {
        setIsAMSelected(true);
      };
    
      const handleClickPM = () => {
        setIsAMSelected(false);
      };
      
    const { setCost } = useOrderStore()
    const convertStrToNum = (data:string):number => {
        let result =  parseInt(data);
        if (Number.isNaN(result)) {
            result = 0
        }
        return result
    }
    
    return (
    <>
    <Container>
        <Boxtrans>
            <div>
                <ReqFont>운송수단 (1개 이상 선택)</ReqFont>
            </div>
            <Div0>
                <Div1>
                    <ImgWrapper onClick={() => handleImgClick("walk")}>
                    <Img src={walk} alt=""/>
                    {isChecked.walk && <CheckIcon>✔️</CheckIcon>}
                    </ImgWrapper>
                    <Div2>
                    도보
                    </Div2>  
                </Div1>
                <Div1>
                <ImgWrapper onClick={() => handleImgClick("bike")}>
                    <Img src={bike} alt=""/>
                    {isChecked.bike && <CheckIcon>✔️</CheckIcon>}
                    </ImgWrapper>
                    <Div2>
                    자전거
                    </Div2>                 
                </Div1>
                <Div1>
                <ImgWrapper  onClick={() => handleImgClick("kickboard")}>
                    <Img src={kickboard} alt=""/>
                    {isChecked.kickboard && <CheckIcon>✔️</CheckIcon>}
                    </ImgWrapper>
                    <Div2>
                    킥보드
                    </Div2>                
                </Div1>
                <Div1>
                <ImgWrapper onClick={() => handleImgClick("motorcycle")}>
                    <Img src={motorcycle} alt=""/>
                    {isChecked.motorcycle && <CheckIcon>✔️</CheckIcon>}
                    </ImgWrapper>
                    <Div2>
                    오토바이
                    </Div2>                
                </Div1>
                <Div1>
                <ImgWrapper onClick={() => handleImgClick("car")}>
                    <Img src={car} alt=""/>
                    {isChecked.car && <CheckIcon>✔️</CheckIcon>}
                    </ImgWrapper>
                    <Div2>
                    승용차
                    </Div2>             
                </Div1>
                <Div1>
                <ImgWrapper  onClick={() => handleImgClick("truck")}>
                    <Img src={truck} alt=""/>
                    {isChecked.truck && <CheckIcon>✔️</CheckIcon>}
                    </ImgWrapper>
                    <Div2>
                    트럭
                    </Div2>               
                </Div1>
            </Div0>
        </Boxtrans>
    </Container>
    <Container>
        <Box>
            <div>
                <ReqFont>
                    물품 부피
                </ReqFont>
            </div>
            <Btdiv>
                <Btul>
                    <li>
                        <Sp0>가로</Sp0>
                        <Ipval placeholder='' type='number'></Ipval>
                        <Sp1>cm</Sp1>
                    </li>
                    <li>
                        <Sp0>세로</Sp0>
                        <Ipval placeholder='' type='number'></Ipval>
                        <Sp1>cm</Sp1>
                    </li>
                    <li>
                        <Sp0>높이</Sp0>
                        <Ipval placeholder='' type='number'></Ipval>
                        <Sp1>cm</Sp1>
                    </li>
                </Btul>
            </Btdiv>
        </Box>
    </Container>
    <Container>
        <Box>
            <div>
            <ReqFont>물품 중량</ReqFont>
            </div>
            <InputDiv>
            <SelectInput name="weight">
                <option value="10">10 이상</option>
                <option value="20">20 이상</option>
            </SelectInput>
            </InputDiv>
        </Box>
    </Container>
    <Container>
        <Boxlimit>
            <div>
                <ReqFont>배송기한</ReqFont>
            </div>
            <Btdiv>
                <Btul>
                    <Leftli>
                        <BsCalendar3></BsCalendar3>
                    </Leftli>
                    <Ip type="date"></Ip>
                </Btul>
                <Btdiv>
                    <Btul>
                        <Leftli>
                            <BsClock></BsClock>
                        </Leftli>
                        <li>
                        <Btam onClick={handleClickAM} style={{ backgroundColor: isAMSelected ? 'blue' : '#efefef', color: isAMSelected ? '#ffffff' : '#a6a6a6' }}>오전</Btam>
                        <Btam onClick={handleClickPM} style={{ backgroundColor: !isAMSelected ? 'blue' : '#efefef', color: !isAMSelected ? '#ffffff' : '#a6a6a6' }}>오후</Btam>
                        </li>
                        <li>
                            <Ipval type='number'></Ipval>
                            <Sp0> 시</Sp0>
                        </li>
                        <li>
                            <Ipval type='number'></Ipval>
                            <Sp0> 분</Sp0>
                        </li>
                    </Btul>
                </Btdiv>
            </Btdiv>
        </Boxlimit>
    </Container>
    <Container>
        <Box>
            <div>
                <ReqFont>세부사항</ReqFont>
            </div>
            <div>
                <Ipdet type="text" placeholder="내용을 입력해주세요"></Ipdet>
            </div>
        </Box>
    </Container>
    <Container>
        <Box>
            <div>
                <ReqFont>의뢰 비용</ReqFont>
            </div>
            <div>
                <Ipdet type="number" placeholder="지갑 잔액을 확인하세요" onChange={(e) => setCost(convertStrToNum(e.target.value))}></Ipdet>
            </div>
        </Box>
    </Container>
    </>
  );
  }
  
  export default Req;
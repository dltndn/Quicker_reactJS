import styled from 'styled-components';
import {useEffect, useRef, useState } from "react";
import { BsCalendar3, BsClock, BsFillCheckCircleFill} from "react-icons/bs";
import { useOrderDataStore, useOrderStore } from '../../pages/commission';
import GetQkrwBalance from '../getQkrwBalance';
import CreateNewOrder from '../createNewOrder';
import { useConnWalletInfo } from '../../App';
import { ReqStyle } from "../../StyleCollection";

const {Div0, Div1, Div2, Img, ImgWrapper, Imgdiv, InputDiv, Ip, CheckIcon, Checkbox
, Container, SelectInput, Sp0, Sp1, Sp2, Box, Boxlimit, Boxtrans, Btam, Btdiv, Bticonimg
, Btul, ReqFont, Leftli } = new ReqStyle()


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

const walk = require('../../image/walk.png')
const bike = require('../../image/bike.png')
const kickboard = require('../../image/kickboard.png')
const motorcycle = require('../../image/motorcycle.png')
const car = require('../../image/car.png')
const truck = require('../../image/truck.png')

type Transport = "walk" | "bike" | "kickboard" | "motorcycle" | "car" | "truck";
type CheckedState = Record<Transport, boolean>;

const money = require('../../image/money.png')


function Req({data}: {data: object}) {

    const widthRef = useRef<HTMLInputElement>(null)
    const heightRef = useRef<HTMLInputElement>(null)
    const lengthRef = useRef<HTMLInputElement>(null)
    const weightRef = useRef<HTMLSelectElement>(null)
    const detailsRef = useRef<HTMLInputElement>(null)
    const costRef = useRef<HTMLInputElement>(null)
    const hourRef = useRef<HTMLInputElement>(null)
    const minuteRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const [isAMSelected, setIsAMSelected] = useState(true);

    const { address, isConnected } = useConnWalletInfo();
    const { cost, setCost, deadLine, errorMessage, recommendCost } = useOrderStore()
    const {isChecked, setIsChecked, startAddress, arriveAddress, setAMPM, setLength, setWidth, setHeight, setDate, setHour, setMinute, setDetails, weight,  setWeight } = useOrderDataStore();

      const handleImgClick = (transport: Transport) => {
        let changeIsChecked = () => {
            return ({
                ...isChecked,
                [transport]: !isChecked[transport],
            })
        }
        let result = changeIsChecked()
        setIsChecked(result)
      };
    
      
      const handleClickAM = () => {
        setIsAMSelected(true);
        setAMPM("오전")
      };
    
      const handleClickPM = () => {
        setIsAMSelected(false);
        setAMPM("오후")
      };
      
    
    const convertStrToNum = (data:string):number => {
        let result =  parseInt(data);
        if (Number.isNaN(result)) {
            result = 0
        }
        return result
    }
    
    useEffect(()=> {
        setWeight(5)
    }, [])
    
    return (
    <>
    <Container>
        <Boxtrans>
            <div>
                <ReqFont>운송수단 (1개 이상 선택)</ReqFont>
            </div>
            <Div0>
                <Div1>
                <ImgWrapper>
                <Img src={walk} alt=""/>
                <Checkbox
                  checked={ isChecked.walk}
                  onChange={() => handleImgClick("walk")}
                />
                <CheckIcon>{isChecked.walk ? "✔️" : ""}</CheckIcon>
              </ImgWrapper>
                    <Div2>
                    도보
                    </Div2>  
                </Div1>
                <Div1>
                <ImgWrapper>
                <Img src={bike} alt=""/>
                <Checkbox
                    checked={isChecked.bike}
                    onChange={() => handleImgClick("bike")}
                />
                <CheckIcon>{isChecked.bike ? "✔️" : ""}</CheckIcon>
                </ImgWrapper>
                    <Div2>
                    자전거
                    </Div2>                 
                </Div1>
                <Div1>
                <ImgWrapper>
                <Img src={kickboard} alt=""/>
                <Checkbox
                    checked={isChecked.kickboard}
                    onChange={() => handleImgClick("kickboard")}
                />
                <CheckIcon>{isChecked.kickboard ? "✔️" : ""}</CheckIcon>
                </ImgWrapper>
                    <Div2>
                    킥보드
                    </Div2>
                </Div1>
                <Div1>
                <ImgWrapper>
                <Img src={motorcycle} alt=""/>
                <Checkbox
                    checked={isChecked.motorcycle}
                    onChange={() => handleImgClick("motorcycle")}
                />
                <CheckIcon>{isChecked.motorcycle ? "✔️" : ""}</CheckIcon>
                </ImgWrapper>
                    <Div2>
                    오토바이
                    </Div2>                
                </Div1>
                <Div1>
                <ImgWrapper>
                <Img src={car} alt=""/>
                <Checkbox
                    checked={isChecked.car}
                    onChange={() => handleImgClick("car")}
                />
                <CheckIcon>{isChecked.car ? "✔️" : ""}</CheckIcon>
                </ImgWrapper>
                    <Div2>
                    승용차
                    </Div2>             
                </Div1>
                <Div1>
                <ImgWrapper>
                <Img src={truck} alt=""/>
                <Checkbox
                    checked={isChecked.truck}
                    onChange={() => handleImgClick("truck")}
                />
                <CheckIcon>{isChecked.truck ? "✔️" : ""}</CheckIcon>
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
                        <Ipval type="number" ref={widthRef} 
                            onChange={
                                () => {
                                // ERROR : 타입이 String 타입임
                                    setWidth(parseInt(widthRef.current!.value))
                                }
                            } placeholder='' ></Ipval>
                        <Sp1>cm</Sp1>
                    </li>
                    <li>
                        <Sp0>세로</Sp0>
                        <Ipval ref={lengthRef} onChange={
                                () => {
                                // ERROR : 타입이 String 타입임
                                    setLength(parseInt(lengthRef.current!.value))
                                }
                            } placeholder='' type='number'></Ipval>
                        <Sp1>cm</Sp1>
                    </li>
                    <li>
                        <Sp0>높이</Sp0>
                        <Ipval ref={heightRef} onChange={
                                () => {
                                // ERROR : 타입이 String 타입임
                                    setHeight(parseInt(heightRef.current!.value))
                                }
                            }
                            placeholder='' type='number'></Ipval>
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
            {/* ERROR : 타입이 String 타입임 */}
            <SelectInput ref={weightRef} onChange={() => {setWeight(parseInt(weightRef.current!.value))}} name="weight">
                <option value={5} selected>5kg 이상</option>
                <option value={10}>10kg 이상</option>
                <option value={15}>15kg 이상</option>
                <option value={20}>20kg 이상</option>
                <option value={25}>25kg 이상</option>
                <option value={30}>30kg 이상</option>
                <option value={35}>35kg 이상</option>
                <option value={40}>40kg 이상</option>
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
                    <Ip ref={dateRef} onChange={(e) => {setDate(dateRef.current!.value)}} type="date"></Ip>
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
                            {/* ERROR : 타입이 String 타입임 */}
                            <Ipval type='number' ref={hourRef} onChange={() => setHour(parseInt(hourRef.current!.value))}></Ipval>
                            <Sp0> 시</Sp0>
                        </li>
                        <li>
                            {/* ERROR : 타입이 String 타입임 */}
                            <Ipval type='number' ref={minuteRef} onChange={() => setMinute(parseInt(minuteRef.current!.value))}></Ipval>
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
                <Ipdet type="text" ref={detailsRef} onChange={() => setDetails(detailsRef.current!.value)} placeholder="내용을 입력해주세요"></Ipdet>
            </div>
        </Box>
    </Container>
    <Container>
        <Box>
            <div>
                <ReqFont>의뢰 비용 <span style={{color: "red"}}>{errorMessage ? (errorMessage):(`추천 비용: ${recommendCost.toLocaleString()}`)}</span></ReqFont>
            </div>
            <div>
                {/* ERROR : 타입이 String 타입임 */}
                <Ipdet type="number" ref={costRef} onChange={(e) => {
                    setCost(parseInt(costRef.current!.value));
                    setCost(convertStrToNum(e.target.value))}} placeholder="지갑 잔액을 확인하세요" ></Ipdet>
            </div>
        </Box>
    </Container>
    <Container>
        <Box>
            <div>
                <ReqFont>지갑 잔액</ReqFont>
            </div>
            <div>
            <Sp2>{isConnected && address && <GetQkrwBalance address={address}/>}
            <Imgdiv><Bticonimg src={money} alt="" /></Imgdiv></Sp2>
            </div>
        </Box>
    </Container>
    <Container>
        <CreateNewOrder
          data={data}
          _orderPrice={cost.toString()}
          _deadline={deadLine}
          />
    </Container>
    </>
  );
  }
  
  export default Req;


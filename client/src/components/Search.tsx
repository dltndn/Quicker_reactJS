import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Se0 = styled.section`
    position: fixed;
    bottom: 3.875rem;
    background-color: #F5F5F5;
    width: 100%;
    border-radius: 25px 25px 0 0;
`;

const Hr0 = styled.hr`
    margin: 10px auto;
    border-top: 1px solid;
    width: 10%;
    text-align: center;
`;

const Div0 = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px 5px 10px 5px;
`;

const Div0_1 = styled.div`
    display: flex;
    margin: 0 5px;
    width: 65px;
    height: 40px;
    background-color: var(--white-color);
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    font-size: var(--font-md1);
    font-weight: bold;
`;

const Div1 = styled.div`
    display: flex;
    background-color: var(--white-color);
    padding: 10px;
`;

const Dvi1_1 = styled.div`
    display: flex;
    flex: 1 1 25%;
    justify-content: center;
    font-size: var(--font-md1);
    font-weight: bold;
`;

const Div1_2 = styled(Dvi1_1)`
    font-size: 16px;
    align-items: center;
`;

const Sp0 = styled.span`
    font-size: 12px;
    font-weight: normal;
`;

function Search() {
    const navigate = useNavigate();
    const ClickDetailgPage = () => {
        navigate("/search_detail")
    }

    return (
    <>
    <Se0>
        <Hr0/>
        <Div0>
            <Div0_1>전체</Div0_1>
            <Div0_1>도보</Div0_1>
            <Div0_1>자전거</Div0_1>
            <Div0_1>자동차</Div0_1>
        </Div0>
        <Div1>
            <Dvi1_1>픽업지까지</Dvi1_1>
            <Dvi1_1>픽업지</Dvi1_1>
            <Dvi1_1>배송지</Dvi1_1>
            <Dvi1_1>수익</Dvi1_1>
        </Div1>
        <Div1 onClick={ClickDetailgPage}>
            <Div1_2>0.2Km</Div1_2>
            <Div1_2>
                <div>
                    <Sp0>김포<br/></Sp0>
                    북변
                </div>
            </Div1_2>
            <Div1_2>
                <div>
                    <Sp0>김포<br/></Sp0>
                    북변
                </div>
            </Div1_2>
            <Div1_2>20,000</Div1_2>
        </Div1>
    </Se0>
    </>
  );
  }
  
  export default Search;
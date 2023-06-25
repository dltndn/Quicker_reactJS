import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchState } from "../pages/SearchPage";

interface Props {
  clickOrder: (index: number) => void;
}


type AccordionProps = {
  isOpen: boolean;
};

const AccordionWrapper = styled.div<AccordionProps>`
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "100vh" : "0")};
  transition: max-height 0.5s ease-in-out;
`;

function Search({ clickOrder }: Props) {
  const { orders } = useSearchState();
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      accordionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);


  return (
    <>
      <Se0 onClick={() => setIsOpen(!isOpen)} >
        <Hr0/>
        <AccordionWrapper isOpen={isOpen} ref={accordionRef}>
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

          {orders !== undefined ? (
            orders.map((value, index) => (
              <Div1 onClick={() => clickOrder(index)} key={index}>
                <Div1_2>{(value.distance / 1000).toFixed(1) + "KM"}</Div1_2>
                <Div1_2>
                  <Div3>
                    <Sp0>
                      {value.departure_region_1depth_name}
                    </Sp0>
                    </Div3>
                    <Div3>
                    {value.departure_region_3depth_name}
                    </Div3>
                </Div1_2>
                <Div1_2>
                <Div3>
                    <Sp0>
                      {value.destination_region_1depth_name}
                    </Sp0>
                    </Div3>
                    <Div3>
                    {value.destination_region_3depth_name}
                    </Div3>
                </Div1_2>
                <Div1_2>{value.income}</Div1_2>
              </Div1>
            ))
          ) : (
            <>데이터를 조회중입니다...</>
          )}
        </AccordionWrapper>
      </Se0>
    </>
  );
}

export default Search;


const Se0 = styled.section`
  position: fixed;
  bottom: 3.875rem;
  background-color: #f5f5f5;
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

const Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

const Div1_2 = styled(Dvi1_1)`
  font-size: 16px;
  align-items: center;
  flex-direction: column;
`;

const Sp0 = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

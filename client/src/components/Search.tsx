import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchState } from "../pages/SearchPage";
import { SearchStyle } from "../StyleCollection";

const {Div0, Div0_1, Div1, Div1_2, Div3, Dvi1_1, Hr0, Se0, Sp0 } = new SearchStyle()

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
    console.log(orders)
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
            <Dvi1_1>출발지까지</Dvi1_1>
            <Dvi1_1>출발지</Dvi1_1>
            <Dvi1_1>도착지</Dvi1_1>
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



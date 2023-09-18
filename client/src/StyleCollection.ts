import styled from "styled-components";

export class ExplorerPageStyle {
  Div1 = styled.div`
    display: flex;
    background-color: var(--white-color);
    padding: 10px;
    border-radius: 0.313rem;
  `;

  Dvi1_1 = styled.div`
    display: flex;
    flex: 1 1 20%;
    justify-content: center;
    font-size: var(--font-md1);
    font-weight: bold;
  `;

  Dvi1_3 = styled.div`
    display: flex;
    flex: 1 1 20%;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  `;

  Div1_2 = styled(this.Dvi1_1)`
    font-size: 16px;
    align-items: center;
  `;

  Box = styled.div`
    margin-top: 0.5rem;
    width: 97%;
    background-color: #ffffff;
    margin: 0.313rem;
    border-radius: 0.313rem !important;
  `;

  Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  ReqFont = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0px 5px 16px;
  `;
  Div0 = styled.div`
    display: flex;
    align-items: center;
    font-size: var(--font-md1);
    font-weight: bold;
    margin: 10px 16px 10px 16px;
  `;
  Sp0 = styled.div`
    margin-left: auto;
    margin-right: 0.625rem;
  `;

  Sp1 = styled(this.Sp0)`
    font-size: var(--font-md1);
    font-weight: bold;
  `;

  Divnum = styled.div`
    display: flex;
    align-items: center;
    font-size: var(--font-md1);
    font-weight: bold;
    margin: 10px 16px 10px 16px;
  `;
}

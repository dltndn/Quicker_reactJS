import styled, { css } from 'styled-components';
import { BottomconfirmBtnStyle } from "../StyleCollection";

const {Button, Container} = new BottomconfirmBtnStyle()

interface Props {
    content: string;
    confirmLogic: ()=> void;
    isDisabled: boolean;
  }
  

function BottomConfirmBtn({ content, confirmLogic, isDisabled  }: Props){

    return(
        <Container>
                <Button disabled={isDisabled} onClick={() => confirmLogic()}>{content}</Button>
        </Container>
    );
}


export default BottomConfirmBtn;
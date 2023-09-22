import styled, { css } from 'styled-components';
import { ConfirmBtnStyle } from "../StyleCollection";

const {Button, Container} = new ConfirmBtnStyle()

interface Props {
  content: string;
  confirmLogic: () => void;
  isDisabled: boolean;
}

function ConfirmBtn({ content, confirmLogic, isDisabled  }: Props) {

  return (
    <Container>
      <Button disabled={isDisabled} onClick={() => confirmLogic()}>{content}</Button>
    </Container>
  );
}


export default ConfirmBtn;

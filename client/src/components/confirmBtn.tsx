import styled, { css } from 'styled-components';

interface Props {
    content: string;
    confirmLogic: ()=> void
  }
  
  const Button = styled.button`
  position: fixed;
  bottom: 3.875rem;
  width: 98%;
  height: 3.125rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border: 0;
  outline: #efefef;
  background-color: #0D6EFD;
  color: var(--white-color);
  margin-bottom: 0.313rem;
`;

const Container = styled.section`
  padding: calc(var(--padding) / 2) var(--padding);
  display: flex;
  justify-content: center;
`;

function ConfirmBtn({ content, confirmLogic  }: Props){
    return(
        <Container>
                <Button onClick={() => confirmLogic()}>{content}</Button>
        </Container>
    );
}


export default ConfirmBtn;
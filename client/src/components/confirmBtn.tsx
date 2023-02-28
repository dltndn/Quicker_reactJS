import styles from "../css/check.module.css"

import styled, { css } from 'styled-components';

interface Props {
    content: string;
    confirmLogic: ()=> void
  }

  const StyledButton = styled.button`
    position: fixed;
    bottom: 62px;
    width: 98%;
    height: 50px;
    font-size: var(--font-md);
    border-radius: 0.3rem;
    border: 0px;
    outline: #efefef;
    background-color: #0D6EFD;
    color: var(--white-color);
    margin-bottom: 5px;
  `

function ConfirmBtn({ content, confirmLogic }: Props){
    return(
        <section className={styles.ipsect}>
                <StyledButton onClick={() => confirmLogic()}>{content}</StyledButton>
        </section>
    );
}


export default ConfirmBtn;
import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "../../../lib/Overlay";
import { ActionContext } from "../Play";
import { Button } from "../../../lib/Button";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    width: 60%;
  }
`;

export const HandleVetoRequest = () => {
  const { approveVeto, rejectVeto } = useContext(ActionContext);
  return (
    <Overlay>
      <InstructionText>Veto Requested</InstructionText>
      <ButtonWrapper>
        <Button onClick={approveVeto}>Approve Veto</Button>
        <Button onClick={rejectVeto}>Reject Veto</Button>
      </ButtonWrapper>
    </Overlay>
  );
};

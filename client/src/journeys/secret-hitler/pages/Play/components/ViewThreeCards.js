import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "./Overlay";
import { StateContext, ActionContext } from "../Play";
import { Policy } from "./Policy";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const PolicyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > * {
    margin-right: 20px;
    &:last-child {
      margin: 0;
    }
  }
`;

export const ViewThreeCards = () => {
  const { drawPile } = useContext(StateContext);
  const { doneViewingCards } = useContext(ActionContext);

  return (
    <Wrapper>
      <InstructionText>Next 3 Policy</InstructionText>
      <PolicyWrapper>
        {drawPile
          .slice(drawPile.length - 3, drawPile.length)
          .map((variation) => (
            <Policy scale={2} variation={variation} />
          ))}
      </PolicyWrapper>
      <button onClick={doneViewingCards}>Okay</button>
    </Wrapper>
  );
};

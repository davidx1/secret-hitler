import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText, RuleText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import { Policy } from "./Policy";
import { Button } from "../../../lib/Button";

const PolicyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
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
    <Overlay>
      <InstructionText>Policy Peek</InstructionText>
      <RuleText>
        The President secretly looks at the top three tiles in the Policy deck and then returns them
        to the top of the deck without changing the order.
      </RuleText>
      <PolicyWrapper>
        {drawPile.slice(drawPile.length - 3, drawPile.length).map((variation) => (
          <Policy scale={2} variation={variation} />
        ))}
      </PolicyWrapper>
      <Button onClick={doneViewingCards}>Okay</Button>
    </Overlay>
  );
};

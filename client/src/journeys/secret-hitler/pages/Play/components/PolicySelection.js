import React, { useContext } from "react";
import styled from "styled-components";
import { Policy } from "./Policy";
import { Overlay, InstructionText } from "./Overlay";
import { StateContext, ActionContext } from "../Play";

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

export const PolicySelection = () => {
  const { state, policiesInHand } = useContext(StateContext);
  const { selectACardToRemove, enactAPolicy } = useContext(ActionContext);
  const handleClick =
    state === "filterCards" ? selectACardToRemove : enactAPolicy;

  const instructionalText =
    state === "filterCards"
      ? "Select A Policy To Discard"
      : "Select A Policy To Enact";

  return (
    <Wrapper>
      <InstructionText>{instructionalText}</InstructionText>
      <PolicyWrapper>
        {policiesInHand.map((p, i) => (
          <Policy
            variation={p}
            onClick={() => handleClick(i)}
            selectable
            scale={2}
          />
        ))}
      </PolicyWrapper>
    </Wrapper>
  );
};

import React, { useContext } from "react";
import styled from "styled-components";
import { PolicyFascist, PolicyLiberal } from "./Policy";
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
    state === "filterCards"
      ? selectACardToRemove
      : state === "enactPolicy"
      ? enactAPolicy
      : () => {
          console.log("weird, something went wrong");
        };
  return (
    <Wrapper>
      <InstructionText>Select A Policy To Discard</InstructionText>
      <PolicyWrapper>
        {policiesInHand.map((p, i) =>
          p === "F" ? (
            <PolicyFascist
              selectable
              scale={2}
              onClick={() => handleClick(i)}
            />
          ) : (
            <PolicyLiberal
              selectable
              scale={2}
              onClick={() => handleClick(i)}
            />
          )
        )}
      </PolicyWrapper>
    </Wrapper>
  );
};

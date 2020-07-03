import React, { useContext } from "react";
import styled from "styled-components";
import { Policy } from "./Policy";
import { Overlay, InstructionText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import Button from "../../../lib/Button";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Description = styled.p`
  color: white;
`;

const PolicyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin-right: 20px;
    &:last-child {
      margin: 0;
    }
  }
`;

export const PolicySelection = () => {
  const {
    state,
    policiesInHand,
    enactedFascistPolicies,
    vetoRequested,
    vetoApproved
  } = useContext(StateContext);
  const { selectACardToRemove, enactAPolicy, requestVeto } = useContext(
    ActionContext
  );
  const handleClick =
    state === "filterCards" ? selectACardToRemove : enactAPolicy;

  const instructionalText =
    state === "filterCards"
      ? "Select A Policy To Discard"
      : "Select A Policy To Enact";

  const vetoRequestAvailable =
    state === "enactPolicy" && enactedFascistPolicies === 5;

  const vetoInReview = vetoApproved === null;

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
      {vetoRequestAvailable && !vetoRequested && vetoInReview && (
        <Button onClick={requestVeto}>Request Veto</Button>
      )}
      {vetoRequestAvailable && vetoRequested && vetoInReview && (
        <Description>Waiting...</Description>
      )}
      {vetoRequestAvailable &&
        vetoRequested &&
        !vetoInReview &&
        !vetoApproved && <Description>Rejected</Description>}
    </Wrapper>
  );
};

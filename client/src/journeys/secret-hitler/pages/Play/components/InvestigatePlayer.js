import React from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "./Overlay";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & > * {
    margin-bottom: 2%;
  }
`;

export const InvestigatePlayer = () => {
  return (
    <Wrapper>
      <InstructionText>InvestigatePlayer</InstructionText>
    </Wrapper>
  );
};

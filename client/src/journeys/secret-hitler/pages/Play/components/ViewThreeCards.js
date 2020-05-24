import React from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "./Overlay";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ViewThreeCards = () => {
  return (
    <Wrapper>
      <InstructionText>Select A Policy To Discard</InstructionText>
    </Wrapper>
  );
};

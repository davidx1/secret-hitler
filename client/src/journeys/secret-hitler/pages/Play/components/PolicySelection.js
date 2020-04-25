import React from "react"
import styled from "styled-components"
import { Policy_Fascist, Policy_Liberal } from "./Policy"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const PolicyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > * {
    margin-right: 20px;
  }
`

const InstructionText = styled.h1`
  color: ${(props) => props.theme.neutral};
`
export const PolicySelection = () => {
  return (
    <Wrapper>
      <InstructionText>Select A Policy To Discard</InstructionText>
      <PolicyWrapper>
        <Policy_Fascist scale={2} />
        <Policy_Fascist scale={2} />
        <Policy_Liberal scale={2} />
      </PolicyWrapper>
    </Wrapper>
  )
}

import React from "react"
import styled from "styled-components"
import { PolicyFascist, PolicyLiberal } from "./Policy"
import { Overlay } from "./Overlay"

const Wrapper = styled(Overlay)`
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
    &:last-child {
      margin: 0;
    }
  }
`

const InstructionText = styled.h1`
  color: ${(props) => props.theme.neutral};
  margin: 0 0 15px 0;
  font-size: 25px;
  @media only screen and (min-width: 768px) {
    margin: 0 0 30px 0;
    font-size: 40px;
  }
`
export const PolicySelection = () => {
  return (
    <Wrapper>
      <InstructionText>Select A Policy To Discard</InstructionText>
      <PolicyWrapper>
        <PolicyFascist scale={2} />
        <PolicyFascist scale={2} />
        <PolicyLiberal scale={2} />
      </PolicyWrapper>
    </Wrapper>
  )
}

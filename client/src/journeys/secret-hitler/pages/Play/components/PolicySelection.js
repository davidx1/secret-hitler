import React, { useContext } from "react"
import styled from "styled-components"
import { PolicyFascist, PolicyLiberal } from "./Policy"
import { Overlay } from "./Overlay"
import { StateContext, ActionContext } from "../Play"

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
  const { state, policiesInHand } = useContext(StateContext)
  const { selectACardToRemove, enactAPolicy } = useContext(ActionContext)
  const handleClick =
    state === "filterCards"
      ? selectACardToRemove
      : state === "enactPolicy"
      ? enactAPolicy
      : () => {
          console.log("weird, something went wrong")
        }
  return (
    <Wrapper>
      <InstructionText>Select A Policy To Discard</InstructionText>
      <PolicyWrapper>
        {policiesInHand.map((p, i) =>
          p === "F" ? (
            <PolicyFascist scale={2} onClick={() => handleClick(i)} />
          ) : (
            <PolicyLiberal scale={2} onClick={() => handleClick(i)} />
          )
        )}
      </PolicyWrapper>
    </Wrapper>
  )
}

import React from "react"
import styled from "styled-components"
import ja from "../../../../../img/ja.png"
import nein from "../../../../../img/nein.png"
import { Player } from "./Player"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & > * {
    margin-bottom: 2%;
  }
`

const VotesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;

  @media only screen and (min-width: 1200px) {
    width: 45%;
  }
`

const Vote = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 5%;
  height: 80px;
  width: 120px;
  @media only screen and (min-width: 768px) {
    height: 100px;
    width: 150px;
  }
  @media only screen and (min-width: 992px) {
    height: 150px;
    width: 220px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: 175px;
    width: 260px;
  }
  @media only screen and (min-width: 1400px) {
    padding: 0;
    height: 250px;
    width: 370px;
  }
`

export const VoteSelection = () => {
  return (
    <Wrapper>
      <Player roleToDisplay={"liberal"} scale={2} />
      <VotesWrapper>
        <Vote src={ja} />
        <Vote src={nein} />
      </VotesWrapper>
    </Wrapper>
  )
}

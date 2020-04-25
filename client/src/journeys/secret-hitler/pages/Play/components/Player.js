import React from "react"
import styled from "styled-components"
import fascist from "../../../../../img/fascist.png"
import liberal from "../../../../../img/liberal.png"
import hitler from "../../../../../img/hitler.png"

const PlayerImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 20%;
  height: 40px;
  width: 40px;
  @media only screen and (min-width: 768px) {
    height: 50px;
    width: 50px;
  }
  @media only screen and (min-width: 992px) {
    height: 100px;
    width: 100px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: 100px;
    width: 100px;
  }
  @media only screen and (min-width: 1400px) {
    padding: 0;
    height: 150px;
    width: 150px;
  }
`

const PlayerLabel = styled.p`
  padding: 0 5px;
  line-height: 1.5;
  left: 2px;
  text-align: center;
  background-color: #ffffffdd;
  font-size: 10px;
  margin: 0;
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 18px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 22px;
  }
  @media only screen and (min-width: 1400px) {
    font-size: 28px;
  }
`

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const Player = ({ roleToDisplay }) => {
  const srcs = {
    "liberal": liberal,
    "fascist": fascist,
    "hitler": hitler
  }
  return (
    <PlayerWrapper>
      <PlayerImage src={srcs[roleToDisplay]}></PlayerImage>
      <PlayerLabel>Robbercopter</PlayerLabel>
    </PlayerWrapper>
  )
}

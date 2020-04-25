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
  height: ${(props) => 40 * props.scale}px;
  width: ${(props) => 40 * props.scale}px;
  @media only screen and (min-width: 768px) {
    height: ${(props) => 50 * props.scale}px;
    width: ${(props) => 50 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    height: ${(props) => 100 * props.scale}px;
    width: ${(props) => 100 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: ${(props) => 100 * props.scale}px;
    width: ${(props) => 100 * props.scale}px;
  }
  @media only screen and (min-width: 1400px) {
    padding: 0;
    height: ${(props) => 150 * props.scale}px;
    width: ${(props) => 150 * props.scale}px;
  }
`

const PlayerLabel = styled.p`
  padding: 0 5px;
  line-height: 1.5;
  left: 2px;
  text-align: center;
  background-color: #ffffffdd;
  font-size: ${(props) => 10 * props.scale}px;
  margin: 0;
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => 14 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => 18 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => 22 * props.scale}px;
  }
  @media only screen and (min-width: 1400px) {
    font-size: ${(props) => 28 * props.scale}px;
  }
`

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Player = ({ roleToDisplay, scale = 1 }) => {
  const srcs = {
    "liberal": liberal,
    "fascist": fascist,
    "hitler": hitler
  }
  return (
    <PlayerWrapper>
      <PlayerImage scale={scale} src={srcs[roleToDisplay]}></PlayerImage>
      <PlayerLabel scale={scale}>Robbercopter</PlayerLabel>
    </PlayerWrapper>
  )
}

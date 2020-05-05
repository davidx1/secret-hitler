import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { DoneOutline } from "@styled-icons/material-sharp/DoneOutline"
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline"
import { HowToVote } from "@styled-icons/material/HowToVote"
import fascist from "../../../../../img/fascist.png"
import liberal from "../../../../../img/liberal.png"
import hitler from "../../../../../img/hitler.png"
import { StateContext, ActionContext } from "../Play"

const PlayerImage = styled.div`
  display: flex;
  align-items: flex-end;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 20%;
  box-shadow: 0px 5px 10px #444444;

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
  @media only screen and (min-width: 1450px) {
    padding: 0;
    height: ${(props) => 150 * props.scale}px;
    width: ${(props) => 150 * props.scale}px;
  }
`

const PlayerLabel = styled.p`
  box-sizing: border-box;
  border-radius: 10%;
  padding: 0 5px;
  line-height: 1.25;
  left: 2px;
  text-align: center;
  background-color: ${(props) => (props.highlight ? "#7ffa99" : "#ffffff")};
  font-size: ${(props) => 10 * props.scale}px;
  margin: 0;
  padding: 5%;
  box-shadow: 0px 3px 5px #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  min-width: ${(props) => 40 * props.scale}px;
  max-width: ${(props) => 100 * props.scale}px;

  @media only screen and (min-width: 768px) {
    font-size: ${(props) => 14 * props.scale}px;
    min-width: ${(props) => 40 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => 16 * props.scale}px;
    min-width: ${(props) => 60 * props.scale}px;
    max-width: ${(props) => 150 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => 20 * props.scale}px;
  }
  @media only screen and (min-width: 1450px) {
    font-size: ${(props) => 24 * props.scale}px;
    min-width: ${(props) => 120 * props.scale}px;
    max-width: ${(props) => 240 * props.scale}px;
  }
`

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.selectable ? "pointer" : "auto")};
  ${(props) =>
    props.selectable &&
    css`
      &:hover {
        filter: brightness(1.2);
      }
    `}
`

const Marker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
  width: 30%;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  font-size: ${(props) => 10 * props.scale}px;
  margin-right: 2px;

  @media only screen and (min-width: 768px) {
    font-size: ${(props) => 10 * props.scale}px;
    height: 25%;
    width: 25%;
    border-width: 5px;
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => 14 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => 18 * props.scale}px;
  }
  @media only screen and (min-width: 1450px) {
    font-size: ${(props) => 20 * props.scale}px;
  }
`

const PresidentMarker = styled(Marker)`
  border-color: ${(props) => props.theme.blue_dark};
  background-color: ${(props) => props.theme.blue_light};
`

const ChancellorMarker = styled(Marker)`
  border-color: ${(props) => props.theme.orange_dark};
  background-color: ${(props) => props.theme.orange_light};
`

const Voted = styled(HowToVote)`
  @media only screen and (min-width: 768px) {
    height: 30%;
    width: 30%;
  }

  background-color: blue;
  color: white;
`

const VotedYes = styled(Voted).attrs({ as: DoneOutline })`
  background-color: green;
  color: white;
`

const VotedNo = styled(Voted).attrs({ as: CloseOutline })`
  background-color: red;
  color: white;
`

export const Player = ({
  currentPlayerRole = "liberal",
  role,
  vote,
  scale = 1,
  isPresident = false,
  isChancellor = false,
  displayName = "<no display name>",
  isCurrentPlayer = false,
  selectable = false,
  onClick
}) => {
  const { state } = useContext(StateContext)

  const srcs = {
    "L": liberal,
    "F": fascist,
    "H": hitler
  }
  const roleToDisplay = !role
    ? ""
    : currentPlayerRole === "F"
    ? role
    : currentPlayerRole === "H" && isCurrentPlayer
    ? "H"
    : "L"
  return (
    <PlayerWrapper tabIndex="0" selectable={selectable} onClick={onClick}>
      {roleToDisplay && (
        <PlayerImage scale={scale} src={srcs[roleToDisplay]}>
          {isPresident && <PresidentMarker scale={scale}>Pr</PresidentMarker>}
          {state !== "election" && isChancellor && (
            <ChancellorMarker scale={scale}>Ch</ChancellorMarker>
          )}
          {state === "election" && typeof vote === "boolean" && <Voted />}
          {state !== "election" &&
            typeof vote === "boolean" &&
            (vote ? <VotedYes /> : <VotedNo />)}
        </PlayerImage>
      )}
      <PlayerLabel highlight={isCurrentPlayer} scale={scale}>
        {displayName}
      </PlayerLabel>
    </PlayerWrapper>
  )
}

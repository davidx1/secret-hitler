import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { DoneOutline } from "@styled-icons/material-sharp/DoneOutline";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { HowToVote } from "@styled-icons/material/HowToVote";
import { Trophy } from "@styled-icons/fa-solid/Trophy";
import { SadCry } from "@styled-icons/fa-regular/SadCry";
import { Skull } from "@styled-icons/fa-solid/Skull";
import { PowerOff } from "@styled-icons/material/PowerOff";

import { QuestionCircle } from "@styled-icons/fa-solid/QuestionCircle";
import fascist from "../../../img/fascist.png";
import liberal from "../../../img/liberal.png";
import hitler from "../../../img/hitler.png";
import president from "../../../img/president.png";
import chancellor from "../../../img/chancellor.png";

import { StateContext } from "../Play";
import { ColorSpan } from "./ColorSpan";

export const Player = ({
  currentPlayerRole = "liberal",
  role,
  vote,
  scale = 1,
  isPresident = false,
  isChancellor = false,
  displayName = "<no display name>",
  isCurrentPlayer = false,
  onClick,
  chatBubbleContent: propChatBubbleContent,
  isActive,
  color,
  isDisconnected
}) => {
  const { state } = useContext(StateContext);

  const srcs = {
    "L": liberal,
    "F": fascist,
    "H": hitler
  };
  const roleToDisplay = !role
    ? ""
    : currentPlayerRole === "F" || isCurrentPlayer
    ? role
    : currentPlayerRole === "H" && isCurrentPlayer
    ? "H"
    : "L";
  return (
    <PlayerWrapper
      tabIndex="0"
      onClick={isActive && onClick}
      scale={scale}
      color={color}
      highlight={isCurrentPlayer}
    >
      {roleToDisplay ? (
        <>
          {isPresident && (
            <PresidentMarker scale={scale} layoutId="presidentMarker"></PresidentMarker>
          )}
          {state !== "election" && state !== "revealVote" && isChancellor && (
            <ChancellorMarker scale={scale} layoutId="chancellorMarker"></ChancellorMarker>
          )}
          <PlayerImage scale={scale} src={srcs[roleToDisplay]}>
            {state === "election" && typeof vote === "boolean" && (
              <VotedWrapper
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Voted />
              </VotedWrapper>
            )}
            <AnimatePresence>
              {state === "revealVote" && typeof vote === "boolean" && (
                <VotedWrapper
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {vote ? <VotedYes /> : <VotedNo />}
                </VotedWrapper>
              )}
            </AnimatePresence>

            {state === "fascistWin" && (role === "H" || role === "F") && <Win />}
            {state === "liberalWin" && role === "L" && <Win />}
            {state === "fascistWin" && role === "L" && <Lose />}
            {state === "liberalWin" && (role === "H" || role === "F") && <Lose />}
            {propChatBubbleContent && (
              <SpeechBubble>
                <ColorSpan color={propChatBubbleContent.targetColor}>
                  {propChatBubbleContent.targetName}
                </ColorSpan>
                {propChatBubbleContent.content}
              </SpeechBubble>
            )}
          </PlayerImage>
        </>
      ) : (
        <UnknownRole scale={scale} />
      )}
      {!isActive ||
        (isDisconnected && (
          <StatusOverlay scale={scale}>
            {!isActive ? <DeadIcon /> : <DisconnectedIcon />}
          </StatusOverlay>
        ))}
      <PlayerLabel scale={scale} color={color}>
        {displayName}
        {!isActive ? "(Killed)" : ""}
      </PlayerLabel>
    </PlayerWrapper>
  );
};

const playerImageSize = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20%;

  height: ${(props) => 25 * props.scale}px;
  width: ${(props) => 25 * props.scale}px;
  @media only screen and (min-width: 512px) {
    height: ${(props) => 32 * props.scale}px;
    width: ${(props) => 32 * props.scale}px;
  }
  @media only screen and (min-width: 768px) {
    height: ${(props) => 40 * props.scale}px;
    width: ${(props) => 40 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    height: ${(props) => 50 * props.scale}px;
    width: ${(props) => 50 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: ${(props) => 80 * props.scale}px;
    width: ${(props) => 80 * props.scale}px;
  }
  @media only screen and (min-width: 1450px) {
    padding: 0;
    height: ${(props) => 100 * props.scale}px;
    width: ${(props) => 100 * props.scale}px;
  }
`;
const PlayerImage = styled.div`
  display: flex;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 5px 10px #444444;
  overflow: hidden;
  ${playerImageSize}
`;
const PlayerLabel = styled.p`
  box-sizing: border-box;
  border-radius: 10%;
  padding: 2px 2px;
  line-height: 1;
  text-align: center;
  background-color: ${(props) => `${props.color}`};
  font-size: ${(props) => 10 * props.scale}px;
  margin: 0;
  box-shadow: 0px 3px 5px #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  min-width: ${(props) => 40 * props.scale}px;
  max-width: ${(props) => 100 * props.scale}px;
  z-index: 1;

  @media only screen and (min-width: 768px) {
    font-size: ${(props) => 14 * props.scale}px;
    min-width: ${(props) => 40 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => 16 * props.scale}px;
    min-width: ${(props) => 60 * props.scale}px;
    max-width: ${(props) => 150 * props.scale}px;
    padding: 5px 10px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => 20 * props.scale}px;
  }
  @media only screen and (min-width: 1450px) {
    font-size: ${(props) => 24 * props.scale}px;
    min-width: ${(props) => 120 * props.scale}px;
    max-width: ${(props) => 240 * props.scale}px;
  }
`;

const PlayerWrapper = styled.div`
  border-width: 5px;
  border-style: double;
  border-color: ${({ highlight, color }) => (highlight ? color : "transparent")};
  padding: 5px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  height: min-content;
  &:hover {
    filter: brightness(1.2);
  }
  @media only screen and (min-width: 768px) {
    border-width: 6px;
  }
  @media only screen and (min-width: 992px) {
    border-width: 7px;
  }
  @media only screen and (min-width: 1200px) {
    border-width: 8px;
  }
`;

const Marker = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  top: -10px;
  width: ${(props) => 66 * props.scale}px;
  height: ${(props) => 20 * props.scale}px;
  z-index: 1;

  @media only screen and (min-width: 768px) {
    top: -13px;
    width: ${(props) => 80 * props.scale}px;
    height: ${(props) => 24 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    top: -15px;
    width: ${(props) => 95 * props.scale}px;
    height: ${(props) => 30 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    top: -15px;
    width: ${(props) => 133 * props.scale}px;
    height: ${(props) => 41 * props.scale}px;
  }
  @media only screen and (min-width: 1450px) {
    width: ${(props) => 147 * props.scale}px;
    height: ${(props) => 45 * props.scale}px;
  }
`;
const PresidentMarker = styled(Marker)`
  background-image: url(${president});
`;
const ChancellorMarker = styled(Marker)`
  background-image: url(${chancellor});
`;

const VotedWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
`;

const Voted = styled(HowToVote)`
  height: 100%;
  width: 100%;
  background-color: blue;
  color: white;
`;
const StatusOverlay = styled.div`
  position: absolute;
  top: 0;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #33333380;
  box-shadow: none;
  padding: 3px;
  ${playerImageSize}
`;
const DeadIcon = styled(Skull)`
  height: 50%;
  width: 50%;
  color: white;
`;
const DisconnectedIcon = styled(PowerOff)`
  height: 50%;
  width: 50%;
  color: white;
`;
const UnknownRole = styled(QuestionCircle)`
  height: 80%;
  color: white;
  background-color: gray;
  ${playerImageSize}
`;
const VotedYes = styled(Voted).attrs({ as: DoneOutline })`
  background-color: green;
  color: white;
`;
const VotedNo = styled(Voted).attrs({ as: CloseOutline })`
  background-color: red;
  color: white;
`;
const Win = styled(Voted).attrs({ as: Trophy })`
  color: gold;
  background-color: black;
`;
const Lose = styled(Voted).attrs({ as: SadCry })`
  color: white;
  background-color: indianred;
`;
const SpeechBubble = styled.div`
  position: absolute;
  padding: 5px;
  top: -15px;
  left: -5px;
  background: #ffffff;
  border-radius: 0.4em;
  font-size: 10px;
  width: max-content;
  border: 1px solid black;
  @media only screen and (min-width: 992px) {
    top: -25px;
    left: 0px;
    padding: 7px;
    font-size: 14px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 10px;
    font-size: 16px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #ffffff;
    border-bottom: 0;
    border-left: 0;
    margin-left: -7px;
    margin-bottom: -8px;
    @media only screen and (min-width: 992px) {
      border: 20px solid transparent;
      border-top-color: #ffffff;
      border-bottom: 0;
      border-left: 0;
      margin-left: -10px;
      margin-bottom: -20px;
    }
  }
`;

import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { DoneOutline } from "@styled-icons/material-sharp/DoneOutline";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { HowToVote } from "@styled-icons/material/HowToVote";
import { Trophy } from "@styled-icons/fa-solid/Trophy";
import { SadCry } from "@styled-icons/fa-regular/SadCry";
import { Skull } from "@styled-icons/fa-solid/Skull";
import { QuestionCircle } from "@styled-icons/fa-solid/QuestionCircle";
import fascist from "../../../img/fascist.png";
import liberal from "../../../img/liberal.png";
import hitler from "../../../img/hitler.png";
import { StateContext } from "../Play";
import { motion } from "framer-motion";
import { NotificationWrapper } from "../../../lib/Notification";

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
  isActive
}) => {
  const { state } = useContext(StateContext);
  const [isChatBubbleShowing, setIsChatBubbleShowing] = useState(false);
  useEffect(() => {
    console.log(propChatBubbleContent);

    if (propChatBubbleContent) {
      setIsChatBubbleShowing(true);
    }
  }, [propChatBubbleContent]);

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
    <PlayerWrapper tabIndex="0" onClick={isActive && onClick} scale={scale}>
      {roleToDisplay ? (
        <>
          <PlayerImage scale={scale} src={srcs[roleToDisplay]}>
            {isPresident && (
              <PresidentMarker scale={scale} layoutId="presidentMarker">
                P
              </PresidentMarker>
            )}
            {state !== "election" && isChancellor && (
              <ChancellorMarker scale={scale} layoutId="chancellorMarker">
                C
              </ChancellorMarker>
            )}
            {state === "election" && typeof vote === "boolean" && <Voted />}
            {state !== "election" &&
              typeof vote === "boolean" &&
              (vote ? <VotedYes /> : <VotedNo />)}
            {state === "fascistWin" && (role === "H" || role === "F") && (
              <Win />
            )}
            {state === "liberalWin" && role === "L" && <Win />}
            {state === "fascistWin" && role === "L" && <Lose />}
            {state === "liberalWin" && (role === "H" || role === "F") && (
              <Lose />
            )}
            {isChatBubbleShowing && propChatBubbleContent && (
              <NotificationWrapper
                duration={3000}
                killSelf={() => setIsChatBubbleShowing(false)}
              >
                <SpeechBubble>{propChatBubbleContent}</SpeechBubble>
              </NotificationWrapper>
            )}
          </PlayerImage>
          {!isActive && (
            <DeathOverlay scale={scale}>
              <DeadIcon />
            </DeathOverlay>
          )}
        </>
      ) : (
        <UnknownRole scale={scale} />
      )}
      <PlayerLabel highlight={isCurrentPlayer} scale={scale}>
        {displayName}
        {!isActive ? "(Killed)" : ""}
      </PlayerLabel>
    </PlayerWrapper>
  );
};

const playerImageSize = css`
  border-radius: 20%;

  height: ${(props) => 25 * props.scale}px;
  width: ${(props) => 25 * props.scale}px;
  @media only screen and (min-width: 768px) {
    height: ${(props) => 50 * props.scale}px;
    width: ${(props) => 50 * props.scale}px;
  }
  @media only screen and (min-width: 992px) {
    height: ${(props) => 60 * props.scale}px;
    width: ${(props) => 60 * props.scale}px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: ${(props) => 100 * props.scale}px;
    width: ${(props) => 100 * props.scale}px;
  }
  @media only screen and (min-width: 1450px) {
    padding: 0;
    height: ${(props) => 100 * props.scale}px;
    width: ${(props) => 100 * props.scale}px;
  }
`;
const PlayerImage = styled.div`
  display: flex;
  align-items: flex-end;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 5px 10px #444444;
  ${playerImageSize}
`;
const PlayerLabel = styled.p`
  box-sizing: border-box;
  border-radius: 10%;
  padding: 2px 2px;
  line-height: 1;
  text-align: center;
  background-color: ${(props) => (props.highlight ? "#7ffa99" : "#ffffff")};
  font-size: ${(props) => 10 * props.scale}px;
  margin: 0;
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
    padding: 5px 10px;
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
`;
const PlayerWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  &:hover {
    filter: brightness(1.2);
  }
`;

const Marker = styled(motion.div)`
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
`;
const PresidentMarker = styled(Marker)`
  border-color: ${(props) => props.theme.blue_dark};
  background-color: ${(props) => props.theme.blue_light};
`;
const ChancellorMarker = styled(Marker)`
  border-color: ${(props) => props.theme.orange_dark};
  background-color: ${(props) => props.theme.orange_light};
`;
const Voted = styled(HowToVote)`
  height: 30%;
  width: 30%;
  background-color: blue;
  color: white;
`;
const DeathOverlay = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #33333380;
  box-shadow: none;
  ${playerImageSize}
`;
const DeadIcon = styled(Skull)`
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
  background: #00aabb;
  border-radius: 0.4em;
  font-size: 10px;
  width: max-content;
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
    border-top-color: #00aabb;
    border-bottom: 0;
    border-left: 0;
    margin-left: -7px;
    margin-bottom: -8px;
    @media only screen and (min-width: 992px) {
      border: 20px solid transparent;
      border-top-color: #00aabb;
      border-bottom: 0;
      border-left: 0;
      margin-left: -10px;
      margin-bottom: -20px;
    }
    @media only screen and (min-width: 1200px) {
      border: 20px solid transparent;
      border-top-color: #00aabb;
      border-bottom: 0;
      border-left: 0;
      margin-left: -10px;
      margin-bottom: -20px;
    }
  }
`;

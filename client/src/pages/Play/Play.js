import React, { createContext, useState } from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import Chance from "chance";
import useWindowSize from "react-use-window-size";

import { PlayWrapper } from "./components/PlayWrapper";
import { FullScreenButton } from "./components/FullScreenButton";
import { StartScreen } from "./components/StartScreen";
import { InprogressScreen } from "./components/InprogressScreen";
import { Chat } from "./components/Chat";
import { Loader } from "../../lib/Loader";

import { useRoomState } from "../../useRoomState";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ isLandscape }) => (isLandscape ? "row" : "column")};
  padding-top: 30px;
  width: 100%;
  height: 100%;
  @media only screen and (min-width: 512px) {
    padding-top: 0px;
  }
`;

export const ChatWrapper = styled.div`
  background-color: purple;
  height: ${({ isLandscape }) => (isLandscape ? "inherit" : "100%")};
  width: ${({ isLandscape }) => (isLandscape ? "30%" : "100%")};
  margin: 0 auto;
  max-width: 1920px;

  ${({ isLandscape }) =>
    isLandscape &&
    css`
      @media only screen and (min-width: 512px) {
        max-height: 350px;
      }
      @media only screen and (min-width: 768px) {
        max-height: 500px;
      }
      @media only screen and (min-width: 992px) {
        max-height: 700px;
      }
      @media only screen and (min-width: 1200px) {
        max-height: 1000px;
      }
      @media only screen and (min-width: 1450px) {
        max-height: 1450px;
      }
    `}
`;

export const StateContext = createContext();
export const ActionContext = createContext();

const chance = new Chance();

export default function Game({ room, setRoom, client }) {
  const { roomId } = useParams();
  const [interactionMenuTarget, setInteractionMenuTarget] = useState(-1);

  const { width, height } = useWindowSize();
  const isLandscape = width > height;

  const joinRoom = async () => {
    client
      .joinById(roomId, { displayName: chance.first() })
      .then((newRoom) => setRoom(newRoom));
  };

  const {
    state,
    context,
    playersToDisplay,
    isYouPresident,
    isYouChancellor,
    youInfo,
    start,
    selectChancellor,
    vote,
    revealVote,
    selectACardToRemove,
    enactAPolicy,
    doneViewingCards,
    killPlayer,
    doneInvestigating,
    setNewPresident,
    requestVeto,
    approveVeto,
    rejectVeto,
    sendChat,
    chatState,
    sendChatBubble
  } = useRoomState(room, joinRoom);

  if (!state) {
    return <Loader />;
  }

  return (
    <ActionContext.Provider
      value={{
        start,
        selectChancellor,
        vote,
        revealVote,
        selectACardToRemove,
        enactAPolicy,
        doneViewingCards,
        killPlayer,
        doneInvestigating,
        setNewPresident,
        requestVeto,
        approveVeto,
        rejectVeto,
        sendChat,
        setInteractionMenuTarget,
        sendChatBubble
      }}
    >
      <StateContext.Provider
        value={{
          ...context,
          youId: youInfo.id,
          youInfo,
          isYouPresident,
          isYouChancellor,
          state,
          players: playersToDisplay,
          chatState,
          roomId,
          interactionMenuTarget
        }}
      >
        <Wrapper isLandscape={isLandscape}>
          <FullScreenButton />

          <PlayWrapper>
            {state === "waiting" ? (
              <StartScreen></StartScreen>
            ) : (
              <InprogressScreen></InprogressScreen>
            )}
          </PlayWrapper>
          <ChatWrapper isLandscape={isLandscape}>
            <Chat />
          </ChatWrapper>
        </Wrapper>
      </StateContext.Provider>
    </ActionContext.Provider>
  );
}

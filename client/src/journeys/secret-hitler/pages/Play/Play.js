import React, { createContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Chance from "chance";

import { PlayWrapper } from "./components/PlayWrapper";
import { FullScreenButton } from "./components/FullScreenButton";
import { StartScreen } from "./components/StartScreen";
import { InprogressScreen } from "./components/InprogressScreen";
import { Chat } from "./components/Chat";

import { useRoomState } from "../../useRoomState";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ChatWrapper = styled.div`
  height: 100%;
  width: 20%;
  background-color: purple;
`;

export const StateContext = createContext();
export const ActionContext = createContext();

const chance = new Chance();

export default function Game({ room, setRoom, client }) {
  const { roomId } = useParams();

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
    chatState
  } = useRoomState(room, joinRoom);

  if (!state) {
    return <span>Loading</span>;
  }

  console.log("chatState in Play is:", chatState);

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
        sendChat
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
          chatState
        }}
      >
        <Wrapper>
          <PlayWrapper>
            <FullScreenButton />

            {state === "waiting" ? (
              <StartScreen></StartScreen>
            ) : (
              <InprogressScreen></InprogressScreen>
            )}
          </PlayWrapper>
          <ChatWrapper>
            <Chat />
          </ChatWrapper>
        </Wrapper>
      </StateContext.Provider>
    </ActionContext.Provider>
  );
}

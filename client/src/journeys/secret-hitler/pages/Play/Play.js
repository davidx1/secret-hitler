import React, { useState, useLayoutEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import Chance from "chance";

import { PlayWrapper } from "./components/PlayWrapper";

import { FullScreenButton } from "./components/FullScreenButton";

import { StartScreen } from "./components/StartScreen";
import { InprogressScreen } from "./components/InprogressScreen";

import { useRoomState } from "../../useRoomState";

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
    rejectVeto
  } = useRoomState(room, joinRoom);

  if (!state) {
    return <span>Loading</span>;
  }

  return (
    <PlayWrapper>
      <FullScreenButton />
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
          rejectVeto
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
            players: playersToDisplay
          }}
        >
          {state === "waiting" ? (
            <StartScreen></StartScreen>
          ) : (
            <InprogressScreen></InprogressScreen>
          )}
        </StateContext.Provider>
      </ActionContext.Provider>
    </PlayWrapper>
  );
}

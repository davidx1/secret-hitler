import { useState, useLayoutEffect } from "react";
import _ from "lodash";

export interface Player {
  displayName: string;
  id: number;
  role: string;
  vote: boolean;
}

export interface Context {
  chancellorIndex?: any;
  board: string[];
  drawPile: string[];
  enactedFascistPolicies: number;
  enactedLiberalPolicies: number;
  players: Player[];
  policiesInHand: string[];
  presidentIndex: number;
  prevChancellorIndex?: any;
  prevPresidentIndex?: any;
}

export interface RootObject {
  context: Context;
  state: string;
}

export const useRoomState = (room: any, joinRoom: () => void) => {
  const [roomState, setRoomState] = useState({} as RootObject);
  const [youId, setYouId] = useState(1);
  const [attemptedToJoin, setAttemptedToJoin] = useState(false);

  useLayoutEffect(() => {
    if (!room && !attemptedToJoin) {
      console.log();
      setAttemptedToJoin(true);
      joinRoom();
    }
    if (room) {
      setYouId(room.sessionId);
      room.onMessage(function (message: any) {
        console.log(JSON.stringify(message));
        console.log(message.type === "state");
        setRoomState({ ...message.payload });
      });
      return () => {
        console.log("leaving room");
        room.leave();
      };
    }
  }, [room]);

  const {
    state,
    context = { players: [], presidentIndex: -1, chancellorIndex: -1 }
  } = roomState as RootObject;

  const playersToDisplay = context.players.filter(
    (p) => p.displayName !== "secret-admin"
  );
  const isYouPresident =
    _.get(playersToDisplay[context.presidentIndex], "id") === youId;
  const isYouChancellor =
    _.get(playersToDisplay[context.chancellorIndex], "id") === youId;
  const youInfo = playersToDisplay.find((p) => p.id === youId);

  function trigger(name: string, payload = {}) {
    room.send({ "type": name, ...payload });
  }

  function start() {
    console.log("starting");
    trigger("start");
  }

  function doneViewingCards() {
    trigger("doneViewingCards");
  }

  function selectChancellor(i: number) {
    trigger("selectChancellor", { index: i });
  }

  function vote(input: boolean) {
    trigger("vote", { id: youId, value: input });
  }

  function revealVote() {
    trigger("revealVote");
  }

  function selectACardToRemove(i: number) {
    trigger("cardSelect", { index: i });
  }

  function enactAPolicy(i: number) {
    trigger("enact", { index: i });
  }

  function killPlayer(i: number) {
    trigger("killPlayer", { index: i });
  }

  return {
    state,
    context: roomState.context,
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
    killPlayer
  };
};

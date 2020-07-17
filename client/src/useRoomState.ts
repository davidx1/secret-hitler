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
  const [chatState, setChatState] = useState(
    [] as { isSystem: boolean; message: string }[]
  );
  const [youId, setYouId] = useState(1);
  const [attemptedToJoin, setAttemptedToJoin] = useState(false);
  const [chatBubbleContent, setChatBubbleContent] = useState("");

  const newMsg = (message: string, isSystem = false) => {
    setChatState((prevChatState) => {
      const l = prevChatState.length;
      const messageToKeep =
        l < 40 ? prevChatState : prevChatState.slice(l - 40);

      return [
        ...messageToKeep,
        {
          isSystem,
          message
        }
      ];
    });
  };

  useLayoutEffect(() => {
    if (!room && !attemptedToJoin) {
      setAttemptedToJoin(true);
      joinRoom();
    }
    if (room) {
      setYouId(room.sessionId);
      room.onMessage(function (message: any) {
        if (message.type === "state") {
          setRoomState({ ...message.payload });
        }
        if (message.type === "chat") {
          newMsg(message.payload.content);
        }
        if (message.type === "systemChat") {
          newMsg(message.payload.content, true);
        }
        if (message.type === "chatBubble") {
          setChatBubbleContent(message.payload);
        }
      });
      return () => {
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
    trigger("start");
  }

  function doneViewingCards() {
    trigger("doneViewingCards");
  }

  function doneInvestigating() {
    trigger("doneInvestigating");
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

  function setNewPresident(i: number) {
    trigger("selectPresident", { index: i });
  }

  function requestVeto() {
    trigger("requestVeto");
  }

  function rejectVeto() {
    trigger("rejectVeto");
  }

  function approveVeto() {
    trigger("approveVeto");
  }

  function sendChat(s: string) {
    trigger("chat", { content: s });
  }

  function sendChatBubble(s: string) {
    trigger("chatBubble", { content: s });
  }

  return {
    state,
    chatState,
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
    killPlayer,
    doneInvestigating,
    setNewPresident,
    requestVeto,
    rejectVeto,
    approveVeto,
    sendChat,
    sendChatBubble,
    chatBubbleContent
  };
};

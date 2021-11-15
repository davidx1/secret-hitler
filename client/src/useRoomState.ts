import { useState, useLayoutEffect } from "react";
import _ from "lodash";
import useInterval from "use-interval";
import { useHistory, useParams } from "react-router-dom";

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
  spectators: Partial<Player>[];
  policiesInHand: string[];
  presidentIndex: number;
  prevChancellorIndex?: any;
  prevPresidentIndex?: any;
}

export interface RootObject {
  context: Context;
  state: string;
}

export const useRoomState = (room: any, setRoom: any, client: any, postJoiningCallback: any) => {
  const [roomState, setRoomState] = useState({} as RootObject);
  const [chatState, setChatState] = useState(
    [] as { color: string; name: string; content: string }[]
  );
  const [youId, setYouId] = useState(1);
  const [attemptedToJoin, setAttemptedToJoin] = useState(false);
  const [chatBubbleContent, setChatBubbleContent] = useState("");
  const { roomId } = useParams();
  const history = useHistory();

  const joinRoom = async () => {
    client
      .joinById(roomId)
      .then((newRoom: any) => setRoom(newRoom))
      .catch((err: any) => history.replace({ pathname: "/", state: { isError: false } }));
  };

  useInterval(() => {
    // Your custom logic here
    const existingRoomId = sessionStorage.getItem("vsh-room-id");
    const existingSessionId = sessionStorage.getItem("vsh-session-id");
    if (existingRoomId && existingSessionId) {
      try {
        client.reconnect(existingRoomId, existingSessionId).then(postJoiningCallback);
      } catch (e) {}
    }
  }, 6000);

  const newMsg = (message: { color: string; name: string; content: string }) => {
    setChatState((prevChatState) => {
      const l = prevChatState.length;
      const messageToKeep = l < 40 ? prevChatState : prevChatState.slice(l - 40);

      return [...messageToKeep, message];
    });
  };

  useLayoutEffect(() => {
    if (!room && !attemptedToJoin) {
      const existingRoomId = sessionStorage.getItem("vsh-room-id");
      const existingSessionId = sessionStorage.getItem("vsh-session-id");
      if (!existingRoomId && !existingSessionId) {
        history.replace("/");
      }
    }
    if (room) {
      setYouId(room.sessionId);
      room.onMessage("state", (message: any) => {
        setRoomState({ ...message.payload });
      });

      room.onMessage("chat", (message: any) => {
        newMsg(message.payload);
      });

      room.onMessage("chatBubble", (message: any) => {
        setChatBubbleContent(message.payload);
      });

      room.onError((_: any, message: any) => {
        console.log("oops, error ocurred:");
        console.log(message);
        alert(message);
      });

      return () => {
        room.leave();
      };
    }
  }, [room]);

  const {
    state,
    context = { players: [], spectators: [], presidentIndex: -1, chancellorIndex: -1 }
  } = roomState as RootObject;

  const playersToDisplay = context.players.filter((p) => p.displayName !== "secret-admin");
  const isYouPresident = _.get(playersToDisplay[context.presidentIndex], "id") === youId;
  const isYouChancellor = _.get(playersToDisplay[context.chancellorIndex], "id") === youId;
  const youInfo =
    playersToDisplay.find((p) => p.id === youId) || context.spectators.find((s) => s.id === youId);

  function trigger(name: string, payload = {}) {
    console.log("trigger", name, payload);
    room.send(name, payload);
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

  function sendChatBubble(payload: { targetName: string; targetColor: string; content: string }) {
    trigger("chatBubble", payload);
  }

  function playAgain() {
    trigger("playAgain");
  }

  return {
    state,
    chatState,
    context: roomState.context,
    playersToDisplay,
    isYouPresident,
    isYouChancellor,
    youInfo,
    chatBubbleContent,
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
    playAgain
  };
};

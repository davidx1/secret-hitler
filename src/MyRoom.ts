import { Room, Client } from "colyseus";
import { Schema } from "@colyseus/schema";
import stateMachine, { prodInitialState } from "./stateMachine";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);

export class MyRoom extends Room {
  roomStateMachine = stateMachine;
  roomState = this.roomStateMachine.initialState;

  br() {
    const { value, context } = this.roomState;
    this.broadcast({
      type: "state",
      payload: {
        state: value,
        context
      }
    });
  }

  onCreate(options: any) {
    console.log("BasicRoom created!", options);
    this.roomId = nanoid();
  }

  onJoin(client: { sessionId: any }, data: { displayName: string }) {
    this.roomState = stateMachine.transition(this.roomState, {
      "type": "newPlayer",
      "id": client.sessionId,
      "displayName": data.displayName
    });
    this.br();
  }

  onLeave(client: { sessionId: any }) {
    this.roomState = stateMachine.transition(this.roomState, {
      "type": "removePlayer",
      "id": client.sessionId
    });
    this.br();
  }

  onMessage(client: { sessionId: any }, payload: any) {
    if (payload.type === "chat") {
      this.broadcast({
        type: "chat",
        payload: {
          content: `${
            this.roomState.context.players.find(
              (p) => p.id === client.sessionId
            ).displayName
          }: ${payload.content}`
        }
      });
    } else if (payload.type === "chatBubble") {
      this.broadcast({
        type: "chatBubble",
        payload: {
          content: {
            id: client.sessionId,
            content: payload.content
          }
        }
      });
    } else {
      this.roomState = stateMachine.transition(this.roomState, { ...payload });
      console.log(this.roomState.value);
      this.broadcast({
        type: "systemChat",
        payload: {
          content: getSystemChatMessage(
            this.roomState.value,
            this.roomState.context
          )
        }
      });
      this.br();
    }
  }

  onDispose() {
    console.log("Dispose BasicRoom");
  }
}

function getSystemChatMessage(state, context) {
  const { presidentIndex, chancellorIndex, players } = context;
  const president = players[presidentIndex];
  const chancellor = players[chancellorIndex];

  switch (state) {
    case "chancellorSelection":
      return `${president.displayName}(President) to select new chancellor`;
    case "election":
      const activePlayerCount = players.filter((p) => p.isActive).length;
      const votes = players.filter(
        (p) => p.isActive && typeof p.vote === "boolean"
      ).length;
      if (activePlayerCount - votes > 0) {
        return `${votes}/${activePlayerCount} votes casted in election of ${chancellor.displayName}`;
      }
      return `All votes in ${president.displayName}(President) to reveal election result`;
    case "filterCards":
      return `${president.displayName}(President) to discard one policy card`;
    case "enactPolicy":
      return `${chancellor.displayName}(Chancellor) to enact one policy card`;
    case "viewThreeCards":
      return `${president.displayName}(President) to view next three policy cards`;
    case "investigatePlayer":
      return `${president.displayName}(President) to investigate a player's true identity`;
    case "killPlayer":
      return `${president.displayName}(President) to kill a player`;
    case "presidentSelection":
      return `${president.displayName}(President) to select next president`;
    case "liberalWin":
    case "fascistWin":
    default:
      return "hello world";
  }
}

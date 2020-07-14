import { Room, Client } from "colyseus";
import stateMachine from "./stateMachine";
import { customAlphabet } from "nanoid";
import { interpret } from "xstate";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);
const machine = stateMachine;

export class MyRoom extends Room {
  roomState = stateMachine.initialState;
  transitionDelay = null;

  // Interpret the machine, and add a listener for whenever a transition occurs.
  service = interpret(stateMachine, {
    clock: {
      setTimeout: (fn, delay) => {
        this.transitionDelay = this.clock.setTimeout(fn, delay);
        return 1;
      },
      clearTimeout: () => this.transitionDelay.clear()
    }
  })
    .onTransition(({ value, context }) => {
      console.log(value);
      this.broadcast({
        type: "state",
        payload: {
          state: typeof value === "string" ? value : value["play"],
          context
        }
      });
    })
    .start();

  chatBubbles = {};

  onCreate(options: any) {
    console.log("BasicRoom created!", options);
    this.roomId = nanoid();
  }

  onJoin(client: { sessionId: any }, data: { displayName: string }) {
    console.log(`${data.displayName} attempts to join`);
    this.service.send("newPlayer", {
      id: client.sessionId,
      displayName: data.displayName
    });
  }

  onLeave(client: { sessionId: any }) {
    this.service.send("removePlayer", {
      id: client.sessionId
    });
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
      console.log("server received chat bubble");
      console.log(payload.content);
      if (this.chatBubbles[client.sessionId] !== "") {
        this.chatBubbles[client.sessionId] = "";
        this.broadcast({
          type: "chatBubble",
          payload: this.chatBubbles
        });
      }

      //This delay is to clear the existing bubble, unmount it, so the timeout resets
      this.clock.setTimeout(() => {
        this.chatBubbles[client.sessionId] = payload.content;
        this.broadcast({
          type: "chatBubble",
          payload: this.chatBubbles
        });
      }, 300);

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
    } else {
      this.roomState = this.service.send({ ...payload });
      this.broadcast({
        type: "systemChat",
        payload: {
          content: getSystemChatMessage(
            this.roomState.value,
            this.roomState.context
          )
        }
      });
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
  const simplifiedState = typeof state === "string" ? state : state["play"];

  switch (simplifiedState) {
    case "chancellorSelection":
      return `${president.displayName}(President) to select new chancellor`;
    case "election":
      const activePlayerCount = players.filter((p) => p.isActive).length;
      const votes = players.filter(
        (p) => p.isActive && typeof p.vote === "boolean"
      ).length;
      return `${votes}/${activePlayerCount} votes casted`;
    case "revealVote":
      return `All votes in`;
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
      return "Default system message";
  }
}

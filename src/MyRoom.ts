import { Room, Client } from "colyseus";
import stateMachine from "./stateMachine";
import { customAlphabet } from "nanoid";
import { interpret } from "xstate";
import Chance from "chance";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);
const machine = stateMachine;
const chance = new Chance();

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
      displayName: data?.displayName || chance.first()
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
            this.service.state.context.players.find(
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
            this.service.state.context.players.find(
              (p) => p.id === client.sessionId
            ).displayName
          }: ${payload.content}`
        }
      });
    } else {
      this.roomState = this.service.send({ ...payload });
    }
  }

  onDispose() {
    console.log("Dispose BasicRoom");
  }
}

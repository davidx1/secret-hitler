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
  playerColors = [
    { value: "#dadada", isFree: true },
    { value: "#8c8c8c", isFree: true },
    { value: "#7f68d6", isFree: true },
    { value: "#0682c5", isFree: true },
    { value: "#7ac52b", isFree: true },
    { value: "#eccc07", isFree: true },
    { value: "#eb8d23", isFree: true },
    { value: "#f41027", isFree: true },
    { value: "#fa50c0", isFree: true },
    { value: "#4bd8ef", isFree: true }
  ];

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
      this.broadcast("state", {
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

    this.onMessage("chat", (client, payload) => {
      const person = this.service.state.context.players.find((p) => p.id === client.sessionId);
      this.broadcast("chat", {
        payload: {
          color: person.color,
          name: person.displayName,
          content: payload.content
        }
      });
    });

    this.onMessage("chatBubble", (client, payload) => {
      console.log("payload", payload);
      const person = this.service.state.context.players.find((p) => p.id === client.sessionId);
      if (!this.chatBubbles[client.sessionId]) {
        //This delay is to clear the existing bubble, unmount it, so the timeout resets
        this.clock.setTimeout(() => {
          this.chatBubbles[client.sessionId] = payload;
          this.broadcast("chatBubble", {
            payload: this.chatBubbles
          });
        }, 300);

        this.clock.setTimeout(() => {
          this.chatBubbles[client.sessionId] = "";
          this.broadcast("chatBubble", {
            payload: this.chatBubbles
          });
        }, 5000);

        this.broadcast("chat", {
          payload: {
            color: person.color,
            name: person.displayName,
            targetName: payload.targetName,
            targetColor: payload.targetColor,
            content: payload.content
          }
        });
      }
    });

    this.onMessage("*", (_, type, payload: any) => {
      console.log("type", type);
      console.log("message", payload);
      this.roomState = this.service.send({ type, ...payload });
    });
  }

  onJoin(client: { sessionId: any }, data: { displayName: string }) {
    console.log(`${data.displayName} attempts to join`);
    const availableColors = this.playerColors.filter((c) => c.isFree);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const newColor = availableColors[randomIndex];
    console.log(this.playerColors);
    const index = this.playerColors.indexOf(newColor);
    this.playerColors[index].isFree = false;

    this.service.send("newPlayer", {
      id: client.sessionId,
      displayName: data?.displayName || chance.first(),
      color: newColor.value
    });
  }

  async onLeave(client) {
    this.service.send("removePlayer", {
      id: client.sessionId
    });

    const reconnection = this.allowReconnection(client, 60);
    // allow disconnected client to reconnect
    await reconnection;

    this.service.send("reconnectPlayer", {
      id: client.sessionId
    });
  }

  onDispose() {
    console.log("Dispose BasicRoom");
  }
}

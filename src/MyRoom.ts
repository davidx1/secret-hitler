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
    const availableColors = this.playerColors.filter((c) => c.isFree);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const newColor = availableColors[randomIndex];
    const index = this.playerColors.indexOf(newColor);
    this.playerColors[index].isFree = false;

    this.service.send("newPlayer", {
      id: client.sessionId,
      displayName: data?.displayName || chance.first(),
      color: newColor.value
    });
  }

  onLeave(client: { sessionId: any }) {
    this.service.send("removePlayer", {
      id: client.sessionId
    });
  }

  onMessage(client: { sessionId: any }, payload: any) {
    const person = this.service.state.context.players.find(
      (p) => p.id === client.sessionId
    );

    if (payload.type === "chat") {
      this.broadcast({
        type: "chat",
        payload: {
          color: person.color,
          name: person.displayName,
          content: payload.content
        }
      });
    } else if (payload.type === "chatBubble") {
      if (this.chatBubbles[client.sessionId] !== "") {
        this.chatBubbles[client.sessionId] = undefined;
        this.broadcast({
          type: "chatBubble",
          payload: this.chatBubbles
        });
      }

      //This delay is to clear the existing bubble, unmount it, so the timeout resets
      this.clock.setTimeout(() => {
        this.chatBubbles[client.sessionId] = payload;
        this.broadcast({
          type: "chatBubble",
          payload: this.chatBubbles
        });
      }, 300);

      this.broadcast({
        type: "chat",
        payload: {
          color: person.color,
          name: person.displayName,
          targetName: payload.targetName,
          targetColor: payload.targetColor,
          content: payload.content
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

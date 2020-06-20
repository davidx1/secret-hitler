import { Room, Client } from "colyseus";
import { Schema } from "@colyseus/schema";
import stateMachine, { prodInitialState } from "./stateMachine";

export class MyRoom extends Room {
  roomStateMachine = stateMachine;
  roomState = this.roomStateMachine.initialState;

  br() {
    console.log("broadcasting");
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
    console.log("message Received");
    console.log(payload.type);
    console.log(payload);
    if (payload.type === "chat") {
      console.log(
        "ChatRoom received message from",
        client.sessionId,
        ":",
        payload.content
      );
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
      this.roomState = stateMachine.transition(this.roomState, { ...payload });
      console.log("new room state set");
      this.br();
    }
  }

  onDispose() {
    console.log("Dispose BasicRoom");
  }
}

import { Room, Client } from "colyseus"
import { Schema } from "@colyseus/schema"
import stateMachine, { prodInitialState } from "./stateMachine"

export class MyRoom extends Room {
  roomStateMachine = stateMachine
  roomState = this.roomStateMachine.initialState

  br() {
    this.broadcast({
      state: this.roomState.value,
      ...this.roomState.context
    })
  }

  onCreate(options: any) {
    console.log("BasicRoom created!", options)
  }

  onJoin(client: { sessionId: any }, data: { displayName: string }) {
    // console.log(`onJoin - data:`)
    this.roomState = stateMachine.transition(this.roomState, {
      "type": "newPlayer",
      "id": client.sessionId,
      "displayName": data.displayName
    })
    this.broadcast({ id: data.displayName, message: "joined" })
    this.br()
  }

  onLeave(client: { sessionId: any }) {
    // this.broadcast({
    //   id: this.state.getDisplayName(client.sessionId),
    //   message: "has left the room"
    // })
    // this.state.removePlayer(client.sessionId)
  }

  onMessage(client: { sessionId: any }, payload: any) {
    this.roomState = stateMachine.transition(this.roomState, payload)
    this.br()
  }

  onDispose() {
    console.log("Dispose BasicRoom")
  }
}

import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string")
  displayName: string;
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer(id: string, displayName: string) {
    console.log(`createPlayer - creating player with name ${displayName}`);
    this.players[id] = new Player();
    this.players[id].displayName = displayName;
  }

  removePlayer(id: string) {
    delete this.players[id];
  }

  getDisplayName(id: string) {
    return this.players[id].displayName || "Unknown";
  }
}

export class MyRoom extends Room {
  onCreate(options: any) {
    console.log("BasicRoom created!", options);
    this.setState(new State());
  }

  onJoin(client: { sessionId: any }, data: { displayName: string }) {
    console.log(`onJoin - data:`);
    console.log(data);
    this.state.createPlayer(client.sessionId, data.displayName);
    this.broadcast({ id: data.displayName, message: "joined" });
  }

  onLeave(client: { sessionId: any }) {
    this.broadcast({
      id: this.state.getDisplayName(client.sessionId),
      message: "has left the room",
    });
    this.state.removePlayer(client.sessionId);
  }

  onMessage(client: { sessionId: any }, data: { message: any }) {
    console.log("BasicRoom received message from", client.sessionId, ":", data);
    this.broadcast({
      id: this.state.getDisplayName(client.sessionId),
      message: data.message,
    });
  }

  onDispose() {
    console.log("Dispose BasicRoom");
  }
}

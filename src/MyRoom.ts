import { Room, Client } from "colyseus";

export class MyRoom extends Room {

  onCreate (options: any) {
    console.log("BasicRoom created!", options);
}

onJoin (client: { sessionId: any; }) {
    this.broadcast(`${ client.sessionId } joined.`);
}

onLeave (client: { sessionId: any; }) {
    this.broadcast(`${ client.sessionId } left.`);
}

onMessage (client: { sessionId: any; }, data: { message: any; }) {
    console.log("BasicRoom received message from", client.sessionId, ":", data);
    this.broadcast(`(${ client.sessionId }) ${ data.message }`);
}

onDispose () {
    console.log("Dispose BasicRoom");
}

}

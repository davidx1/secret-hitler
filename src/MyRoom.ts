import { Room, Client } from 'colyseus'
import { Schema, type, MapSchema } from '@colyseus/schema'

export class Player extends Schema {
  @type('string')
  displayName: string
  @type('boolean')
  ready: boolean
  @type('boolean')
  agree: boolean
  @type('string')
  role: 'F' | 'H' | 'L'
}

export class GameState extends Schema {
  @type('string')
  major: 'WAITING' | 'STARTED' | 'END'
  @type('string')
  minor: string
  @type('string')
  patch: 'SELECTING' | 'VOTING' | 'FILTERING' | 'PICKING'
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()
  @type(GameState)
  gameState = new GameState()

  createPlayer(id: string, displayName: string) {
    console.log(`createPlayer - creating player with name ${displayName}`)
    this.players[id] = new Player()
    this.players[id].displayName = displayName
  }

  removePlayer(id: string) {
    delete this.players[id]
  }

  getDisplayName(id: string) {
    return this.players[id].displayName || 'Unknown'
  }

  toggleReady(id: string) {
    this.players[id].ready = !this.players[id].ready
  }

  startGame() {
    this.gameState.major = 'STARTED'
    this.gameState.minor = this.players[0].id
    this.gameState.patch = 'SELECTING'
  }
}

export class MyRoom extends Room {
  onCreate(options: any) {
    console.log('BasicRoom created!', options)
    this.setState(new State())
  }

  onJoin(client: { sessionId: any }, data: { displayName: string }) {
    console.log(`onJoin - data:`)
    console.log(data)
    this.state.createPlayer(client.sessionId, data.displayName)
    this.broadcast({ id: data.displayName, message: 'joined' })
  }

  onLeave(client: { sessionId: any }) {
    this.broadcast({
      id: this.state.getDisplayName(client.sessionId),
      message: 'has left the room',
    })
    this.state.removePlayer(client.sessionId)
  }

  onMessage(client: { sessionId: any }, data: { message: any }) {
    this.broadcast({
      id: this.state.getDisplayName(client.sessionId),
      message: data.message,
    })
  }

  onDispose() {
    console.log('Dispose BasicRoom')
  }
}

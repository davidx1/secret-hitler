import React, { useState } from "react"
import * as Colyseus from "colyseus.js"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import Play from "./pages/Play"
import Lobby from "./pages/Lobby"

const host = window.document.location.host.replace(/:.*/, "")
const location = window.location
const client = new Colyseus.Client(
  location.protocol.replace("http", "ws") +
    "//" +
    host +
    (location.port ? ":" + 3001 : "")
)

function SecretHitler() {
  const [room, setRoom] = useState()

  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.url}/player`}>
        <Play room={room} setRoom={setRoom} client={client} />
      </Route>
      <Route path={"/"}>
        <Lobby
          client={client}
          playUrl={`${match.url}/player`}
          setRoom={setRoom}
        />
      </Route>
    </Switch>
  )
}

export default SecretHitler

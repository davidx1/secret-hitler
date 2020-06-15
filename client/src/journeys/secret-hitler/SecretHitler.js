import React, { useState } from "react";
import * as Colyseus from "colyseus.js";
import { Switch, Route } from "react-router-dom";
import Play from "./pages/Play";
import Lobby from "./pages/Lobby";
import AdminConsole from "./pages/AdminConsole";

const host = window.document.location.host.replace(/:.*/, "");
const location = window.location;
const client = new Colyseus.Client(
  location.protocol.replace("http", "ws") +
    "//" +
    host +
    (location.port ? ":" + 3001 : "")
);

function SecretHitler() {
  const [room, setRoom] = useState();
  const [joined, setJoined] = useState(false);

  return (
    <Switch>
      <Route path={`/player/:roomId`}>
        <Play room={room} setRoom={setRoom} client={client} />
      </Route>
      <Route path={`/secret-headquarter/`}>
        <AdminConsole client={client} />
      </Route>
      <Route path={"/"}>
        <Lobby client={client} playUrl={`player`} setRoom={setRoom} />
      </Route>
    </Switch>
  );
}

export default SecretHitler;

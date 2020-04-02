import React, { useState, useEffect } from "react";
import * as Colyseus from "colyseus.js";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import Play from "./pages/Play";

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
  const [rooms, setAvaliableRooms] = useState([]);
  useEffect(() => {
    getAvailableRooms();
  }, []);

  const history = useHistory();
  let match = useRouteMatch();

  const postJoiningCallback = newRoom => {
    newRoom.onMessage(function(message) {
      console.log(message);
    });
    setRoom(newRoom);
  };

  const createRoom = async () => {
    await client.create("my_room").then(postJoiningCallback);
    history.push(`${match.url}/player`);
  };

  const joinRoom = async id => {
    await client.joinById(id).then(postJoiningCallback);
    history.push(`${match.url}/player`);
  };

  const getAvailableRooms = () => {
    client
      .getAvailableRooms("my_room")
      .then(rooms => {
        setAvaliableRooms(rooms);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <Switch>
      <Route path={`${match.url}/player`}>
        <Play room={room} />
      </Route>
      <Route path={"/"}>
        <div>
          <button onClick={createRoom}>Create Room</button>
          <h2>Avaliable Rooms</h2>
          <button onClick={getAvailableRooms}>Refresh</button>
          <ul>
            {rooms.map(room => (
              <li>
                {room.roomId}
                <button onClick={() => joinRoom(room.roomId)}>Join</button>
              </li>
            ))}
          </ul>
        </div>
      </Route>
    </Switch>
  );
}

export default SecretHitler;

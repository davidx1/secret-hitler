import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Chance from "chance";

import Button from "../Play/components/Button";

const chance = new Chance();

export default function Lobby({ client, playUrl, setRoom }) {
  const [rooms, setAvaliableRooms] = useState([]);
  const [displayName, setDisplayName] = useState(chance.first());
  const history = useHistory();

  const makeNewName = () => {
    setDisplayName(chance.first());
  };

  const getAvailableRooms = () => {
    client
      .getAvailableRooms("my_room")
      .then((rooms) => {
        setAvaliableRooms(rooms);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const postJoiningCallback = (newRoom) => {
    console.log(newRoom);
    setRoom(newRoom);
    history.push(`${playUrl}/${newRoom.id}`);
  };

  const createRoom = async (displayName) => {
    await client.create("my_room", { displayName }).then(postJoiningCallback);
  };

  const joinRoom = async (id, displayName) => {
    await client.joinById(id, { displayName }).then(postJoiningCallback);
  };

  useEffect(() => {
    getAvailableRooms();
  }, [getAvailableRooms]);

  return (
    <div>
      <label>Display Name: </label>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      ></input>
      <Button onClick={makeNewName}>new</Button>
      <hr></hr>
      <Button onClick={() => createRoom(displayName)}>Create Room</Button>
      <h2>Avaliable Rooms</h2>
      <Button onClick={getAvailableRooms}>Refresh</Button>
      <ul>
        {rooms.map((room) => (
          <li>
            {room.roomId}
            <Button onClick={() => joinRoom(room.roomId, displayName)}>
              Join
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

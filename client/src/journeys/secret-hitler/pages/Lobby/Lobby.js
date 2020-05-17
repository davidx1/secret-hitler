import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Chance from "chance";

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
      <button onClick={makeNewName}>new</button>
      <hr></hr>
      <button onClick={() => createRoom(displayName)}>Create Room</button>
      <h2>Avaliable Rooms</h2>
      <button onClick={getAvailableRooms}>Refresh</button>
      <ul>
        {rooms.map((room) => (
          <li>
            {room.roomId}
            <button onClick={() => joinRoom(room.roomId, displayName)}>
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

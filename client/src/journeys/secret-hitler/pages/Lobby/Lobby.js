import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function Lobby({ client }) {
  const [rooms, setAvaliableRooms] = useState([]);
  let location = useRouteMatch();

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
    <div>
      <h2>Avaliable Rooms</h2>
      <button onClick={getAvailableRooms}>Refresh</button>
      <ul>
        {rooms.map(room => (
          <li>
            {room.roomId}{" "}
            <button>
              <Link to={`${location.url}${room.roomId}`}>Join</Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

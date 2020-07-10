import React, { useState } from "react";
import { Overlay, OverlayCross } from "../../../lib/Overlay";
import { Button } from "../../../lib/Button";
import { Input } from "../../../lib/Input";

export const JoinRoomModal = ({ closeModal, onRoomJoin }) => {
  const [displayName, setDisplayName] = useState("");
  const [roomId, setRoomId] = useState("");

  // const getAvailableRooms = () => {
  //   client
  //     .getAvailableRooms("my_room")
  //     .then((rooms) => {
  //       setAvaliableRooms(rooms);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  // useEffect(() => {
  //   getAvailableRooms();
  // }, []);
  return (
    <Overlay>
      {/* <h3>Availiable Games</h3>:
  <ul>
    {rooms.map((room) => (
      <li>
        {room.roomId}
        <Button onClick={() => joinRoom(room.roomId, displayName)}>
          Join
        </Button>
      </li>
    ))}
  </ul> */}
      <OverlayCross onClick={closeModal} />
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Game PIN"
      />
      <Input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Your Display Name"
      />
      <Button onClick={() => onRoomJoin(roomId, displayName)}>Join Room</Button>
    </Overlay>
  );
};

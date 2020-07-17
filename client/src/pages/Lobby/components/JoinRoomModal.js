import React, { useState } from "react";
import styled from "styled-components";
import { Overlay, OverlayCross } from "../../../lib/Overlay";
import { Button } from "../../../lib/Button";
import { Input } from "../../../lib/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const JoinRoomModal = ({ closeModal, onRoomJoin }) => {
  const [displayName, setDisplayName] = useState("");
  const [roomId, setRoomId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onRoomJoin(roomId, displayName);
  };

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
      <Form onSubmit={handleSubmit}>
        <Input
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Game PIN"
        />
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your Display Name"
        />
        <Button type="submit">Join Room</Button>
      </Form>
    </Overlay>
  );
};

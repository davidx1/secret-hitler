import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chance from "chance";

import { OptionCard, OptionWrapper } from "./components/OptionCard";
import { LogoImage } from "./components/LogoImage";
import { Overlay, OverlayCross } from "../../lib/Overlay";
import { Button } from "../../lib/Button";
import { Input } from "../../lib/Input";

const chance = new Chance();

const Wrapper = styled.div`
  height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media only screen and (min-width: 512px) {
    height: 100%;
  }
`;

export default function Lobby({ client, playUrl, setRoom }) {
  const [rooms, setAvaliableRooms] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

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
    <Wrapper>
      <LogoImage />
      <OptionWrapper>
        <OptionCard onClick={() => setIsNewRoomModalOpen(true)}>
          Create Game
        </OptionCard>
        <OptionCard onClick={() => setIsJoinRoomModalOpen(true)}>
          Join Game
        </OptionCard>
      </OptionWrapper>
      {isNewRoomModalOpen && (
        <Overlay>
          <OverlayCross onClick={() => setIsNewRoomModalOpen(false)} />

          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Display Name"
          />
          <Button onClick={() => createRoom(displayName)}>Create Room</Button>
        </Overlay>
      )}
      {isJoinRoomModalOpen && (
        <Overlay onClick={() => setIsJoinRoomModalOpen(false)}>
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
          <OverlayCross onClick={() => setIsJoinRoomModalOpen(false)} />
          <Input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
          />
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Display Name"
          />
          <Button onClick={() => joinRoom(roomId, displayName)}>
            Join Room
          </Button>
        </Overlay>
      )}
    </Wrapper>
  );
}

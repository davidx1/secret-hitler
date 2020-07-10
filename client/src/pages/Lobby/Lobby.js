import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chance from "chance";

import { Loader } from "../../lib/Loader";
import { OptionCard, OptionWrapper } from "./components/OptionCard";
import { LogoImage } from "./components/LogoImage";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { NewRoomModal } from "./components/NewRoomModal";

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
  // const [rooms, setAvaliableRooms] = useState([]);
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const postJoiningCallback = (newRoom) => {
    setRoom(newRoom);
    history.push(`${playUrl}/${newRoom.id}`);
  };

  const createRoom = async (displayName) => {
    setIsLoading(true);
    await client.create("my_room", { displayName }).then(postJoiningCallback);
  };

  const joinRoom = async (id, displayName) => {
    setIsLoading(true);
    await client.joinById(id, { displayName }).then(postJoiningCallback);
  };

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
        <NewRoomModal
          closeModal={() => setIsNewRoomModalOpen(false)}
          onRoomCreate={createRoom}
        />
      )}
      {isJoinRoomModalOpen && (
        <JoinRoomModal
          closeModal={() => setIsJoinRoomModalOpen(false)}
          onRoomJoin={joinRoom}
        />
      )}
      {isLoading && <Loader />}
    </Wrapper>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Dove } from "@styled-icons/fa-solid/Dove";
import { Skull } from "@styled-icons/fa-solid/Skull";

import { Loader } from "../../lib/Loader";
import { OptionCard, OptionWrapper } from "./components/OptionCard";
import { LogoImage } from "./components/LogoImage";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { NewRoomModal } from "./components/NewRoomModal";

const Wrapper = styled.div`
  height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media only screen and (min-width: 512px) {
    height: 100%;
  }
`;

const DoveIcon = styled(Dove)`
  position: absolute;
  color: ${({ theme }) => theme.white};
  height: 5%;
  top: 15px;
  left: 15px;
  @media only screen and (min-width: 768px) {
    top: 30px;
    left: 30px;
  }
`;

const DoveIcon2 = styled(DoveIcon)`
  top: unset;
  left: unset;
  bottom: 15px;
  right: 15px;
  @media only screen and (min-width: 768px) {
    top: unset;
    left: unset;
    bottom: 30px;
    right: 30px;
  }
`;

const SkullIcon = styled(Skull)`
  position: absolute;
  color: ${({ theme }) => theme.white};
  height: 5%;
  bottom: 15px;
  left: 15px;
  @media only screen and (min-width: 768px) {
    bottom: 30px;
    left: 30px;
  }
`;

const SkullIcon2 = styled(SkullIcon)`
  bottom: unset;
  left: unset;
  top: 15px;
  right: 15px;
  @media only screen and (min-width: 768px) {
    bottom: unset;
    left: unset;
    top: 30px;
    right: 30px;
  }
`;

const AboutWrapper = styled.ul`
  position: absolute;
  color: ${({ theme }) => theme.white};
  bottom: 10px;
  left: 0;
  right: 0;
  @media only screen and (min-width: 768px) {
    bottom: 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0 0;
  padding: 0;

  > li {
    list-style: none;
    font-size: 12px;
    color: ${({ theme }) => theme.white};
    text-align: center;
    margin-bottom: 3px;
    font-size: 10px;
    @media only screen and (min-width: 512px) {
      font-size: 12px;
    }
    @media only screen and (min-width: 1450px) {
      font-size: 18px;
    }
    > a {
      color: ${({ theme }) => theme.link};
    }
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
      <DoveIcon />
      <DoveIcon2 />
      <SkullIcon />
      <SkullIcon2 />
      <AboutWrapper>
        <li>
          Licensed under{" "}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY-NC-SA 4.0{" "}
          </a>
        </li>
        <li>
          Based on the hit boardgame{" "}
          <a href="https://www.secrethitler.com/">Secret Hitler</a>
        </li>
      </AboutWrapper>
    </Wrapper>
  );
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chance from "chance";

import { OptionCard, OptionWrapper } from "./components/OptionCard";
import { LogoImage } from "./components/LogoImage";

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
    <Wrapper>
      <LogoImage />
      <OptionWrapper>
        <OptionCard>Create Game</OptionCard>
        <OptionCard>Join Game</OptionCard>
      </OptionWrapper>
    </Wrapper>
  );
}

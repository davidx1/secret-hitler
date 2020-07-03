import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chance from "chance";

import { OptionCard } from "./components/OptionCard";
import logo from "../../img/Logo.jpg";

const chance = new Chance();

const OptionWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin-right: 48px;
  }

  & :last-child {
    margin: 0;
  }
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  width: 1000px;
  height: 700px;
  margin: 0 auto;
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
    <div>
      <LogoImg />
      <OptionWrapper>
        <OptionCard>Create Game</OptionCard>
        <OptionCard>Join Game</OptionCard>
      </OptionWrapper>
    </div>
  );
}

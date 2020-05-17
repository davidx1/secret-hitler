import React, { useContext } from "react";
import styled from "styled-components";

import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: white;
  line-height: 3;
  width: 200px;
`;

export const StartButton = () => {
  const { players } = useContext(StateContext);
  const { start } = useContext(ActionContext);

  const playerCount = players.length;
  return (
    <Wrapper>
      <Button onClick={start} disabled={playerCount < 5}>
        Start!
      </Button>
      {playerCount < 5 && <h3>Waiting for at least 5 players</h3>}
    </Wrapper>
  );
};

export const StartScreen = () => {
  const { players, youId } = useContext(StateContext);

  return (
    <StartScreenWrapper>
      <StartButton></StartButton>
      <WaitingPlayerListWrapper>
        {players.map((p) => {
          return (
            <Player
              displayName={p.displayName}
              isCurrentPlayer={p.id === youId}
              scale={1.51}
            ></Player>
          );
        })}
      </WaitingPlayerListWrapper>
    </StartScreenWrapper>
  );
};

const StartScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WaitingPlayerListWrapper = styled.div`
  display: flex;
  width: 60%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > * {
    padding-bottom: 20px;
    padding-right: 20px;
  }
`;

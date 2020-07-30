import React, { useContext } from "react";
import styled from "styled-components";

import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";
import { Button } from "../../../lib/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media only screen and (min-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const StartButton = () => {
  const { players, roomId } = useContext(StateContext);
  const { start } = useContext(ActionContext);

  const playerCount = players.length;
  return (
    <Wrapper>
      {playerCount < 5 ? (
        <h3>Waiting for at least 5 players</h3>
      ) : (
        <Button onClick={start} disabled={playerCount < 5}>
          Start!
        </Button>
      )}
      <p>
        Invite others to join via Game PIN: <b>{roomId}</b>
      </p>
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
              isActive={p.isActive}
              isDisconnected={p.isDisconnected}
              color={p.color}
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
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > * {
    margin-bottom: 5px;
    margin-right: 5px;
  }

  @media only screen and (min-width: 768px) {
    > * {
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
`;

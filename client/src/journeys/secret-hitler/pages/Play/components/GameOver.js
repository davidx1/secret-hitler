import React, { useContext } from "react";
import styled from "styled-components";
import { Player } from "./Player";
import { Overlay } from "./Overlay";
import { StateContext } from "../Play";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & > * {
    margin-bottom: 2%;
  }
`;

const Title = styled.h1`
  color: white;
`;
const FascistWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;
export const GameOver = ({ winner }) => {
  const { players, state, youId } = useContext(StateContext);

  const winners = players.filter((p) => {
    if (state === "fascistWin") {
      return p.role === "H" || p.role === "F";
    }
    if (state === "liberalWin") {
      return p.role === "L";
    }
    return [];
  });

  const losers = players.filter((p) => {
    if (state === "liberalWin") {
      return p.role === "H" || p.role === "F";
    }
    if (state === "fascistWin") {
      return p.role === "L";
    }
  });

  return (
    <Wrapper>
      <Title>Fascist Win</Title>
      <FascistWrapper>
        {winners.map((w) => (
          <Player
            displayName={w.displayName}
            scale={1.5}
            isCurrentPlayer={w.id === youId}
            currentPlayerRole="F"
            role={w.role}
          />
        ))}
      </FascistWrapper>
      <FascistWrapper>
        {losers.map((l) => (
          <Player
            displayName={l.displayName}
            scale={1.5}
            isCurrentPlayer={l.id === youId}
            currentPlayerRole="F"
            role={l.role}
          />
        ))}
      </FascistWrapper>
    </Wrapper>
  );
};

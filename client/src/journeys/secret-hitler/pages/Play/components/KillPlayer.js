import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "./Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";

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

export const KillPlayer = () => {
  const { players, youId } = useContext(StateContext);
  const { killPlayer } = useContext(ActionContext);
  return (
    <Wrapper>
      <InstructionText>Kill Player</InstructionText>
      {players.map((p, i) => (
        <Player
          displayName={p.displayName}
          isCurrentPlayer={false}
          scale={1.51}
          onClick={() => killPlayer(i)}
          isActive={p.isActive}
        ></Player>
      ))}
    </Wrapper>
  );
};

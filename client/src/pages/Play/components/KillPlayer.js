import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "./Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 16px;
`;

export const KillPlayer = () => {
  const { players, youInfo } = useContext(StateContext);
  const { killPlayer } = useContext(ActionContext);
  return (
    <Wrapper>
      <InstructionText>Select a player to kill</InstructionText>
      <PlayerWrapper>
        {players.map((p, i) => (
          <Player
            displayName={p.displayName}
            currentPlayerRole={youInfo.role}
            isCurrentPlayer={p.id === youInfo.id}
            role={p.role}
            scale={1.5}
            onClick={() => killPlayer(i)}
            isActive={p.isActive}
            selectable
          ></Player>
        ))}
      </PlayerWrapper>
    </Wrapper>
  );
};

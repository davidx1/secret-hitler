import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 16px;
`;

export const PresidentSelection = () => {
  const { players, youInfo } = useContext(StateContext);
  const { setNewPresident } = useContext(ActionContext);
  return (
    <Overlay>
      <InstructionText>Select Next President</InstructionText>
      <PlayerWrapper>
        {players.map((p, i) =>
          p.id !== youInfo.id && p.isActive ? (
            <Player
              displayName={p.displayName}
              isActive={true}
              currentPlayerRole={youInfo.role}
              isCurrentPlayer={false}
              role={p.role}
              scale={1}
              selectable={true}
              onClick={() => setNewPresident(i)}
              color={p.color}
            />
          ) : null
        )}
      </PlayerWrapper>
    </Overlay>
  );
};

import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText, RuleText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";

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
    <Overlay>
      <InstructionText>Execution</InstructionText>
      <RuleText>
        The President executes one player at the table. If that player is Hitler, the game ends in a
        Liberal victory. Otherwise the game carries on without revealing the executed player's identity.
      </RuleText>
      <PlayerWrapper>
        {players.map((p, i) =>
          p.isActive ? (
            <Player
              displayName={p.displayName}
              currentPlayerRole={youInfo.role}
              isCurrentPlayer={p.id === youInfo.id}
              role={p.role}
              scale={1.5}
              onClick={() => killPlayer(i)}
              isActive={p.isActive}
              isDisconnected={p.isDisconnected}
              selectable
              color={p.color}
            ></Player>
          ) : null
        )}
      </PlayerWrapper>
    </Overlay>
  );
};

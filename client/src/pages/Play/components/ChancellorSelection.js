import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay, InstructionText, RuleText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 32px;
`;

export const ChancellorSelection = () => {
  const { players, youInfo, prevPresidentIndex, prevChancellorIndex } = useContext(StateContext);
  const { selectChancellor } = useContext(ActionContext);

  const alivePlayerCount = players.filter((p) => p.isActive).length;
  const canPrevPresidentBeNominated = alivePlayerCount <= 5;

  return (
    <Overlay>
      <InstructionText>Nominate Chancellor</InstructionText>
      <PlayerWrapper>
        {players.map((p, i) =>
          p.id !== youInfo.id &&
          i !== prevChancellorIndex &&
          p.isActive &&
          (canPrevPresidentBeNominated || i !== prevPresidentIndex) ? (
            <Player
              displayName={p.displayName}
              isActive={true}
              isDisconnected={p.isDisconnected}
              currentPlayerRole={youInfo.role}
              isCurrentPlayer={false}
              role={p.role}
              scale={1}
              selectable={true}
              onClick={() => selectChancellor(i)}
              color={p.color}
            />
          ) : null
        )}
      </PlayerWrapper>
      <RuleText>
        The last elected President and Chancellor are “term-limited,” and ineligible to be nominated
        as Chancellor Candidate.If there are only five players left in the game, only the last
        elected Chancellor is ineligible to be Chancellor Candidate; the last President may be
        nominated.
      </RuleText>
    </Overlay>
  );
};

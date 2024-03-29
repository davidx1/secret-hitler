import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Overlay, InstructionText, RuleText } from "../../../lib/Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";
import { Button } from "../../../lib/Button";

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 16px;
`;

export const InvestigatePlayer = () => {
  const { players, youInfo } = useContext(StateContext);
  const { doneInvestigating } = useContext(ActionContext);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handlePlayerClick = (i) => {
    if (!selectedIndex) {
      setSelectedIndex(i);
    }
  };
  return (
    <Overlay>
      <InstructionText>Investigate Loyalty</InstructionText>
      <RuleText>The President chooses a player to investigate.</RuleText>
      <PlayerWrapper>
        {players
          .filter((p) => p.id !== youInfo.id)
          .map((p, i) => (
            <Player
              displayName={p.displayName}
              isActive={p.isActive}
              isDisconnected={p.isDisconnected}
              isCurrentPlayer={i === selectedIndex}
              role={i === selectedIndex && p.role}
              scale={1.25}
              selectable={selectedIndex === null}
              onClick={() => handlePlayerClick(i)}
              color={p.color}
            />
          ))}
      </PlayerWrapper>
      {selectedIndex !== null && <Button onClick={doneInvestigating}>Okay</Button>}
    </Overlay>
  );
};

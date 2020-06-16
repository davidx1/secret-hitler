import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Overlay, InstructionText } from "./Overlay";
import { StateContext, ActionContext } from "../Play";
import { Player } from "./Player";
import Button from "./Button";

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
    <Wrapper>
      <InstructionText>InvestigatePlayer</InstructionText>
      <PlayerWrapper>
        {players
          .filter((p) => p.id !== youInfo.id)
          .map((p, i) => (
            <Player
              displayName={p.displayName}
              isActive={true}
              isCurrentPlayer={i === selectedIndex}
              role={p.role}
              scale={1}
              selectable={selectedIndex === null}
              onClick={() => handlePlayerClick(i)}
            />
          ))}
      </PlayerWrapper>
      {selectedIndex !== null && (
        <Button onClick={doneInvestigating}>Okay</Button>
      )}
    </Wrapper>
  );
};

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

export const PresidentSelection = () => {
  const { players, youInfo } = useContext(StateContext);
  const { setNewPresident } = useContext(ActionContext);
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <Wrapper>
      <InstructionText>Select Next President</InstructionText>
      <PlayerWrapper>
        {players.map((p, i) =>
          p.id === youInfo.id ? null : (
            <Player
              displayName={p.displayName}
              isActive={true}
              isCurrentPlayer={i === selectedIndex}
              role={p.role}
              scale={1}
              selectable={selectedIndex === null}
              onClick={() => setNewPresident(i)}
            />
          )
        )}
      </PlayerWrapper>
    </Wrapper>
  );
};

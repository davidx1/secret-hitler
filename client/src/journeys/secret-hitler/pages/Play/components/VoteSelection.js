import React, { useContext } from "react";
import styled from "styled-components";
import ja from "../../../../../img/ja.png";
import nein from "../../../../../img/nein.png";
import { Player } from "./Player";
import { Overlay, InstructionText } from "./Overlay";
import { StateContext, ActionContext } from "../Play";

const Wrapper = styled(Overlay)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const VotesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;

  @media only screen and (min-width: 1200px) {
    width: 80%;
  }
`;

const Vote = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 5%;
  height: 80px;
  width: 120px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.8);
  }
  @media only screen and (min-width: 768px) {
    height: 100px;
    width: 150px;
  }
  @media only screen and (min-width: 992px) {
    height: 150px;
    width: 220px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: 175px;
    width: 260px;
  }
  @media only screen and (min-width: 1450px) {
    padding: 0;
    height: 250px;
    width: 370px;
  }
`;

export const VoteSelection = ({ displayName }) => {
  const { players, chancellorIndex, youId, youInfo } = useContext(StateContext);
  const { vote } = useContext(ActionContext);

  const p = players[chancellorIndex];

  return (
    <Wrapper>
      <InstructionText>{`Vote ${p.displayName} as Chancellor`}</InstructionText>

      <VotesWrapper>
        <Vote onClick={() => vote(true)} src={ja} />
        <Player
          displayName={p.displayName}
          scale={2}
          isCurrentPlayer={p.id === youId}
          currentPlayerRole={youInfo.role}
          role={p.role}
          isActive={p.isActive}
        />
        <Vote onClick={() => vote(false)} src={nein} />
      </VotesWrapper>
    </Wrapper>
  );
};

import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Player } from "./Player";
import { Overlay } from "../../../lib/Overlay";
import { StateContext } from "../Play";
import Button from "../../../lib/Button";

const Wrapper = styled(Overlay)`
  & > * {
    margin-bottom: 2%;
  }
`;

const Title = styled.h1`
  color: white;
`;

const Description = styled.p`
  color: white;
`;
const FascistWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;
export const GameOver = ({ winner }) => {
  const {
    players,
    state,
    youId,
    enactedFascistPolicies,
    enactedLiberalPolicies,
    chancellorIndex
  } = useContext(StateContext);
  const history = useHistory();

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
    } else {
      return p.role === "L";
    }
  });

  const title = state === "fascistWin" ? "Fascist Wins" : "Liberal Wins";

  let reason;

  if (state === "liberalWin") {
    if (enactedLiberalPolicies === 5) {
      reason = "Five liberal policies was enacted";
    } else if (!players.find((p) => p.role === "H").isActive) {
      reason = "Hitler was killed";
    } else {
      reason =
        "There may be a bug, liberal somehow won for no reason, contact developer";
    }
  } else if (state === "fascistWin") {
    if (enactedFascistPolicies === 6) {
      reason = "Six fascist policies was enacted";
    } else if (
      enactedFascistPolicies > 3 &&
      players[chancellorIndex].role === "H"
    ) {
      reason = "Hitler was elected chancellor";
    } else {
      reason =
        "There may be a bug, fascist somehow won for no reason, contact developer";
    }
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{reason}</Description>
      <FascistWrapper>
        {winners.map((w) => (
          <Player
            displayName={w.displayName}
            scale={1.25}
            isCurrentPlayer={w.id === youId}
            currentPlayerRole="F"
            role={w.role}
            isActive={true}
          />
        ))}
      </FascistWrapper>
      <FascistWrapper>
        {losers.map((l) => (
          <Player
            displayName={l.displayName}
            scale={1.25}
            isCurrentPlayer={l.id === youId}
            currentPlayerRole="F"
            role={l.role}
            isActive={true}
          />
        ))}
      </FascistWrapper>
      <Button onClick={() => history.push("/")}>Home</Button>
    </Wrapper>
  );
};

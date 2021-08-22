import React, { useContext } from "react";
import styled from "styled-components";
import { LibralBoard, FascistBoard } from "./Board";
import { HalfThePlayers } from "./HalfThePlayers";
import { PolicySelection } from "./PolicySelection";
import { VoteSelection } from "./VoteSelection";
import { ViewThreeCards } from "./ViewThreeCards";
import { InvestigatePlayer } from "./InvestigatePlayer";
import { KillPlayer } from "./KillPlayer";
import { PresidentSelection } from "./PresidentSelection";
import { ChancellorSelection } from "./ChancellorSelection";
import { GameOver } from "./GameOver";
import { StateContext, ActionContext } from "../Play";
import { Button } from "../../../lib/Button";
import { InteractionMenu } from "./InteractionMenu";
import { ElectionTracker } from "./ElectionTracker";
import { HandleVetoRequest } from "./HandleVetoRequest";

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px 0;

  @media only screen and (min-width: 768px) {
  }
  @media only screen and (min-width: 992px) {
    margin: 10px 0;
  }
  @media only screen and (min-width: 1200px) {
  }
`;

export const InprogressScreen = () => {
  const {
    state,
    youInfo,
    isYouPresident,
    isYouChancellor,
    players,
    vetoRequested,
    vetoApproved,
    interactionMenuTarget,
    electionTracker,
    drawPile,
    policiesInHand,
    enactedFascistPolicies,
    enactedLiberalPolicies,
  } = useContext(StateContext);

const allContext = useContext(StateContext);

  console.dir(allContext);

  const discardPileSize =
    17 -
    drawPile.length -
    policiesInHand.length -
    enactedFascistPolicies -
    enactedLiberalPolicies;

  const { revealVote } = useContext(ActionContext);
  return (
    <>
      <PlayerWrapper>
        <HalfThePlayers allPlayers={players} />
      </PlayerWrapper>
      <LibralBoard></LibralBoard>
      <MiddleWrapper>
        <Title>Draw: {drawPile.length}</Title>
        <ElectionTracker points={electionTracker} />
        <Title>Discard: {discardPileSize}</Title>
      </MiddleWrapper>
      {isYouPresident &&
        state === "election" &&
        players.filter((p) => typeof p.vote !== "boolean" && p.isActive).length === 0 && (
          <Button onClick={revealVote}>Reveal Vote</Button>
        )}
      <FascistBoard></FascistBoard>
      <PlayerWrapper>
        <HalfThePlayers allPlayers={players} secondHalf />
      </PlayerWrapper>
      {(state === "fascistWin" || state === "liberalWin") && <GameOver />}
      {youInfo.isActive && (
        <>
          {isYouPresident && state === "chancellorSelection" && <ChancellorSelection />}
          {isYouPresident && state === "enactPolicy" && vetoRequested && vetoApproved === null && (
            <HandleVetoRequest />
          )}
          {state === "election" && youInfo.vote === null && <VoteSelection />}
          {state === "filterCards" && isYouPresident && <PolicySelection />}
          {state === "enactPolicy" && isYouChancellor && <PolicySelection />}
          {isYouPresident && state === "viewThreeCards" && <ViewThreeCards />}
          {isYouPresident && state === "investigatePlayer" && <InvestigatePlayer />}
          {isYouPresident && state === "killPlayer" && <KillPlayer />}
          {isYouPresident && state === "presidentSelection" && <PresidentSelection />}
          {interactionMenuTarget !== undefined &&
            interactionMenuTarget !== null &&
            interactionMenuTarget !== -1 && <InteractionMenu />}
        </>
      )}
    </>
  );
};

const MiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 4px auto;
  > * {
    margin-right: 16px;
  }
`;

const Title = styled.p`
  font-size: 10px;

  @media only screen and (min-width: 768px) {
    display: block;
    font-size: 12px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 16px;
  }
  @media only screen and (min-width: 1450px) {
    font-size: 18px;
  }
`;

import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { ArrowCurveUpLeft } from "@styled-icons/fluentui-system-filled/ArrowCurveUpLeft";
import { ArrowCurveDownRight } from "@styled-icons/fluentui-system-filled/ArrowCurveDownRight";
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
  flex-direction: ${({ inverse }) => (inverse ? "row-reverse" : "row")};
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

const playerTurnArrowStyles = css`
  height: 100%;
  color: ${({ theme }) => theme.white};
  opacity: 0.5;
`;

const PlayerTurnDown = styled(ArrowCurveDownRight)`
  ${playerTurnArrowStyles}
`;
const PlayerTurnUp = styled(ArrowCurveUpLeft)`
  ${playerTurnArrowStyles}
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
    enactedLiberalPolicies
  } = useContext(StateContext);

  const allContext = useContext(StateContext);

  window.getAllContext = allContext;

  const discardPileSize =
    17 - drawPile.length - policiesInHand.length - enactedFascistPolicies - enactedLiberalPolicies;

  const { revealVote } = useContext(ActionContext);
  return (
    <>
      <PlayerWrapper>
        <HalfThePlayers allPlayers={players} />
      </PlayerWrapper>
      <LibralBoard></LibralBoard>
      <MiddleOuterWrapper>
        <PlayerTurnUp height={40}/>
        <MiddleWrapper>
          <Title>Draw: {drawPile.length}</Title>
          <ElectionTracker points={electionTracker} />
          <Title>Discard: {discardPileSize}</Title>
        </MiddleWrapper>
        <PlayerTurnDown height={40}/>
      </MiddleOuterWrapper>
      {isYouPresident &&
        state === "election" &&
        players.filter((p) => typeof p.vote !== "boolean" && p.isActive).length === 0 && (
          <Button onClick={revealVote}>Reveal Vote</Button>
        )}
      <FascistBoard></FascistBoard>
      <PlayerWrapper inverse>
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
  > * {
    margin-right: 16px;
  }
`;

const MiddleOuterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px;
  justify-content: space-between;
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

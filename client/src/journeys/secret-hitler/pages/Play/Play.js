import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"

import ja from "../../../../img/ja.png"
import nein from "../../../../img/nein.png"

import { LibralBoard, FascistBoard } from "./components/Board"
import { Player } from "./components/Player"
import { FullScreenButton } from "./components/FullScreenButton"
import { PolicySelection } from "./components/PolicySelection"
import { VoteSelection } from "./components/VoteSelection"

export default function Game({ room, setRoom, client }) {
  const [roomState, setState] = useState({
    state: "waiting",
    context: {
      players: [],
      board: [],
      drawPile: [],
      policiesInHand: [],
      prevPresidentIndex: null,
      prevChancellorIndex: null,
      presidentIndex: null,
      chancellorIndex: null,
      enactedLiberalPolicies: 0,
      enactedFascistPolicies: 0
    }
  })

  const {
    state,
    context: {
      players,
      board,
      drawPile,
      policies,
      prevPresidentIndex,
      prevChancellorIndex,
      presidentIndex,
      chancellorIndex,
      enactedLiberalPolicies,
      enactedFascistPolicies
    }
  } = roomState

  function trigger(name, payload = {}) {
    room.send({ "type": name, ...payload })
  }

  function start() {
    trigger("start")
  }

  function selectChancellor(i) {
    trigger("selectChancellor", { index: i })
  }

  const GameWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.black};
    margin: auto;
    width: 100%;
    height: 100%;
    padding: 10px 50px;
    justify-content: space-between;
    min-width: 1600px;
    min-width: 500px;
    @media only screen and (min-width: 768px) {
      padding: 5px 75px;
    }
    @media only screen and (min-width: 992px) {
    }
    @media only screen and (min-width: 1200px) {
      padding: 25px 100px;
    }
    @media only screen and (min-width: 1400px) {
      padding: 25px 150px;
    }
  `

  const PlayerSlot = styled.div`
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
  `

  const InteractionLayer = styled.div`
    position: absolute;
    height: 100%;
    background-color: #00000080;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
  `

  return (
    <GameWrapper>
      <FullScreenButton />
      <PlayerSlot>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
      </PlayerSlot>
      <LibralBoard></LibralBoard>
      <FascistBoard></FascistBoard>
      <PlayerSlot>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
        <Player roleToDisplay={"liberal"}></Player>
      </PlayerSlot>
      <InteractionLayer>
        {/* <VoteSelection /> */}
        <PolicySelection />
      </InteractionLayer>
    </GameWrapper>
  )
}

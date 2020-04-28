import React, { useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"

import { PlayWrapper } from "./components/PlayWrapper"
import { LibralBoard, FascistBoard } from "./components/Board"
import { Player } from "./components/Player"
import { FullScreenButton } from "./components/FullScreenButton"
import { PolicySelection } from "./components/PolicySelection"
import { VoteSelection } from "./components/VoteSelection"
import { StartButton } from "./components/StartButton"

export default function Game({ room, setRoom, client }) {
  const [youId, setYouId] = useState("1234")
  const [roomState, setState] = useState({
    state: "waiting",
    context: {
      players: [
        { id: "1234", displayName: "David" },
        { displayName: "Sumia" },
        { displayName: "Jonathan" },
        { displayName: "Joyce" }
      ],
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

  useLayoutEffect(() => {
    if (room) {
      setYouId(room.sessionId)
      room.onMessage(function (message) {
        console.log(message.type === "state")
        setState(message.payload)
      })
      return () => {
        console.log("leaving room")
        room.leave()
      }
    }
  }, [room])

  if (!room) {
    return <Redirect to="/secret-hitler" />
  }

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
    console.log("starting")
    trigger("start")
  }

  function selectChancellor(i) {
    trigger("selectChancellor", { index: i })
  }

  const HalfThePlayers = ({ allPlayers, secondHalf }) => {
    const halfWay = Math.ceil(allPlayers.length / 2)
    const start = !secondHalf ? 0 : halfWay
    const end = !secondHalf ? halfWay : allPlayers.length
    return (
      <>
        {allPlayers.slice(start, end).map((p, i) => {
          const realIndex = secondHalf ? i + halfWay : i

          return (
            <Player
              roleToDisplay={"liberal"}
              isPresident={realIndex === presidentIndex}
              selectable={players[presidentIndex].id === youId}
              isChancellor={realIndex === chancellorIndex}
              displayName={p.displayName}
              isCurrentPlayer={p.id === youId}
              scale={state === "waiting" ? 1.5 : 1}
            ></Player>
          )
        })}
      </>
    )
  }

  const StartScreenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  `

  const WaitingPlayerListWrapper = styled.div`
    display: flex;
    width: 60%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    > * {
      padding-bottom: 10px;
      padding-right: 10px;
    }
  `

  return (
    <PlayWrapper>
      <FullScreenButton />

      {state === "waiting" ? (
        <StartScreenWrapper>
          <StartButton onClick={start} playerCount={players.length}>
            Start
          </StartButton>
          <WaitingPlayerListWrapper>
            {players.map((p) => {
              return (
                <Player
                  displayName={p.displayName}
                  isCurrentPlayer={p.id === youId}
                  scale={1.51}
                ></Player>
              )
            })}
          </WaitingPlayerListWrapper>
        </StartScreenWrapper>
      ) : (
        <>
          <PlayerWrapper>
            <HalfThePlayers allPlayers={players} />
          </PlayerWrapper>
          <LibralBoard></LibralBoard>
          <FascistBoard></FascistBoard>
          <PlayerWrapper>
            <HalfThePlayers allPlayers={players} secondHalf />
          </PlayerWrapper>
          {/* <VoteSelection /> */}
          {/* <PolicySelection /> */}
        </>
      )}
    </PlayWrapper>
  )
}

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
`

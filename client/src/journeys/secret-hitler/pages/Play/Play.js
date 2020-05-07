import React, { useState, useLayoutEffect, createContext } from "react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import { PlayWrapper } from "./components/PlayWrapper"
import { LibralBoard, FascistBoard } from "./components/Board"
import { HalfThePlayers } from "./components/HalfThePlayers"
import { FullScreenButton } from "./components/FullScreenButton"
import { PolicySelection } from "./components/PolicySelection"
import { VoteSelection } from "./components/VoteSelection"
import { StartScreen } from "./components/StartScreen"
import { GameOver } from "./components/GameOver"

export const StateContext = createContext()
export const ActionContext = createContext()

export default function Game({ room, setRoom, client }) {
  const [youId, setYouId] = useState(1)
  const [roomState, setState] = useState()

  useLayoutEffect(() => {
    if (room) {
      setYouId(room.sessionId)
      room.onMessage(function (message) {
        console.log(message)
        console.log(message.type === "state")
        setState({ ...message.payload })
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

  if (!roomState) {
    return <span>Loading</span>
  }

  console.log(roomState)

  const {
    state,
    context: { players, presidentIndex, chancellorIndex }
  } = roomState

  const isYouPresident = _.get(players[presidentIndex], "id") === youId
  const isYouChancellor = _.get(players[chancellorIndex], "id") === youId
  const youInfo = players.find((p) => p.id === youId)

  /******** Actions that can be triggered **********/
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

  function vote(input) {
    trigger("vote", { id: youId, value: input })
  }

  function revealVote() {
    trigger("revealVote")
  }
  /***************************************************/

  return (
    <PlayWrapper>
      <FullScreenButton />
      <ActionContext.Provider
        value={{ start, selectChancellor, vote, revealVote }}
      >
        <StateContext.Provider
          value={{
            ...roomState.context,
            youId,
            youInfo,
            isYouPresident,
            isYouChancellor,
            state
          }}
        >
          {state === "waiting" ? (
            <StartScreen></StartScreen>
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
              {(state === "fascistWin" || state === "liberalWin") && (
                <GameOver />
              )}
              {state === "election" && youInfo.vote === null && (
                <VoteSelection />
              )}
              {state === "filterCards" && isYouPresident && <PolicySelection />}
              {state === "enactPolicy" && isYouChancellor && (
                <PolicySelection />
              )}
              {isYouPresident &&
                state === "election" &&
                players.filter((p) => typeof p.vote !== "boolean").length ===
                  0 && <button onClick={revealVote}>Reveal Vote</button>}
            </>
          )}
        </StateContext.Provider>
      </ActionContext.Provider>
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

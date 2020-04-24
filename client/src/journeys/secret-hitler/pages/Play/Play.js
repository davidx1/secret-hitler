import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import fascist from "../../../../img/fascist.png"
import liberal from "../../../../img/liberal.png"
import ja from "../../../../img/ja.png"
import nein from "../../../../img/nein.png"
import hitler from "../../../../img/hitler.png"

function toggleFullScreen() {
  var doc = window.document
  var docEl = doc.documentElement

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

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

  // useEffect(() => {
  //   if (room) {
  //     room.onMessage(function (message) {
  //       console.log(message)
  //       setState(message)
  //     })
  //     return () => {
  //       console.log("leaving room")
  //       room.leave()
  //     }
  //   }
  // }, [room])

  // if (!room) {
  //   return <h1>Loading</h1>
  // }

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
    padding: 25px 50px;
    justify-content: space-between;
    max-width: 1600px;
    min-width: 500px;
    @media only screen and (max-width: 1200px) {
      padding: 10px 50px;
    }
  `

  const PlayerSlot = styled.div`
    height: 20%;
    border: 1px solid green;
    display: flex;
    justify-content: space-around;
  `

  const PlayerImage = styled.img`
    height: 100%;
    position: absolute;
  `

  const PlayerLabel = styled.p`
    position: absolute;
    padding: 0 5px;
    line-height: 1.5;
    bottom: 0;
    left: 2px;
    text-align: center;
    background-color: #ffffffdd;
    @media only screen and (max-width: 1200px) {
      padding: 0;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 1023px) {
      padding: 0;
      margin-bottom: 0px;
      font-size: 10px;
    }
  `

  const PlayerWrapper = styled.div`
    position: relative;
    width: fit-content;
  `

  const Player = () => {
    return (
      <PlayerWrapper>
        <PlayerImage src={liberal}></PlayerImage>
        <PlayerLabel>Robbercopter</PlayerLabel>
      </PlayerWrapper>
    )
  }

  const Board = styled.div`
    width: 1000px;
    height: 25%;
    border: 10px solid;
    border-color: ${(props) => props.theme.black};
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    @media only screen and (max-width: 1365px) {
      height: 25%;
      width: 800px;
      border: 5px solid;
    }
    @media only screen and (max-width: 1023px) {
      width: 400px;
      border: 2px solid;
    }
  `
  const LibralBoard = styled(Board)`
    background-color: ${(props) => props.theme.blue_light};
  `

  const FascistBoard = styled(Board)`
    background-color: ${(props) => props.theme.orange_light};
  `
  const CardSlot = styled.div`
    height: 90%;
    width: 150px;
    border: 5px dotted;
    @media only screen and (max-width: 1199px) {
      width: 120px;
      border: 2px dotted;
    }
    @media only screen and (max-width: 1023px) {
      width: 50px;
      border: 2px dotted;
    }
  `

  const CardSlotLibral = styled(CardSlot)`
    border-color: ${(props) => props.theme.blue_dark};
  `

  const CardSlotFascist = styled(CardSlot)`
    border-color: ${(props) => props.theme.orange_dark};
  `

  const FullScreenButton = styled.button`
    position: absolute;
    left: 10px;
  `

  return (
    <GameWrapper>
      <FullScreenButton onClick={toggleFullScreen}>Fu</FullScreenButton>

      <PlayerSlot>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
      </PlayerSlot>
      <LibralBoard>
        <CardSlotLibral />
        <CardSlotLibral />
        <CardSlotLibral />
        <CardSlotLibral />
        <CardSlotLibral />
      </LibralBoard>
      <FascistBoard>
        <CardSlotFascist />
        <CardSlotFascist />
        <CardSlotFascist />
        <CardSlotFascist />
        <CardSlotFascist />
        <CardSlotFascist />
      </FascistBoard>
      <PlayerSlot>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
        <Player src={liberal}></Player>
      </PlayerSlot>
    </GameWrapper>
  )
}

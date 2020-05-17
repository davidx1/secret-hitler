import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ReactJson from "react-json-view"
import { useRoomState } from "../../useRoomState"

const AdminConsole = ({ client }) => {
  const [avaliableRooms, setAvaliableRooms] = useState([])
  const [joined, setJoined] = useState(false)
  const [room, setRoom] = useState()

  const joinRoom = async (roomId) => {
    setJoined(true)
    client.joinById(roomId, { displayName: "secret-admin" }).then((newRoom) => {
      setRoom(newRoom)
    })
  }

  const getAvailableRooms = () => {
    client
      .getAvailableRooms("my_room")
      .then((rooms) => {
        setAvaliableRooms(rooms)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    getAvailableRooms()
  }, [])

  const {
    state,
    context,
    playersToDisplay,
    isYouPresident,
    isYouChancellor,
    youInfo,
    start,
    selectChancellor,
    vote,
    revealVote,
    selectACardToRemove,
    enactAPolicy
  } = useRoomState(room, joinRoom)

  const Wrapper = styled.div`
    display: flex;
  `

  return (
    <div>
      <h1>Secret Headquarter1</h1>
      {!joined &&
        avaliableRooms.map((room) => (
          <li>
            {room.roomId}
            <button onClick={() => joinRoom(room.roomId)}>Join</button>
          </li>
        ))}
      {joined && (
        <Wrapper>
          <ReactJson src={state} />
        </Wrapper>
      )}
    </div>
  )
}
export default AdminConsole

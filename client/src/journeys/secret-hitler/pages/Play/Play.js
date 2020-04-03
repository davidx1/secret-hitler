import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

export default function Game({ room }) {
  const [state, setState] = useState([]);
  const [roomState, setRoomState] = useState();
  let { id } = useParams();

  useEffect(() => {
    if (room.state) {
      room.onMessage(function(message) {
        const newLine = `${message.id}: ${message.message}`;
        setState(state => [...state, newLine]);
      });

      room.onStateChange(newState => {
        console.log("state change");
        console.log(newState);
        setRoomState(state => ({
          ...state,
          ...newState,
        }));
      });

      return () => {
        console.log("leaving room");
        room.leave();
      };
    }
  }, [room]);

  const onClick = () => {
    room.send({ message: "Yo" });
  };

  if (!room || !state) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      {roomState ? (
        <>
          <h4>{id}</h4>
          <button onClick={onClick}>Yo</button>
          {Object.keys(roomState.players).map(p => (
            <h4>{roomState.players[p].displayName}</h4>
          ))}
          {state.map(s => (
            <p>{s}</p>
          ))}
        </>
      ) : (
        <h4>Loading</h4>
      )}
    </div>
  );
}

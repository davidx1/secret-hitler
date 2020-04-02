import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

export default function Game({ room }) {
  const [state, setState] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    if (room) {
      room.onMessage(function(message) {
        setState(state => [...state, message]);
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

  if (!room) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <h4>{id}</h4>
      <button onClick={onClick}>Yo</button>
      {state.map(s => (
        <p>{s}</p>
      ))}
    </div>
  );
}

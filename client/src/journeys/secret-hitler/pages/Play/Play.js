import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

export default function Game({ room }) {
  let { id } = useParams();

  useEffect(() => {
    return () => {
      if (room) {
        console.log("leaving room");
        room.leave();
      }
    };
  }, []);

  const onClick = () => {
    room.send({ message: "hi" });
  };

  if (!room) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <h4>{id}</h4>
      <button onClick={onClick}>Hi</button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import * as Colyseus from "colyseus.js";

const host = window.document.location.host.replace(/:.*/, "");
const location = window.location;
const client = new Colyseus.Client(
  location.protocol.replace("http", "ws") +
    "//" +
    host +
    (location.port ? ":" + 3001 : "")
);

const useRoom = () => {
  const [room, setRoom] = useState();

  useEffect(
    () =>
      client.joinOrCreate("my_room", { name: "bob" }).then(newRoom => {
        newRoom.onMessage(function(message) {
          console.log(message);
        });

        setRoom(newRoom);
      }),
    []
  );

  return { room };
};

function App() {
  const { room } = useRoom();

  const onClick = () => {
    room.send({ message: "left" });
  };

  const onClick2 = () => {
    room.send({ message: "right" });
  };

  return (
    <div>
      <button onClick={onClick}>Button</button>
      <button onClick={onClick2}>Button</button>
      <p>Hello world</p>
    </div>
  );
}

export default App;

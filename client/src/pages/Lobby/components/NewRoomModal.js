import React, { useState } from "react";
import { Overlay, OverlayCross } from "../../../lib/Overlay";
import { Button } from "../../../lib/Button";
import { Input } from "../../../lib/Input";

export const NewRoomModal = ({ closeModal, onRoomCreate }) => {
  const [displayName, setDisplayName] = useState("");

  return (
    <Overlay>
      <OverlayCross onClick={closeModal} />

      <Input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Your Display Name"
      />
      <Button onClick={() => onRoomCreate(displayName)}>Create Room</Button>
    </Overlay>
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import { Overlay, OverlayCross } from "../../../lib/Overlay";
import { Button } from "../../../lib/Button";
import { Input } from "../../../lib/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const NewRoomModal = ({ closeModal, onRoomCreate }) => {
  const [displayName, setDisplayName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onRoomCreate(displayName);
  };

  return (
    <Overlay>
      <Form onSubmit={handleFormSubmit}>
        <OverlayCross onClick={closeModal} />

        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your Display Name"
        />
        <Button type="submit">Create Room</Button>
      </Form>
    </Overlay>
  );
};

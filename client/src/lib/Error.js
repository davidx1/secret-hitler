import React from "react";
import { Sad } from "@styled-icons/boxicons-regular/Sad";

import { Overlay, OverlayCross } from "./Overlay";

export const Error = ({ closeModal }) => {
  return (
    <Overlay>
      <OverlayCross onClick={closeModal} />
      <Sad height={80} width={80} color="white" />
      <p style={{ color: "white" }}>
        Something went wrong, please try again later
      </p>
    </Overlay>
  );
};

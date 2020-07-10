import React from "react";
import ReactLoading from "react-loading";

import { Overlay } from "./Overlay";

export const Loader = () => {
  return (
    <Overlay>
      <ReactLoading
        type={"spinningBubbles"}
        color="#fff"
        height={80}
        width={80}
      />
    </Overlay>
  );
};

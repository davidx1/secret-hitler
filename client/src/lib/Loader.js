import React from "react";
import ReactLoading from "react-loading";

import { Overlay } from "./Overlay";

export const Loader = () => {
  return (
    <Overlay>
      <ReactLoading type={"SpinningBubbles"} color="#fff" />
    </Overlay>
  );
};

import React from "react";
import { ElectionTracker } from "../../Play/components/ElectionTracker";

export default {
  title: "Election Tracker",
  component: ElectionTracker
};

export const None = () => {
  return <ElectionTracker points={0} />;
};

export const One = () => {
  return <ElectionTracker points={1} />;
};

export const Two = () => {
  return <ElectionTracker points={2} />;
};

export const Three = () => {
  return <ElectionTracker points={3} />;
};

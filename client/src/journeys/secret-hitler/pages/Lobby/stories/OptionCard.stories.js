import React from "react";
import { OptionCard } from "../components/OptionCard";

export default {
  title: "OptionCard",
  component: OptionCard
};

export const Default = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <OptionCard>Hello World</OptionCard>
      <OptionCard>Hello World</OptionCard>
    </div>
  );
};

import styled from "styled-components";
import React from "react";
import { PolicyFascist, PolicyLiberal } from "./Policy";

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-color: ${(props) => props.theme.black};
  box-sizing: border-box;
  margin: 0 auto;
  width: 300px;
  height: 25%;
  border-width: 1px;
  border-style: solid;

  @media only screen and (min-width: 512px) {
    width: 400px;
  }

  @media only screen and (min-width: 768px) {
    height: 25%;
    width: 400px;
    border-width: 2px;
  }
  @media only screen and (min-width: 992px) {
    height: 25%;
    width: 800px;
    border-width: 5px;
  }
  @media only screen and (min-width: 1200px) {
    width: 800px;
    border-width: 8px;
  }
  @media only screen and (min-width: 1450px) {
    width: 1100px;
    border-width: 10px;
  }
`;

const CardSlot = styled.div`
  height: 90%;
  width: 40px;
  border-width: 2px;
  border-style: dotted;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 512px) {
    width: 50px;
  }

  @media only screen and (min-width: 768px) {
    width: 50px;
  }
  @media only screen and (min-width: 992px) {
    width: 120px;
    border-width: 3px;
  }
  @media only screen and (min-width: 1200px) {
  }
  @media only screen and (min-width: 1450px) {
    width: 150px;
    border-width: 5px;
  }
`;

const CardSlotLibral = styled(CardSlot)`
  border-color: ${(props) => props.theme.blue_dark};
`;

const CardSlotFascist = styled(CardSlot)`
  border-color: ${(props) => props.theme.orange_dark};
`;

const LibralBoardBackground = styled(Board)`
  background-color: ${(props) => props.theme.blue_light};
`;

const FascistBoardBackground = styled(Board)`
  background-color: ${(props) => props.theme.orange_light};
`;

export const LibralBoard = () => (
  <LibralBoardBackground>
    <CardSlotLibral>
      <PolicyLiberal />
    </CardSlotLibral>
    <CardSlotLibral />
    <CardSlotLibral />
    <CardSlotLibral />
    <CardSlotLibral />
  </LibralBoardBackground>
);

export const FascistBoard = () => (
  <FascistBoardBackground>
    <CardSlotFascist>
      <PolicyFascist />
    </CardSlotFascist>
    <CardSlotFascist>
      <PolicyFascist />
    </CardSlotFascist>
    <CardSlotFascist />
    <CardSlotFascist />
    <CardSlotFascist />
    <CardSlotFascist />
  </FascistBoardBackground>
);

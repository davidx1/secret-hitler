import styled from "styled-components";
import React, { useContext } from "react";
import { PolicyFascist, PolicyLiberal } from "./Policy";
import { StateContext } from "../Play";

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-color: ${(props) => props.theme.black};
  box-sizing: border-box;
  margin: 0 auto;
  width: 300px;
  height: 25%;
  min-height: fit-content;
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
  }
  @media only screen and (min-width: 1450px) {
    width: 1100px;
    border-width: 8px;
  }
`;

const CardSlot = styled.div`
  height: 90%;
  width: 40px;
  min-height: 60px;
  border-width: 2px;
  border-style: dotted;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 512px) {
    width: 50px;
    min-height: 60px;
  }

  @media only screen and (min-width: 768px) {
    width: 50px;
    min-height: 60px;
  }
  @media only screen and (min-width: 992px) {
    width: 120px;
    min-height: 120px;

    border-width: 3px;
  }
  @media only screen and (min-width: 1200px) {
  }
  @media only screen and (min-width: 1450px) {
    width: 130px;
    min-height: 150px;

    border-width: px;
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

export const LibralBoard = () => {
  const { enactedLiberalPolicies } = useContext(StateContext);

  const liberalSlots = [];
  for (var i = 0; i < 5; i++) {
    liberalSlots.push(
      <CardSlotLibral>
        {i < enactedLiberalPolicies && <PolicyLiberal />}
      </CardSlotLibral>
    );
  }

  return <LibralBoardBackground>{liberalSlots}</LibralBoardBackground>;
};

export const FascistBoard = () => {
  const { board, enactedFascistPolicies } = useContext(StateContext);

  return (
    <FascistBoardBackground>
      {board.map((b, i) => (
        <CardSlotFascist>
          {i < enactedFascistPolicies ? <PolicyFascist /> : <p>{b}</p>}
        </CardSlotFascist>
      ))}
    </FascistBoardBackground>
  );
};

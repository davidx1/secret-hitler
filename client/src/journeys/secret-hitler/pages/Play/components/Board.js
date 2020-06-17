import styled, { css } from "styled-components";
import React, { useContext } from "react";
import { PolicyFascist, PolicyLiberal } from "./Policy";
import { StateContext } from "../Play";
import { Skull } from "@styled-icons/fa-solid/Skull";
import { Menu } from "@styled-icons/evaicons-solid/Menu";
import { UserSolidSquare } from "@styled-icons/zondicons/UserSolidSquare";
import { MagnifyingGlass } from "@styled-icons/entypo/MagnifyingGlass";

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-color: ${(props) => props.theme.black};
  box-sizing: border-box;
  margin: 0 auto;
  width: 300px;
  height: 20%;
  min-height: fit-content;
  border-width: 1px;
  border-style: solid;

  @media only screen and (min-width: 512px) {
    width: 450px;
  }

  @media only screen and (min-width: 768px) {
    height: 25%;
    width: 500px;
    border-width: 1px;
  }
  @media only screen and (min-width: 992px) {
    height: 25%;
    width: 800px;
    border-width: 3px;
  }
  @media only screen and (min-width: 1200px) {
    width: 800px;
  }
  @media only screen and (min-width: 1450px) {
    width: 1100px;
    border-width: 4px;
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
    width: 60px;
    min-height: 50px;
  }

  @media only screen and (min-width: 768px) {
    width: 60px;
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

const iconStyle = css`
  width: 50%;
  color: white;
  margin-bottom: 8px;
`;

const KillPlayerIcon = styled(Skull)`
  ${iconStyle}
`;

const InvestigatePlayerIcon = styled(MagnifyingGlass)`
  ${iconStyle}
`;

const PickNextPresidentIcon = styled(UserSolidSquare)`
  ${iconStyle}
`;

const TopThreeCardIcon = styled(Menu)`
  ${iconStyle}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Description = styled.p`
  color: white;
  font-size: 12px;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 12px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 16px;
  }
  @media only screen and (min-width: 1450px) {
    font-size: 18px;
  }
`;

const IconText = ({ abilityType }) => {
  switch (abilityType) {
    case "KILL_PLAYER":
      return (
        <Wrapper>
          <KillPlayerIcon />
          <Description>Kill player</Description>
        </Wrapper>
      );
    case "TOP_THREE_CARD":
      return (
        <Wrapper>
          <TopThreeCardIcon />
          <Description>See 3 cards</Description>
        </Wrapper>
      );
    case "INVESTIGATE":
      return (
        <Wrapper>
          <InvestigatePlayerIcon />
          <Description>Investigate</Description>
        </Wrapper>
      );
    case "PICK_NEXT_PRESIDENT":
      return (
        <Wrapper>
          <PickNextPresidentIcon />
          <Description>Pick president</Description>
        </Wrapper>
      );
    default:
      return false;
  }
};

export const FascistBoard = () => {
  const { board, enactedFascistPolicies } = useContext(StateContext);

  return (
    <FascistBoardBackground>
      {board.map((b, i) => (
        <CardSlotFascist>
          {i < enactedFascistPolicies ? (
            <PolicyFascist />
          ) : (
            <IconText abilityType={b} />
          )}
        </CardSlotFascist>
      ))}
    </FascistBoardBackground>
  );
};

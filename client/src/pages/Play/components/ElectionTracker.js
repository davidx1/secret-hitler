import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { RadioButtonOff } from "@styled-icons/ionicons-outline/RadioButtonOff";
import { RadioButtonOn } from "@styled-icons/ionicons-outline/RadioButtonOn";
import { ChevronsRight } from "@styled-icons/boxicons-regular/ChevronsRight";

const Title = styled.p`
  margin: 0;
  font-size: 10px;

  @media only screen and (min-width: 768px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: min-content;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  width: fit-content;
  padding: 0 15px;
  margin: 0 auto;

  color: ${({ points }) =>
    points === 3 ? "black" : points ? "orange" : "lightgray"};
`;

const iconStyle = css`
  width: 16px;
  height: 16px;
  @media only screen and (min-width: 768px) {
  }
  @media only screen and (min-width: 992px) {
  }
  @media only screen and (min-width: 1200px) {
  }
  @media only screen and (min-width: 1450px) {
  }
`;

const Off = styled(RadioButtonOff)`
  ${iconStyle}
`;

const On = styled(RadioButtonOn)`
  ${iconStyle}
`;

const Down = styled(ChevronsRight)`
  ${iconStyle}
`;

const Radio = ({ on, points }) => {
  return on ? <On points={points} /> : <Off points={points} />;
};

export const ElectionTracker = ({ points }) => {
  return (
    <Wrapper points={points}>
      <Title>
        Failed Elections <Radio on={points >= 1} />
        <Down />
        <Radio on={points >= 2} />
        <Down />
        <Radio on={points >= 3} />
      </Title>
    </Wrapper>
  );
};

// export const ElectionTracker = () => {
//   return <h1> Hello World</h1>;
// };

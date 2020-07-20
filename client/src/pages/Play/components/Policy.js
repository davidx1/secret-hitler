import React from "react";
import styled from "styled-components";
import policyf from "../../../img/policy-f.png";
import policyl from "../../../img/policy-l.png";

const PolicyImage = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 15%;
  border: none;
  cursor: ${({ selectable }) => (selectable ? "pointer" : "auto")};
  height: ${(props) => props.scale * 32}px;
  width: ${(props) => props.scale * 32}px;
  outline: none;
  padding: 0;
  margin: 0;

  @media only screen and (min-width: 512px) {
    height: ${(props) => props.scale * 40}px;
    width: ${(props) => props.scale * 40}px;
  }
  @media only screen and (min-width: 768px) {
    height: ${(props) => props.scale * 50}px;
    width: ${(props) => props.scale * 40}px;
  }
  @media only screen and (min-width: 992px) {
    height: ${(props) => props.scale * 12}0px;
    width: ${(props) => props.scale * 10}0px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: ${(props) => props.scale * 12}0px;
    width: ${(props) => props.scale * 10}0px;
  }
  @media only screen and (min-width: 1450px) {
    padding: 0;
    height: ${(props) => props.scale * 15}0px;
    width: ${(props) => props.scale * 12}0px;
  }
`;

export const PolicyFascist = ({ scale = 1, selectable, ...props }) => {
  return (
    <PolicyImage
      src={policyf}
      scale={scale}
      disabled={!selectable}
      selectable={selectable}
      {...props}
    />
  );
};

export const PolicyLiberal = ({ scale = 1, selectable, ...props }) => {
  return (
    <PolicyImage
      src={policyl}
      scale={scale}
      disabled={!selectable}
      selectable={selectable}
      {...props}
    />
  );
};

export const Policy = ({ variation, scale = 1, ...props }) => {
  return variation === "F" ? (
    <PolicyFascist scale={scale} {...props} />
  ) : (
    <PolicyLiberal scale={scale} {...props} />
  );
};

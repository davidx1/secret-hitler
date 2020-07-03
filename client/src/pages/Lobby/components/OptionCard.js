import React from "react";
import styled from "styled-components";

export const OptionCard = styled.button`
  width: 280px;
  height: 175px;
  cursor: pointer;
  background-color: #fbb969;
  border: 10px solid #4f0d00;
  border-radius: 20px;
  font-size: 24px;

  &:hover {
    background-color: red;
  }

  @media only screen and (min-width: 768px) {
    width: 364px;
    height: 200px;
    font-size: 24px;
    border-radius: 24px;
  }
  @media only screen and (min-width: 992px) {
    width: 400px;
    height: 240px;
    font-size: 32px;
    border-radius: 28px;
  }
  @media only screen and (min-width: 1200px) {
    width: 450px;
    height: 240px;
    font-size: 32px;
    border-radius: 32px;
  }
  @media only screen and (min-width: 1450px) {
    width: 550px;
    height: 300px;
    font-size: 48px;
    border-radius: 48px;
  }
`;

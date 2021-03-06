import styled from "styled-components";

import logo from "../../../img/logo.png";

export const LogoImage = styled.div`
  background-image: url(${logo});
  background-position-x: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 300px;
  height: 200px;
  margin: 0px auto;

  @media only screen and (min-width: 512px) {
    width: 450px;
  }

  @media only screen and (min-width: 768px) {
    width: 500px;
    height: 280px;
  }
  @media only screen and (min-width: 992px) {
    width: 800px;
    height: 320px;
  }
  @media only screen and (min-width: 1200px) {
    width: 1000px;
    height: 350px;
  }
  @media only screen and (min-width: 1450px) {
    width: 1200px;
    height: 480px;
  }
`;

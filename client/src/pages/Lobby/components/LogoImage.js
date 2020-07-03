import styled from "styled-components";

import logo from "../../../img/logo.png";

export const LogoImage = styled.div`
  background-image: url(${logo});
  background-position-x: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 320px;
  height: 250px;
  margin: 10px auto;

  @media only screen and (min-width: 512px) {
    width: 400px;
    height: 300px;
    margin: 10px auto;
  }

  @media only screen and (min-width: 768px) {
    width: 590px;
    height: 350px;
    margin: 10px auto;
  }
  @media only screen and (min-width: 992px) {
    width: 800px;
    height: 380px;
    margin: 10px auto;
  }
  @media only screen and (min-width: 1200px) {
    width: 1000px;
    height: 400px;
    margin: 10px auto;
  }
  @media only screen and (min-width: 1450px) {
    width: 1200px;
    height: 530px;
    margin: 10px auto;
  }
`;
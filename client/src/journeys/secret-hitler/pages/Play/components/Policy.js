import React from "react"
import styled from "styled-components"
import policyf from "../../../../../img/policy-f.png"
import policyl from "../../../../../img/policy-l.png"

const PolicyImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  height: ${(props) => props.scale * 50}px;
  width: ${(props) => props.scale * 40}px;
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
  @media only screen and (min-width: 1400px) {
    padding: 0;
    height: ${(props) => props.scale * 15}0px;
    width: ${(props) => props.scale * 12}0px;
  }
`

export const Policy_Fascist = ({ scale }) => {
  return <PolicyImage src={policyf} scale={scale} />
}

export const Policy_Liberal = ({ scale }) => {
  return <PolicyImage src={policyl} scale={scale} />
}

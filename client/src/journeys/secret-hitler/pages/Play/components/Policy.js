import React from "react"
import styled from "styled-components"
import policyf from "../../../../../img/policy-f.png"
import policyl from "../../../../../img/policy-l.png"

const PolicyImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  height: 50px;
  width: 40px;
  @media only screen and (min-width: 768px) {
    height: 50px;
    width: 40px;
  }
  @media only screen and (min-width: 992px) {
    height: 120px;
    width: 100px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
    height: 120px;
    width: 100px;
  }
  @media only screen and (min-width: 1400px) {
    padding: 0;
    height: 150px;
    width: 120px;
  }
`

export const Policy_Fascist = () => {
  return <PolicyImage src={policyf} />
}

export const Policy_Liberal = () => {
  return <PolicyImage src={policyl} />
}

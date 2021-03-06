import React from 'react';
import styled, { keyframes } from 'styled-components';

const Icon = styled.svg.attrs({
  fill: "none",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
})``;

const rotate = keyframes`
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Svg = styled(Icon)`
  width: 24px;
  height: 24px;

  animation: ${rotate} 3s linear infinite;
`;

const Loader = () => {
  return (
    <Svg>
      <path opacity="0.2" d="M11.9998 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.7" d="M11.9998 18V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.92969 4.93005L7.75969 7.76005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.6" d="M16.2397 16.24L19.0697 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.9" d="M1.99976 12H5.99976" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M17.9998 12H21.9998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.8" d="M4.92969 19.07L7.75969 16.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.3" d="M16.2397 7.76005L19.0697 4.93005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Loader;

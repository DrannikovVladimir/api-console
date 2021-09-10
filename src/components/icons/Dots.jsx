import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 6 18',
  fill: 'none',
})``;

const Svg = styled(Icon)`
  width: 6px;
  height: 18px;
`;

const Dots = () => {
  return (
    <Svg>
      <g clipPath="url(#clip0)">
          <circle cx="3" cy="2" r="2" fill="black" fillOpacity="0.2"/>
          <circle cx="3" cy="9" r="2" fill="black" fillOpacity="0.2"/>
          <circle cx="3" cy="16" r="2" fill="black" fillOpacity="0.2"/>
      </g>
      <defs>
          <clipPath id="clip0">
              <rect x="0" width="6" height="18" fill="white"/>
          </clipPath>
      </defs>
    </Svg>
  );
};

export default Dots;

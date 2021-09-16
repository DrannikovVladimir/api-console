import React from 'react';
import styled from 'styled-components';

import colors from '../constants/colors';

const ButtonStyled = styled.button.attrs({
  type: "submit",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 110px;
  min-height: 40px;
  border: none;
  border-radius: 5px;

  font-weight: 50;
  font-size: 16px;
  text-align: center;
  color: ${colors.primeColor};

  background: linear-gradient(180deg, ${colors.focusActiveColor} 0%, ${colors.activeColor} 100%),
    linear-gradient(0deg, ${colors.gradientColor}, ${colors.gradientColor});

  cursor: pointer;

  &:hover {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
      linear-gradient(180deg, ${colors.focusActiveColor} 0%, ${colors.activeColor} 100%),
      linear-gradient(0deg, ${colors.gradientColor}, ${colors.gradientColor});
  }

  &:active {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      linear-gradient(180deg, ${colors.focusActiveColor} 0%, ${colors.activeColor} 100%),
      linear-gradient(0deg, ${colors.gradientColor}, ${colors.gradientColor});
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.focusActiveColor};
  }

  &:disabled {
    background: #C4C4C4;
  }
`;

const Button = ({children, formName, disabled}) => {
  return (
    <ButtonStyled form={formName} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;

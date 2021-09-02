import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  min-width: 110px;
  min-height: 40px;
  border: none;
  border-radius: 5px;

  font-weight: 50;
  font-size: 16px;
  text-align: center;
  color: #FFFFFF;

  background: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%),
    linear-gradient(0deg, #C4C4C4, #C4C4C4);

  cursor: pointer;

  &:hover {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
      linear-gradient(180deg, #45A6FF 0%, #0055FB 100%),
      linear-gradient(0deg, #C4C4C4, #C4C4C4);
  }

  &:active {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      linear-gradient(180deg, #45A6FF 0%, #0055FB 100%),
      linear-gradient(0deg, #C4C4C4, #C4C4C4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #45A5FF
  }

  &:disabled {
    background: #C4C4C4;
  }
`;

const Button = ({children}) => {
  return (
    <ButtonStyled type="submit">{children}</ButtonStyled>
  );
};

export default Button;

import React from 'react';
import styled from 'styled-components';

import Button from './Button.jsx';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  background-color: #FFFFFF;
`;

const LinkGithub = styled.a`
  position: relative;
  display: block;

  font-size: 16px;
  line-height: 20px;
  color: #999999;
  text-decoration: none;

&:before, &:after {
  content: '';
  position: absolute;
  width: 0%;
  height: 1px;
  bottom: 0;
  margin-top: -0.5px;
  background: #999999;
}

&:before {
  left: -2.5px;
}
&:after {
  right: 2.5px;
  background: #999999;
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

&:hover:before {
  background: #999999;
  width: 100%;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

&:hover:after {
  background: transparent;
  width: 100%;
  transition: 0s;
}

&:active {
  color: #666666;
}
`;

const ButtonFormat = styled.button`
  position: relative;

  padding-top: 10px;
  padding-left: 7px;
  padding-bottom: 10px;
  padding-left: 40px;
  border: 2px solid transparent;
  border-radius: 10px;

  font-size: 16px;
  line-height: 20px;

  background-color: transparent;

  cursor: pointer;

  &::before {
    content: '';

    position: absolute;
    top: 7px;
    left: 8px;

    width: 24px;
    height: 24px;

    background-image: url('/icons/format.svg');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 0 0;
  }

  &:hover {
    color: #0055FB;

    &::before {
      background-image: url('/icons/format-hover.svg');
    }
  }

  &:focus {
    outline: none;
    color: #0055FB;
    border-color: rgba(69, 165, 255, 0.5);

    &::before {
      background-image: url('/icons/format-hover.svg');
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Button>Отправить</Button>
      <LinkGithub href="https://github.com/DrannikovVladimir">@link-to-my-github</LinkGithub>
      <ButtonFormat>Форматировать</ButtonFormat>
    </FooterContainer>
  )
};

export default Footer;

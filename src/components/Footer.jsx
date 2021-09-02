import React from 'react';
import styled from 'styled-components';

import Button from './Button.jsx';
import Format from './icons/Format.jsx'

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 15px; */
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

&:focus {
  outline: none;
  color: #333333;
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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 166px;
  padding: 4px;
  border: 2px solid transparent;
  border-radius: 10px;

  font-size: 16px;
  line-height: 20px;

  background-color: transparent;

  color: #0D0D0D;
  cursor: pointer;

  &:hover {
    color: #0055FB;
  }

  &:focus {
    outline: none;
    color: #0055FB;
    border-color: rgba(69, 165, 255, 0.5);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Button>Отправить</Button>
      <LinkGithub href="https://github.com/DrannikovVladimir">@link-to-my-github</LinkGithub>
      <ButtonFormat>
        <Format />
        Форматировать
      </ButtonFormat>
    </FooterContainer>
  )
};

export default Footer;

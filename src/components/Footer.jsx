import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import Button from './Button.jsx';
import Format from './icons/Format.jsx'
import { formatRequest } from '../store/slices/requestSlice';
import { valueSelector } from '../store/slices/selectors.js';

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

const ButtonFormat = styled.button.attrs({
  type: 'button',
})`
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

const ButtonSubmit = styled(Button).attrs(props => ({
  form: "formConsole",
}))
``;

const Footer = () => {
  const dispatch = useDispatch();
  const value = useSelector(valueSelector);

  const handleFormat = () => {
    dispatch(formatRequest({value}));
  };

  return (
    <FooterContainer>
      <ButtonSubmit formName="formConsole">Отправить</ButtonSubmit>
      <LinkGithub href="https://github.com/DrannikovVladimir" target="_blank">@link-to-my-github</LinkGithub>
      <ButtonFormat onClick={handleFormat}>
        <Format />
        Форматировать
      </ButtonFormat>
    </FooterContainer>
  )
};

export default Footer;

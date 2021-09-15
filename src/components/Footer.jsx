import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import Button from './Button.jsx';
import Format from './icons/Format.jsx'
import { formatRequest } from '../store/slices/requestSlice';
import { valueSelector } from '../store/slices/selectors.js';
import text from '../constants/locales';
import colors from '../constants/colors';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px;
  border-top: 1px solid ${colors.borderColor};

  background-color: ${colors.primeColor};
`;

const LinkGithub = styled.a`
  position: relative;
  display: block;

  font-size: 16px;
  line-height: 20px;
  color: ${colors.linkColor};
  text-decoration: none;

&:before, &:after {
  content: '';
  position: absolute;
  width: 0%;
  height: 1px;
  bottom: 0;
  margin-top: -0.5px;
  background: ${colors.linkColor};
}

&:before {
  left: -2.5px;
}
&:after {
  right: 2.5px;
  background: ${colors.linkColor};
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

&:focus {
  outline: none;
  color: #333333;
}

&:hover:before {
  background: ${colors.linkColor};
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

  color: ${colors.textColor};
  cursor: pointer;

  &:hover {
    color: ${colors.activeColor};
  }

  &:focus {
    outline: none;
    color: ${colors.activeColor};
    border-color: ${colors.focusActiveColor};
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
      <ButtonSubmit formName="formConsole">{text.console.buttonSubmit}</ButtonSubmit>
      <LinkGithub href="https://github.com/DrannikovVladimir" target="_blank">{text.console.githubLink}</LinkGithub>
      <ButtonFormat onClick={handleFormat}>
        <Format />
        {text.console.buttonFormatting}
      </ButtonFormat>
    </FooterContainer>
  )
};

export default Footer;

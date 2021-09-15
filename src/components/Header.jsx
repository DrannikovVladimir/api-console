import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {logout} from '../store/actions/auth';
import FullscreenOpen from './icons/FullscreenOpen.jsx';
import FullscreenClose from './icons/FullscreenClose';
import {loginSelector, subloginSelector} from '../store/slices/selectors.js';
import text from '../constants/locales';
import colors from '../constants/colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid ${colors.borderColor};

  background-color: ${colors.secondaryColor};
;
`;

const Title = styled.h1`
  margin: 0;
  margin-right: auto;
  font-weight: 400;
  font-size: 20px;
`;

const Logo = styled.img`
  margin-right: 20px;
`;

const UserAccount = styled.div`
  min-height: 30px;
  margin-right: 30px;
  padding: 5px 15px;
  border: 1px solid ${colors.borderColor};
  border-radius: 5px;

  font-size: 16px;
  line-height: 20px;
  text-align: center;
`;

const ButtonExit = styled.button`
  position: relative;

  width: 80px;
  min-height: 24px;
  margin-right: 30px;
  padding: 0;
  border: none;

  font-size: 16px;
  line-height: 20px;
  text-align: left;

  background-color: transparent;

  color: ${colors.textColor};
  cursor: pointer;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    width: 24px;
    height: 24px;

    background-image: url('/icons/log-out.svg');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
  }
`;

const ButtonFullScreen = styled.button`
  position: relative;

  width: 32px;
  height: 32px;
  padding: 4px;
  margin: 0;
  border-radius: 7px;
  border: 2px solid transparent;

  color: ${colors.textColor};
  background-color: transparent;

  cursor: pointer;

  &:hover {
    color: ${colors.activeColor};
  }

  &:focus {
    outline: none;
    border-color: ${colors.focusActiveColor};

    color: ${colors.activeColor};
  };
`;

const Header = ({ handle }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector(loginSelector);
  const sublogin = useSelector(subloginSelector);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  }

  const handleButtonClick = () => {
    if (handle.active) {
      handle.exit();
      return;
    }
    handle.enter();
  }

  return (
    <Container>
      <Logo src="/icons/logo.svg" alt="Логотип" />
      <Title>{text.title}</Title>
      <UserAccount>
        {sublogin
          ? `${login} : ${sublogin}`
          : login}
      </UserAccount>
      <ButtonExit type="button" onClick={handleLogout}>{text.console.buttonExit}</ButtonExit>
      <ButtonFullScreen
        fullScreen={handle.active}
        type="button"
        onClick={handleButtonClick}
      >
        {handle.active
          ? <FullscreenClose />
          : <FullscreenOpen />}
        <span className="visually-hidden">{text.console.buttonFullscreen}</span>
      </ButtonFullScreen>
    </Container>
  )
};

export default Header;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {logout} from '../store/actions/auth';
import FullscreenOpen from './icons/FullscreenOpen.jsx';
import FullscreenClose from './icons/FullscreenClose';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  background-color: #F6F6F6;
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
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  font-size: 16px;
  line-height: 20px;
  text-align: center;
`;

const ButtonExit = styled.button`
  position: relative;

  display: inline-block;
  width: 80px;
  min-height: 24px;
  margin-right: 30px;
  padding: 0;
  border: none;

  font-size: 16px;
  line-height: 20px;
  text-align: left;

  background-color: transparent;

  color: #0D0D0D;
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

  color: #0D0D0D;
  background-color: transparent;

  cursor: pointer;

  &:hover {
    color: #0055FB;
  }

  &:focus {
    outline: none;
    border-color: rgba(69, 165, 255, 0.5);

    color: #0055FB;
  };
`;

const Header = ({ handle }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {login, sublogin} = useSelector((state) => state.auth);

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
      <Title>API-консолька</Title>
      <UserAccount>
        {sublogin ? `${login} : ${sublogin}` : login}
      </UserAccount>
      <ButtonExit type="button" onClick={handleLogout}>Выйти</ButtonExit>
      <ButtonFullScreen
        fullScreen={handle.active}
        type="button"
        onClick={handleButtonClick}
      >
        {handle.active ? <FullscreenClose /> : <FullscreenOpen />}
        <span className="visually-hidden">Развернуть на полный экран</span>
      </ButtonFullScreen>
    </Container>
  )
};

export default Header;

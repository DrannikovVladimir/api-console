import React from 'react';
import styled from 'styled-components';

import HistoryList from './HistoryList.jsx';

const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  min-height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  background-color: #f6f6f6;

  &::before {
    content: '';

    position: absolute;
    top: 5px;
    right: 51px;
    bottom: 5px;

    width: 15px;
    height: 40px;

    background: linear-gradient(269.93deg, #F6F6F6 0.06%, rgba(246, 246, 246, 0) 99.93%);

    z-index: 10;
  }
`;

const ButtonClose = styled.button`
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;

  width: 50px;
  height: 50px;
  margin-left: auto;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  background-color: #f6f6f6;

  cursor: pointer;

  &::before {
    content: '';

    position: absolute;
    top: 16px;
    right: 16px;
    bottom: 16px;
    left: 16px;

    background-image: url('/icons/cross.svg');
    background-repeat: no-repeat;
    background-size: 18px;
    background-position: center;
  }
`;

const History = () => {
  return (
    <Container>
      <HistoryList />
      <ButtonClose />
    </Container>
  );
};

export default History;

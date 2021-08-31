import React from 'react';
import styled from 'styled-components';

import HistoryList from 'src/components/HistoryList.jsx';

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  background-color: #f6f6f6;
`;

const ButtonClose = styled.button`
  position: relative;

  width: 50px;
  height: 50px;
  margin-left: auto;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.2);

  background-color: transparent;

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

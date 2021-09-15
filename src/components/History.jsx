import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Dropdown from './Dropdown.jsx';
import HistoryList from './HistoryList.jsx';
import { resetRequests } from '../store/slices/requestSlice.js';
import { closeDropdown } from '../store/slices/dropdownSlice.js';
import { dropdownSelector } from '../store/slices/selectors.js';
import text from '../constants/locales';
import colors from '../constants/colors';

const Container = styled.div`
  position: relative;

  padding-left: 10px;
  border-bottom: 1px solid ${colors.borderColor};

  background-color: ${colors.secondaryColor};
`;

const ButtonReset = styled.button`
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;

  width: 50px;
  height: 50px;
  margin-left: auto;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(107, 107, 107, 0.2);

  background-color: ${colors.secondaryColor};

  box-shadow: -12px 0 10px 0 rgba(246, 246, 246, 0.8);

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

const HistoryWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  min-height: 50px;
  padding-right: 50px;
  overflow-x: hidden;
`;

const History = () => {
  const dispatch = useDispatch();
  const historyWrapperRef = useRef();
  const {coords} = useSelector(dropdownSelector);
  const handleReset = () => {
    dispatch(resetRequests());
  };

  useEffect(() => {
    const el = historyWrapperRef.current;
    const handleWheel = (evt) => {
      evt.preventDefault();
      el.scrollLeft += evt.deltaY;
      dispatch(closeDropdown());
    };
    el.addEventListener('wheel', handleWheel);

    return (() => el.removeEventListener('wheel', handleWheel));
  }, [dispatch]);

  return (
    <Container>
      <HistoryWrapper ref={historyWrapperRef}>
        <HistoryList />
      </HistoryWrapper>
      <ButtonReset onClick={handleReset}>
        <span className="visually-hidden">{text.console.buttonReset}</span>
      </ButtonReset>
      <Dropdown
        left={coords?.left}
        top={coords?.top}
        width={coords?.width}
        height={coords?.height}
      />
    </Container>
  );
};

export default History;

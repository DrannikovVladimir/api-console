import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, {keyframes} from 'styled-components';

import Dropdown from './Dropdown.jsx';
import { handleDropdown } from '../store/slices/dropdownSlice.js';
import { resetCopied } from '../store/slices/requestSlice';

const Item = styled.li`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  min-width: 117px;
  margin-right: 10px;
  padding: 5px 25px;
  border-radius: 5px;

  background-color: #FFFFFF;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);

  cursor: pointer;

  &::before {
    content: '';

    position: absolute;
    top: 10px;
    left: 10px;
    bottom: 10px;

    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);

    background-color: ${(props) => props.error ? '#CF2C00' : '#30B800'};
  }

  &:after {
    content: '';

    position: absolute;
    top: -10px;
    left: 0;
    right: 0;

    width: 100%;
    height: 10px;
    background-color: #F6F6F6;

    overflow: hidden;
  }

  &:hover {
    box-shadow: 0px 1px 4px 0px #00000040;
  }
`;

const ItemName = styled.span`
  font-size: 16px;
  line-height: 20px;
`;

const ItemDropdown = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  bottom: 6px;

  width: 18px;
  height: 18px;
  margin: 0;
  padding: 0;
  border: none;

  background-color: transparent;
  background-image: url('/icons/dots.svg');
  background-repeat: no-repeat;
  background-size: 4px 18px;
  background-position: center;

  cursor: pointer;
`;

const translate = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 1;
  }
  35% {
    transform: translateY(-10px);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
`;

const CopyFeedback = styled.div`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);

  display: ${(props) => props.visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  min-width: 90px;
  width: calc(100% - 27px);
  height: 20px;
  border-radius: 5px;

  font-size: 12px;
  line-height: 20px;

  background-color: #F6F6F6;

  animation: ${translate} 2s linear;
  animation-fill-mode: forwards;
`;

const HistoryItem = ({name, id, error}) => {
  const dispatch = useDispatch();
  const { dropdown } = useSelector((state) => state.dropdown);
  const { copied, currentId } = useSelector((state) => state.request);

  const handleDropdownClick = (id) => () => {
    dispatch(handleDropdown({ id }));
    dispatch(resetCopied({ id }));
  };
  console.log(currentId, id);
  return (
    <Item error={error} id={id}>
      {(currentId === id) && <CopyFeedback visible={copied}>Скопировано</CopyFeedback>}
      <ItemName>{name}</ItemName>
      <ItemDropdown onClick={handleDropdownClick(id)}>
        <span className="visually-hidden">Открыть меню</span>
      </ItemDropdown>
      {(dropdown.id === id) && <Dropdown />}
    </Item>
  )
};

export default HistoryItem;

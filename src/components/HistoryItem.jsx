import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Dropdown from './Dropdown.jsx';
import { handleDropdown } from '../store/slices/dropdownSlice.js';

const Item = styled.li`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
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

const HistoryItem = ({name, id, error}) => {
  const dispatch = useDispatch();
  const { dropdown } = useSelector((state) => state.dropdown);
  const handleDropdownClick = (id) => () => {
    dispatch(handleDropdown({ id }));
  };
  console.log(dropdown);

  return (
    <Item error={error} id={id}>
      <ItemName>{name}</ItemName>
      <ItemDropdown onClick={handleDropdownClick(id)}>
        <span className="visually-hidden">Открыть меню</span>
      </ItemDropdown>
      {dropdown.id === id ? <Dropdown /> : null}
    </Item>
  )
};

export default HistoryItem;

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import DropdownMenu from './DropdownMenu.jsx';
import { closeDropdown } from '../store/slices/dropdownSlice.js';

const DropdownStyled = styled.div`
  position: absolute;

  top: ${(props) => `${props.top - 21}px` || '0px'};
  left: ${(props) => (props.left - 130 + props.width) < 10
    ? '10px'
    : `${props.left - 130 + props.width}px` || '0px'};

  display: ${(props) => props.isOpened ? 'block' : 'none'};
  width: 130px;
  min-height: 140px;
  border-radius: 3px;

  background: #FFFFFF;
  box-shadow: 0px 1px 4px 0px #00000040;

  z-index: 20;
`;

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const {dropdown} = useSelector((state) => state.dropdown);

  const handleDropdownClose = () => {
    dispatch(closeDropdown());
  }

  return (
    <DropdownStyled isOpened={dropdown.isOpened} {...props}>
      <DropdownMenu onHide={handleDropdownClose} />
    </DropdownStyled>
  )
};

export default Dropdown;

import React from 'react';
import styled from 'styled-components';

import DropdownMenu from './DropdownMenu.jsx';

const DropdownStyled = styled.div`
  position: absolute;

  top: 30px;
  right: 0;

  display: ${(props) => props.isOpened ? 'block' : 'none'};
  width: 130px;
  min-height: 140px;
  border-radius: 3px;

  background: #FFFFFF;
  box-shadow: 0px 1px 4px 0px #00000040;

  z-index: 20;
`;

const Dropdown = ({isOpened}) => {

  return (
    <DropdownStyled isOpened={isOpened}>
      <DropdownMenu />
    </DropdownStyled>
  )
};

export default Dropdown;

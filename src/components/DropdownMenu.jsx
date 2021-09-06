import React from 'react';
import styled from 'styled-components';

const DropdownList = styled.ul`
  position: relative;

  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  list-style: none;

  &::before {
    content: '';

    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;

    width: auto;
    height: 1px;

    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const DropdownItem = styled.li`
  margin-top: ${(props) => props.marginTop || '0'};
  margin-bottom: ${(props) => props.marginBottom || '0'};
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  border: none;

  font-size: 16px;
  line-height: 20px;
  text-align: left;
  cursor: pointer;

  background-color: transparent;

  &:hover {
    color: ${(props) => props.color ? '#FFFFFF' : '#0D0D0D'};
    background-color: ${(props) => props.color || 'transparent'};
  }
`;

const DropdownMenu = () => {
  const handleRemove = (id) => {

  };

  return (
    <DropdownList>
      <DropdownItem
        marginTop="5px"
      >
        <DropdownButton>Выполнить</DropdownButton>
      </DropdownItem>
      <DropdownItem
        marginBottom="5px"
      >
        <DropdownButton color="#0055FB">Скопировать</DropdownButton>
      </DropdownItem>
      <DropdownItem
        marginTop="6px"
        marginBottom="5px"
      >
        <DropdownButton onClick={handleRemove} color="#CF2C00">Удалить</DropdownButton>
      </DropdownItem>
    </DropdownList>
  )
};

export default DropdownMenu;

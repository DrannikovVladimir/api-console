import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { loadRequest, copyRequest, removeRequest, addCurrentRequest } from '../store/slices/requestSlice';
import api from '../helpers/sendsay';

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

const DropdownMenu = ({ onHide }) => {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.dropdown.dropdown);
  const {requests} = useSelector((state) => state.request);
  const currentRequest = requests.find((r) => r.id === id);
  const handleRemove = (id) => () => {
    dispatch(removeRequest({id}));
    onHide();
  };

  const handleCopy = (id) => () => {
    dispatch(copyRequest({id}));
    onHide();
  };

  const handleAddCurrentRequest = () => {
    const { id, query } = currentRequest;
    dispatch(addCurrentRequest({request: currentRequest}));
    dispatch(loadRequest({value: query}));
    dispatch(removeRequest({id}));
    onHide();
  };

  return (
    <DropdownList>
      <DropdownItem
        marginTop="5px"
      >
        <DropdownButton onClick={handleAddCurrentRequest}>Выполнить</DropdownButton>
      </DropdownItem>
      <CopyToClipboard text={currentRequest.query} onCopy={handleCopy(id)}>
        <DropdownItem
          marginBottom="5px"
        >
          <DropdownButton color="#0055FB">Скопировать</DropdownButton>
        </DropdownItem>
        </CopyToClipboard>
      <DropdownItem
        marginTop="6px"
        marginBottom="5px"
      >
        <DropdownButton onClick={handleRemove(id)} color="#CF2C00">Удалить</DropdownButton>
      </DropdownItem>
    </DropdownList>
  )
};

export default DropdownMenu;

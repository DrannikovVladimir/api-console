import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  loadRequest,
  copyRequest,
  removeRequest,
  addCurrentRequest
} from '../store/slices/requestSlice';
import { requestsSelector, dropdownSelector } from '../store/slices/selectors';
import text from '../constants/locales';
import colors from '../constants/colors';

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

    background-color: ${colors.borderColor};
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
    color: ${(props) => props.color
      ? colors.primeColor
      : colors.textColor};
    background-color: ${(props) => props.color || 'transparent'};
  }
`;

const DropdownMenu = ({ onHide }) => {
  const dispatch = useDispatch();
  const {id} = useSelector(dropdownSelector);
  const requests = useSelector(requestsSelector);
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
        <DropdownButton onClick={handleAddCurrentRequest}>{text.dropdown.execute}</DropdownButton>
      </DropdownItem>
      <CopyToClipboard text={currentRequest?.query} onCopy={handleCopy(id)}>
        <DropdownItem
          marginBottom="5px"
        >
          <DropdownButton color={colors.activeColor}>{text.dropdown.copy}</DropdownButton>
        </DropdownItem>
        </CopyToClipboard>
      <DropdownItem
        marginTop="6px"
        marginBottom="5px"
      >
        <DropdownButton onClick={handleRemove(id)} color={colors.dangerColor}>{text.dropdown.remove}</DropdownButton>
      </DropdownItem>
    </DropdownList>
  )
};

export default DropdownMenu;

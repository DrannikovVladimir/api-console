import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, {keyframes} from 'styled-components';

import { closeDropdown, handleDropdown } from '../store/slices/dropdownSlice';
import { resetCopied, formatRequest } from '../store/slices/requestSlice';
import { requestsSelector, currentIdSelector, copiedSelector } from 'src/store/slices/selectors';
import Dots from './icons/Dots';
import text from '../constants/locales';
import colors from '../constants/colors';

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

  background-color: ${colors.primeColor};
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
    border: 1px solid ${colors.borderColor};

    background-color: ${(props) => props.error
      ? colors.dangerColor
      : colors.successColor};
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
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const ItemName = styled.span`
  font-size: 16px;
  line-height: 20px;
`;

const ItemDropdown = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 6px;

  width: 18px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: none;

  background-color: transparent;

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

  display: ${(props) => props.visible
    ? 'flex'
    : 'none'};
  justify-content: center;
  align-items: center;
  min-width: 90px;
  width: calc(100% - 27px);
  height: 20px;
  border-radius: 5px;

  font-size: 12px;
  line-height: 20px;

  background-color: ${colors.primeColor};

  animation: ${translate} 2s linear;
  animation-fill-mode: forwards;
`;

const HistoryItem = ({name, id, error}) => {
  const dispatch = useDispatch();
  const itemRef = useRef();
  const requests = useSelector(requestsSelector);
  const copied = useSelector(copiedSelector);
  const currentId = useSelector(currentIdSelector);

  const handleDropdownClick = (id) => (evt) => {
    evt.stopPropagation();
    const coords = itemRef.current.getBoundingClientRect();
    dispatch(handleDropdown({ id, coords }));
    dispatch(resetCopied({ id }));
  };

  const handleClickItem = (e) => {
    const currentRequest = requests.find((r) => r.id === id);
    dispatch(formatRequest({ value: currentRequest.query }));
    dispatch(closeDropdown());
  }

  return (
    <Item onClick={handleClickItem} error={error} id={id} ref={itemRef}>
      {(currentId === id) && <CopyFeedback visible={copied}>{text.dropdown.feedbackCoping}</CopyFeedback>}
      <ItemName>{name}</ItemName>
      <ItemDropdown onClick={handleDropdownClick(id)}>
        <Dots />
        <span className="visually-hidden">{text.dropdown.button}</span>
      </ItemDropdown>
    </Item>
  )
};

export default HistoryItem;

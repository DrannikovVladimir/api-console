import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HistoryItem from './HistoryItem.jsx';
import { requestsSelector } from '../store/slices/selectors.js';
import text from '../constants/locales';

const List = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  list-style: none;
`;

const HistoryFeedback = styled.p`
  margin: 0;
  margin-left: 5px;
  padding: 0;

  font-size: 18px;
  line-height: 24px;
  color: #c0c0c0;
`;

const HistoryList = () => {
  const requests = useSelector(requestsSelector);

  if (requests.length === 0) {
    return <HistoryFeedback>{text.console.emptyList}</HistoryFeedback>;
  }

  return (
    <List>
      {requests.map(({ id, name, error, dropdown}) => <HistoryItem key={id} id={id} name={name} error={error} dropdown={dropdown} />)}
    </List>
  );
};

export default HistoryList;

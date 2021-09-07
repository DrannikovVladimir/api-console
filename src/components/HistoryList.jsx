import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HistoryItem from './HistoryItem.jsx';

const List = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  list-style: none;
`;

const HistoryList = () => {
  const { requests } = useSelector((state) => state.request);
  // console.log(requests);

  if (requests.length === 0) {
    return null;
  }
  return (
    <List>
      {requests.map(({ id, name, error, dropdown}) => <HistoryItem key={id} id={id} name={name} error={error} dropdown={dropdown} />)}
    </List>
  );
};

export default HistoryList;

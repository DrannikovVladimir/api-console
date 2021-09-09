import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const List = styled.ul`
  margin: 0;
  padding: 0;
  overflow-wrap: break-word;

  list-style: none;
`;

const Response = () => {
  const {currentResponse} = useSelector((state) => state.request);
  if (!currentResponse) {
    return null;
  }

  console.log(currentResponse);
  const renderResponse = () => {
    return (
      <List>
        {Object.entries(currentResponse).map(([key, value]) => {
          if (typeof value === 'object') {
            return (
              <ul key={_.uniqueId()}>
                {Object.entries(value).map(([innerKey, innerValue], index) => (
                  <li key={`000${index + 1}`}>{innerKey}: {innerValue}</li>
                ))}
              </ul>
            )
          }
          return (
            <li key={_.uniqueId()}>
              <span>
                {key}
              </span>
              {': '}
              <span>
                {value}
              </span>
            </li>
          )
        })}
      </List>
    )
  };

  return (
    <div>{renderResponse()}</div>
  );
};

export default Response;

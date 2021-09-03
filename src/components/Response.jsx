import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const Response = () => {
  const {currentResponse} = useSelector((state) => state.request);
  console.log(currentResponse)
  const result = JSON.stringify(currentResponse, undefined, 2);
  const obj = Object.entries(JSON.parse(result))
    .map(([key, value]) => `"${key}": "${value}"`).join('\n');

  console.log(obj);

  return (
    <p>{obj}</p>
  )
};

export default Response;

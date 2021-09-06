import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const Response = () => {
  const {currentResponse} = useSelector((state) => state.request);
  const result = JSON.stringify(currentResponse, undefined, 2);
  if (!currentResponse) {
    return null;
  }
  const obj = Object.entries(JSON.parse(result))
    .map(([key, value]) => `"${key}": "${value}"`).map((item) => item.replace(/\s/g, '')).join('\n');

  // console.log(result);
  // console.log(obj);

  return (
    <div>Response</div>
  );
};

export default Response;

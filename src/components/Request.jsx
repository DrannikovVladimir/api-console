import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  display: block;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 10px;
  resize: none;

  outline: none;
`;

const Request = ({ value, onChange, onSubmit }) => {
  return (
    <form id="formConsole" onSubmit={onSubmit}>
      <TextArea
        id="json"
        name="json"
        value={value}
        onChange={onChange}
      />
    </form>
  )
};

export default Request;

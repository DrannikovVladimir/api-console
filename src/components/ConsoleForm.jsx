import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import { loadRequest, changeTextarea } from '../store/slices/requestSlice';
import Request from './Request.jsx';
import Response from './Response.jsx';
import Footer from './Footer.jsx';

const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 166px);
  padding: 10px 15px;

  background-color: #FFFFFF;
`;

const InnerContainer = styled.div`
  height: 100%;
  width: calc(50% - 5px);
`;

const RequestContainer = styled.div`
  height: calc(100% - 35px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const ResponseContainer = styled.div`
  height: calc(100% - 35px);
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  font-size: 14px;
  line-height: 22px;
`;

const Label = styled.label`
  margin: 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;

const getValidate = (value) => {
  const errors = {};
  try {
    JSON.parse(value);
    return false;
  } catch(err) {
    // console.log(err);
    errors.json = 'Невалидный JSON';
  }
  return errors;
};

const ConsoleForm = () => {
  const dispatch = useDispatch();
  const {value} = useSelector((state) => state.request);
  const [isValid, setIsValid] = useState(false);
  const validate = getValidate(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValid(false);
    if (validate) {
      setIsValid(true);
      return;
    }
    dispatch(loadRequest({value}));
  };

  const handleChange = ({ target: { value } }) => {
    dispatch(changeTextarea({ value }));
  };

  // localStorage.removeItem('persist:request');

  return (
    <form id="formConsole" onSubmit={handleSubmit}>
      <FieldsContainer>
        <InnerContainer>
          <Label>Запрос:</Label>
          <RequestContainer>
            <Request onChange={handleChange} value={value} />
          </RequestContainer>
        </InnerContainer>
        <InnerContainer>
          <Label>Ответ:</Label>
          <ResponseContainer>
            {isValid ? <span>{validate.json}</span> : null}
            <Response />
          </ResponseContainer>
        </InnerContainer>
      </FieldsContainer>
      <Footer />
    </form>
  )
};

export default ConsoleForm;

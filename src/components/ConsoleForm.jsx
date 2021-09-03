import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { useFormik } from 'formik';
import _ from 'lodash';

import { addRequest } from '../store/slices/requestSlice';
import api from '../helpers/sendsay';
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

const validate = (values) => {
  const errors = {};
  try {
    JSON.parse(values.json);
  } catch(err) {
    // console.log(err);
    errors.json = 'Невалидный JSON';
  }
  return errors;
};

const ConsoleForm = () => {
  const dispatch = useDispatch();
  const {requests} = useSelector((state) => state.request);
  const formik = useFormik({
    initialValues: {
      json: '',
    },
    validate,
    onSubmit: async (values) => {
      const toJson = JSON.parse(values.json);
      // const toObj = JSON.stringify(toJson, undefined, 2);
      try {
        const res = await api.sendsay.request(toJson);
        const item = { id: _.uniqueId(), query: values.json, data: res};
        dispatch(addRequest({ request: item }));
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(requests);

  //  {"action": "sys.settings.get"}
  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldsContainer>
        <InnerContainer>
          <Label>Запрос:</Label>
          <RequestContainer>
            <Request onChange={formik.handleChange} value={formik.values.json} />
          </RequestContainer>
        </InnerContainer>
        <InnerContainer>
          <Label>Ответ:</Label>
          <ResponseContainer>
            {formik.errors.json && formik.touched.json ? <span>{formik.errors.json}</span> : null}
            <Response />
          </ResponseContainer>
        </InnerContainer>
      </FieldsContainer>
      <Footer />
    </form>
  )
};

export default ConsoleForm;

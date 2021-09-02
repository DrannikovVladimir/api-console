import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import api from '../helpers/sendsay';
import Request from './Request.jsx';
import Footer from './Footer.jsx';

console.log(api.sendsay);

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
  overflow: hidden;
`;

const ResponseContainer = styled.div`
  height: calc(100% - 35px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const Label = styled.label`
  margin: 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;

const ConsoleForm = () => {
  const formik = useFormik({
    initialValues: {
      json: '',
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values));
      const res = await api.sendsay.request({
        action: 'ping',
      });
      console.log(res);
    },
  });

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

          </ResponseContainer>
        </InnerContainer>
      </FieldsContainer>
      <Footer />
    </form>
  )
};

export default ConsoleForm;

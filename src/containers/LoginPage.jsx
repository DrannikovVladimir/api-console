import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

import FormLogin from '../components/FormLogin.jsx';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 520px;
  min-height: 425px;
  left: calc(50% - 520px / 2);
  top: 222px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
`;

const LogoStyled = styled.img`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
`;

function LoginPage() {
  return (
    <Wrapper>
      <LogoStyled src="/icons/logo.svg" alt="" />
      <FormContainer>
        <Title>API-консолька</Title>
        <FormLogin />
      </FormContainer>
    </Wrapper>
  );
}

export default withRouter(LoginPage);

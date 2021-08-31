import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import {authenticate} from 'src/store/actions/auth';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const Label = styled.label`
  margin-bottom: 5px;

  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.validateError || '#0D0D0D'};
`;

const Input = styled.input`
  min-height: 40px;
  padding: 5px 10px;
  border-width: 1px;
  border-style: solid ;
  border-color: ${(props) => props.validateError || 'rgba(0, 0, 0, 0.2)'};
  border-radius: 5px;

  font: inherit;

  &:hover {
    border-color: ${(props) => props.validateError || 'rgba(0, 0, 0, 0.4)'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  display: inline-block;
  min-width: 110px;
  min-height: 40px;
  border: none;
  border-radius: 5px;

  font-weight: 50;
  font-size: 16px;
  text-align: center;
  color: #FFFFFF;

  background: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%),
    linear-gradient(0deg, #C4C4C4, #C4C4C4);

  cursor: pointer;

  &:hover {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
      linear-gradient(180deg, #45A6FF 0%, #0055FB 100%),
      linear-gradient(0deg, #C4C4C4, #C4C4C4);
  }

  &:active {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      linear-gradient(180deg, #45A6FF 0%, #0055FB 100%),
      linear-gradient(0deg, #C4C4C4, #C4C4C4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #45A5FF
  }

  &:disabled {
    background: #C4C4C4;
  }
`;

const FeedbackError = styled.div`
  min-height: 70px;
  margin-bottom: 20px;
  padding: 10px 40px;
  border-radius: 5px;

  background-color: #CF2C001A;

  color: #CF2C00;
  font-size: 12px;
  line-height: 20px;

  opacity: 0.9;
`;

const FeedbackTitle = styled.h2`
  position: relative;
  margin: 0;

  font-size: 18px;
  line-height: 30px;
  font-weight: 400;

  color: #CF2C00;

  &::after {
    content: '';

    position: absolute;
    top: 8px;
    left: -30px;

    width: 20px;
    height: 20px;

    background-image: url('/icons/meh.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => !!state.auth?.sessionKey);
  const error = useSelector((state) => state.auth.authError);
  const formik = useFormik({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required(),
      sublogin: Yup.string(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      dispatch(
        authenticate({
          login: values.login,
          sublogin: values.sublogin,
          password: values.password,
        }),
      );
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/console');
    }
  }, [isLoggedIn, history]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {error ? (
        <FeedbackError>
          <FeedbackTitle>Вход не вышел</FeedbackTitle>
          {error}
        </FeedbackError>
      ) : null}
      <FormGroup className="login-form__group">
        <Label
          validateError={(formik.errors.login && formik.touched.login) && '#CF2C00'}
          htmlFor="login"
          className="login-form__label"
        >
          Логин
        </Label>
        <Input
          validateError={(formik.errors.login && formik.touched.login) && '#CF2C00'}
          className="login-form__input"
          type="text"
          id="login"
          name="login"
          onChange={formik.handleChange}
          value={formik.values.login}
        />
      </FormGroup>
      <FormGroup className="login-form__group">
        <Label htmlFor="sublogin" className="login-form__label">Сублогин</Label>
        <Input
          className="sublogin-form__input"
          type="text"
          id="sublogin"
          name="sublogin"
          onChange={formik.handleChange}
          value={formik.values.sublogin}
        />
      </FormGroup>
      <FormGroup className="login-form__group">
        <Label
          validateError={(formik.errors.password && formik.touched.password) && '#CF2C00'}
          htmlFor="password"
          className="login-form__label"
        >
          Пароль
        </Label>
        <Input
          validateError={(formik.errors.password && formik.touched.password) && '#CF2C00'}
          className="login-form__input"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </FormGroup>
      <Button type="submit" disabled={(formik.errors.login && formik.touched.login)
        || (formik.errors.password && formik.touched.password)}>
        {formik.isSubmitting && formik.isValid && !error ? 'Отправка' : 'Войти'}
      </Button>
    </form>
  );
};

export default LoginForm;

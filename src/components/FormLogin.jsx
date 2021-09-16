import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import {authenticate} from '../store/actions/auth';
import Button from '../components/Button.jsx';
import Loader from './icons/Loader.jsx';
import { isLoggedInSelector, authErrorSelector } from '../store/slices/selectors.js';
import text from '../constants/locales';
import colors from '../constants/colors';

const FormGroup = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const Label = styled.label`
  margin-bottom: 5px;

  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.validateError || colors.textColor};
`;

const Input = styled.input`
  min-height: 40px;
  padding: 5px 10px;
  border-width: 1px;
  border-style: solid ;
  border-color: ${(props) => props.validateError || colors.borderColor};
  border-radius: 5px;

  font: inherit;

  &:hover {
    border-color: ${(props) => props.validateError || colors.boxShadowColor};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.borderColor};
  }
`;

const SubloginLabel = styled.span`
  position: absolute;
  top: 0;
  right: 0;

  font-size: 12px;
  line-height: 20px;
  color: ${colors.linkColor};
`;

const FeedbackError = styled.div`
  min-height: 70px;
  margin-bottom: 20px;
  padding: 10px 40px;
  border-radius: 5px;

  background-color: rgba(207, 44, 0, 0.1);

  color: ${colors.dangerColor};
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

  color: ${colors.dangerColor};

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
  const isLoggedIn = useSelector(isLoggedInSelector);
  const error = useSelector(authErrorSelector);
  const formik = useFormik({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup
        .string()
        .required()
        .matches(/^[a-z0-9@._-]+$/i),
      sublogin: Yup.string(),
      password: Yup
        .string()
        .matches(/^[^а-яА-Я]+$/)
        .required(),
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
    if (!!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {error
        ? (
          <FeedbackError>
            <FeedbackTitle>{text.formLogin.error}</FeedbackTitle>
            {error}
          </FeedbackError>
          )
        : null}
      <FormGroup className="login-form__group">
        <Label
          validateError={(formik.errors.login && formik.touched.login) && colors.dangerColor}
          htmlFor="login"
          className="login-form__label"
        >
          {text.formLogin.login}
        </Label>
        <Input
          validateError={(formik.errors.login && formik.touched.login) && colors.dangerColor}
          className="login-form__input"
          type="text"
          id="login"
          name="login"
          onChange={formik.handleChange}
          value={formik.values.login}
        />
      </FormGroup>
      <FormGroup className="login-form__group">
        <SubloginLabel>{text.formLogin.label}</SubloginLabel>
        <Label
          htmlFor="sublogin"
          className="login-form__label"
        >
          {text.formLogin.sublogin}
        </Label>
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
          validateError={(formik.errors.password && formik.touched.password) && colors.dangerColor}
          htmlFor="password"
          className="login-form__label"
        >
          {text.formLogin.password}
        </Label>
        <Input
          validateError={(formik.errors.password && formik.touched.password) && colors.dangerColor}
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
        {formik.isSubmitting && formik.isValid && !error
          ? <Loader />
          : text.formLogin.button }
      </Button>
    </form>
  );
};

export default LoginForm;

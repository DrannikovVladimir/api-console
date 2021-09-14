import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import { loadRequest, changeTextarea, setNewSize } from '../store/slices/requestSlice';
import Request from './Request.jsx';
import Response from './Response.jsx';
import Footer from './Footer.jsx';
import Dots from './icons/Dots.jsx';

const FieldsContainer = styled.div`
  padding: 10px 15px;
  height: calc(100vh - 166px);

  background-color: #FFFFFF;
`;

const FieldsContainerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const InnerRequestContainer = styled.div`
  height: 100%;
  width: calc(50% - 5px);
  margin-right: 10px;
`;

const InnerResponseContainer = styled.div`
  height: 100%;
  width: calc(50% - 5px);
`;

const RequestContainer = styled.div`
  height: calc(100% - 35px);
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.isValid ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 5px;
`;

const ResponseContainer = styled.div`
  height: calc(100% - 35px);
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.isValid ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 5px;
  overflow-y: hidden;

  font-size: 14px;
  line-height: 22px;
`;

const Label = styled.label`
  margin: 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => props.isValid ? '#CF2C00' : '#999999'};
`;

const ButtonDrag = styled.button`
  position: absolute;
  top: 50%;
  left: calc(50% - 10px);

  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  padding: 0;
  border: none;

  background-color: transparent;
  cursor: url('/icons/col-resize.svg'), auto;
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
  const responseRef = useRef();
  const buttonRef = useRef();
  const {value, requestError, resizeCoord} = useSelector((state) => state.request);
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

  const handleChange = (e) => {
    dispatch(changeTextarea({ value: e.target.value }));
  };

  useEffect(() => {
    const response = responseRef.current;
    const handleWheel = (evt) => {
      evt.preventDefault();
      response.scrollTop += evt.deltaY;
    };
    response.addEventListener('wheel', handleWheel);

    return (() => response.removeEventListener('wheel', handleWheel));
  }, []);

  useEffect(() => {
    const buttonDrag = buttonRef.current;
    const handleDown = (evtDown) => {
      evtDown.stopPropagation();
      evtDown.preventDefault();

      let startCoord = {
        x: evtDown.clientX,
      };

      const handleMove = (evtMove) => {
        evtMove.preventDefault();
        evtMove.stopPropagation();

        startCoord = {
          x: evtMove.clientX,
        };

        const documentWidth = document.documentElement.clientWidth;

        if (startCoord.x <= 250) {
          startCoord.x = 250;
        }
        if (documentWidth - startCoord.x <= 250) {
          startCoord.x = documentWidth - 250;
        }

        dispatch(setNewSize({ coord: { ...startCoord, width: documentWidth } }));
      };

      const handleUp = (evtUp) => {
        evtUp.preventDefault();
        evtUp.stopPropagation();

        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      }

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
    }

    buttonDrag.addEventListener('mousedown', handleDown);

    return (() => buttonDrag.removeEventListener('mousedown', handleDown));
  }, [dispatch]);

  const requestWidth = resizeCoord ? `calc(${resizeCoord.x * 100 / resizeCoord.width}% - 5px)` : 'calc(50% - 5px)';
  const buttonPositionLeft = resizeCoord ? `calc(${resizeCoord.x * 100 / resizeCoord.width}% - 10px)` : 'calc(50% - 10px)';
  const responseWidth = resizeCoord ? `calc(${(resizeCoord.width - resizeCoord.x) * 100 / resizeCoord.width}% - 5px)` : 'calc(50% - 5px)';
  console.log(requestWidth, responseWidth, buttonPositionLeft);

  return (
    <>
      <FieldsContainer>
        <FieldsContainerWrapper>
          <InnerRequestContainer style={{width: requestWidth}}>
            <Label isValid={isValid}>Запрос:</Label>
            <RequestContainer isValid={isValid}>
              <Request onChange={handleChange} value={value} onSubmit={handleSubmit}/>
            </RequestContainer>
          </InnerRequestContainer>
          <ButtonDrag style={{left: buttonPositionLeft}} ref={buttonRef}>
            <Dots />
          </ButtonDrag>
          <InnerResponseContainer style={{width: responseWidth}}>
            <Label isValid={!!requestError}>Ответ:</Label>
            <ResponseContainer ref={responseRef} isValid={!!requestError}>
              {isValid ? <span>{validate.json}</span> : null}
              <Response />
            </ResponseContainer>
          </InnerResponseContainer>
        </FieldsContainerWrapper>
      </FieldsContainer>
      <Footer />
    </>
  )
};

export default ConsoleForm;

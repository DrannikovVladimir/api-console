import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import { currentResponseSelector, requestErrorSelector } from '../store/slices/selectors';
import colors from '../constants/colors.js';

const ResponseWrapper = styled.div`
  padding-bottom: 20px;
  height: 100%;
  overflow: hidden;
`;

const TextArea = styled.textarea`
  display: block;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  resize: none;

  overflow: hidden;

  outline: none;

  &:disabled {
    color: ${colors.textColor};
    background-color: transparent;
  }
`;

const Response = () => {
  const wrapperRef = useRef();
  const textareaRef = useRef();
  const currentResponse = useSelector(currentResponseSelector);
  const requestError = useSelector(requestErrorSelector);

  useEffect(() => {
    const el = wrapperRef.current;
    const textArea = textareaRef.current;
    const handleTextarea = (evt) => {
      evt.preventDefault();
      textArea.scrollTop += evt.deltaY;
    }
    el.addEventListener('wheel', handleTextarea);

    return (() => el.removeEventListener('wheel', handleTextarea));
  }, []);

  return (
    <ResponseWrapper ref={wrapperRef}>
      <TextArea ref={textareaRef} defaultValue={!(!currentResponse || requestError)
        ? JSON.stringify(currentResponse, undefined, 4)
        : ''} disabled={true} />
    </ResponseWrapper>
  );
};

export default Response;

import React from 'react';
import styled from 'styled-components';

const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 170px);
  padding: 10px 15px;

  background-color: #FFFFFF;
`;

const InnerContainer = styled.div`
  min-height: 100%;
  width: calc(50% - 5px);
`;

const RequestContainer = styled.div`
  min-height: calc(100% - 20px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const ResponseContainer = styled.div`
  min-height: calc(100% - 20px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const Title = styled.h2`
  margin: 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;

const Fields = () => {
  return (
    <FieldsContainer>
      <InnerContainer>
        <Title>Запрос:</Title>
        <ResponseContainer>

        </ResponseContainer>
      </InnerContainer>
      <InnerContainer>
        <Title>Ответ:</Title>
        <RequestContainer>

        </RequestContainer>
      </InnerContainer>
    </FieldsContainer>
  )
};

export default Fields;

import React from 'react';
import styled, { css } from 'styled-components';
import { useAccountBookState } from '../AccountBookContext';

const AccountBookTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;

  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;

  padding: 0 32px;

  display: flex;
  flex-direction: column;
`;

const DialogWrapper = styled.div`
  ${props =>
    props.dialogOn
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: black;
  opacity: 0.8;
  width: 100%;
  height: 100%;
`;

function AccountBookTemplate({ children }) {
  const { dialogOn } = useAccountBookState();
  return (
    <>
      <AccountBookTemplateBlock>{children}</AccountBookTemplateBlock>
      <DialogWrapper dialogOn={dialogOn} />
    </>
  );
}

export default React.memo(AccountBookTemplate);

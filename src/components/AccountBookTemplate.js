import React from 'react';
import styled from 'styled-components';
import AccountBookCategory from './AccountBookCategory';
import AccountBookCreate from './AccountBookCreate';
import AccountBookHead from './AccountBookHead';
import AccountBookList from './AccountBookList';

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

function AccountBookTemplate() {
  return (
    <>
      <AccountBookTemplateBlock>
        <AccountBookHead />
        <AccountBookCategory />
        <AccountBookList />
        <AccountBookCreate />
      </AccountBookTemplateBlock>
    </>
  );
}

export default AccountBookTemplate;

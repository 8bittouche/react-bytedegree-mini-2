import React from 'react';
import styled from 'styled-components';
import { useAccountBookState } from '../contexts/AccountBookContext';
import AccountBookItem from './AccountBookItem';

const AccountBookListBlock = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

function AccountBookList() {
  const { currentCategory, records } = useAccountBookState();

  const currentRecords =
    currentCategory === 0
      ? records
      : records.filter(record => record.categoryId === currentCategory);

  return (
    <AccountBookListBlock>
      {currentRecords.map(record => (
        <AccountBookItem key={record.id} record={record} />
      ))}
    </AccountBookListBlock>
  );
}

export default React.memo(AccountBookList);

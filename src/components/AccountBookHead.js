import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useAccountBookState } from '../contexts/AccountBookContext';

const AccountBookHeadBlock = styled.div`
  padding-top: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #ced4da;
  font-weight: bold;

  h1 {
    font-size: 36px;
    margin: 0;
  }

  .today {
    font-size: 24px;
    margin-top: 16px;
  }

  .total-expense {
    font-size: 24px;
    margin-top: 16px;
    color: #e03131;

    span {
      color: black;
    }
  }
`;

const today = new Date().toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function AccountBookHead() {
  const { records } = useAccountBookState();

  const totalExpense = useMemo(
    () => records.reduce((a, c) => a + c.expense, 0),
    [records]
  );

  return (
    <AccountBookHeadBlock>
      <h1>오늘의 지출</h1>
      <div className="today">{today}</div>
      <div className="total-expense">
        <span>총 지출: </span>
        {totalExpense && `-${totalExpense.toLocaleString()}`}원
      </div>
    </AccountBookHeadBlock>
  );
}

export default AccountBookHead;

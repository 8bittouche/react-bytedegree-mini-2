import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  useAccountBookDispatch,
  useAccountBookState,
} from '../contexts/AccountBookContext';
import AccountBookEdit from './AccountBookEdit';
import AccountBookRemove from './AccountBookRemove';

const AccountBookItemBlock = styled.div`
  display: flex;
  padding-top: 6px;
  padding-bottom: 6px;
  align-items: center;
  font-size: 20px;

  .align-block {
    display: flex;
    position: absolute;
    right: 0;
  }
`;

const Category = styled.div`
  display: flex;
  padding: 0 14px;
  height: 48px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  background: ${props => props.backgroundColor};
`;

const Content = styled.div`
  display: flex;
  color: #495057;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

const Expense = styled.div`
  display: flex;
  color: #e03131;
  font-weight: bold;
  margin-right: 16px;
`;

const Edit = styled.div`
  display: flex;
  font-size: 28px;
  margin-right: 8px;
  cursor: pointer;
`;

const Remove = styled.div`
  display: flex;
  font-size: 28px;
  cursor: pointer;
`;

function AccountBookItem({ record }) {
  const [edit, setEdit] = useState(false);
  const dispatch = useAccountBookDispatch();
  const { categories, dialogOn } = useAccountBookState();
  const { id, categoryId, content, expense } = record;

  const category = categories.filter(category => category.id === categoryId)[0];

  const onEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <AccountBookItemBlock>
        <Category backgroundColor={category.color}>{category.name}</Category>
        <Content>{content}</Content>
        <div className="align-block">
          <Expense>{expense && `-${expense.toLocaleString()}`}원</Expense>
          <Edit>
            <MdEdit onClick={onEdit} />
          </Edit>
          <Remove>
            <MdDelete onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })} />
          </Remove>
        </div>
      </AccountBookItemBlock>
      {edit && (
        <AccountBookEdit
          id={id}
          categoryId={categoryId}
          categoryName={category.name}
          content={content}
          expense={expense}
          onEdit={onEdit}
        />
      )}
      {dialogOn && <AccountBookRemove id={id} categoryId={categoryId} />}
    </>
  );
}

export default React.memo(AccountBookItem);

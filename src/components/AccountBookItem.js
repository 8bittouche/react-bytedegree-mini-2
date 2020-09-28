import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useAccountBookDispatch } from '../AccountBookContext';
import AccountBookEdit from './AccountBookEdit';

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

const RemoveForm = styled.form`
  position: absolute;
  left: 80px;
  top: 10px;
  width: 350px;
  height: 130px;
  background: white;
  border-radius: 10px;
  z-index: 1000;
  opacity: 1;
  padding: 20px;

  div {
    position: relative;
    margin-top: 36px;
    margin-left: 210px;
  }
  button {
    width: 60px;
    height: 40px;
    border-radius: 4px;
    color: white;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
  }

  .submit {
    background: #f06595;
  }

  .cancel {
    background: #495057;
  }
`;

function AccountBookItem({ record }) {
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const dispatch = useAccountBookDispatch();
  const { id, category, content, expense } = record;

  const onEdit = () => {
    setEdit(!edit);
  };

  const onRemove = () => {
    dispatch({ type: 'TOGGLE_DIALOG' });
    setRemove(!remove);
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
            <MdDelete onClick={onRemove} />
          </Remove>
        </div>
      </AccountBookItemBlock>
      {edit && (
        <AccountBookEdit
          id={id}
          category={category}
          content={content}
          expense={expense}
          onEdit={onEdit}
        />
      )}
      {remove && (
        <RemoveForm>
          <h2>정말 삭제하시겠습니까?</h2>
          <div>
            <button
              type="button"
              className="submit"
              onClick={() => {
                dispatch({ type: 'REMOVE_RECORD', removeId: id, category });
              }}
            >
              확인
            </button>
            <button type="button" className="cancel" onClick={onRemove}>
              취소
            </button>
          </div>
        </RemoveForm>
      )}
    </>
  );
}

export default React.memo(AccountBookItem);

import React from 'react';
import styled from 'styled-components';
import {
  useAccountBookDispatch,
  useAccountBookState,
  useAccountBookNextCategoryId,
} from '../contexts/AccountBookContext';
import useInputs from '../hooks/useInputs';

const EditForm = styled.form`
  background: #f1f3f5;
  padding: 16px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const EditInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 350px;
  font-size: 18px;
  outline: none;
  padding: 12px;
  margin: 0 auto;
  display: block;
`;

const EditButtonBlock = styled.div`
  margin-top: 8px;
  display: flex;

  button {
    width: 200px;
    height: 50px;
    border-radius: 6px;
    font-size: 20px;
    flex: 1;
    margin: 8px;
    background: #ffd43b;
    font-weight: bold;
    color: #495057;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;

    &:hover {
      background: #ffe066;
    }

    &:active {
      background: #fcc419;
    }
  }
`;

function AccountBookEdit({
  id,
  categoryId,
  categoryName,
  content,
  expense,
  onEdit,
}) {
  const [inputs, setInputs, onChange, validateInputs] = useInputs();

  const { inputCategoryName, inputContent, inputExpense } = inputs;
  const { categories } = useAccountBookState();
  const dispatch = useAccountBookDispatch();
  const nextCategoryId = useAccountBookNextCategoryId();

  // 랜덤 색상 발생기
  const randomColor = () =>
    '#' + Math.round(Math.random() * 0xffffff).toString(16);

  const onSubmit = e => {
    e.preventDefault();

    // 유효성 검사
    if (!validateInputs()) return;

    // 카테고리가 변경되지 않음
    if (categoryName === inputCategoryName) {
      dispatch({
        type: 'EDIT_RECORD',
        editId: id,
        editContent: inputContent,
        editExpense: parseInt(inputExpense, 10),
      });
    } else {
      // 카테고리가 변경

      const existCategory = categories.find(
        category => category.name === inputCategoryName
      );
      // 변경된 카테고리가 존재
      if (existCategory) {
        dispatch({
          type: 'EIDT_RECORD_CATEGORY',
          editId: id,
          editContent: inputContent,
          editExpense: parseInt(inputExpense, 10),
          beforeCategoryId: categoryId,
          afterCategoryId: existCategory.id,
        });
      } else {
        // 변경된 카테고리가 존재하지 않음
        dispatch({
          type: 'EDIT_RECORD_ADD_CATEGORY',
          editId: id,
          editContent: inputContent,
          editExpense: parseInt(inputExpense, 10),
          beforeCategoryId: categoryId,
          newCategory: {
            id: nextCategoryId.current,
            name: inputCategoryName,
            color: randomColor(),
            count: 1,
          },
        });

        nextCategoryId.current += 1;
      }
    }

    setInputs({
      inputCategoryName: '',
      inputContent: '',
      inputExpense: '',
    });
    onEdit();
  };

  return (
    <>
      <EditForm onSubmit={onSubmit}>
        <EditInput
          name="inputCategoryName"
          value={inputCategoryName}
          onChange={onChange}
          placeholder={categoryName}
        />
        <EditInput
          name="inputContent"
          value={inputContent}
          onChange={onChange}
          placeholder={content}
        />
        <EditInput
          name="inputExpense"
          value={inputExpense}
          onChange={onChange}
          placeholder={expense.toLocaleString()}
        />
        <EditButtonBlock>
          <button type="submit">완료</button>
          <button type="button" onClick={onEdit}>
            닫기
          </button>
        </EditButtonBlock>
      </EditForm>
    </>
  );
}

export default AccountBookEdit;

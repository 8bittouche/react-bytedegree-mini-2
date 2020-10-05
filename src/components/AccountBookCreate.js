import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd, MdArrowForward } from 'react-icons/md';
import {
  useAccountBookDispatch,
  useAccountBookNextCategoryId,
  useAccountBookNextItemId,
  useAccountBookState,
} from '../contexts/AccountBookContext';
import useInputs from '../hooks/useInputs';

const CreateButton = styled.button`
  background: #0c8599;
  &:hover {
    background: #15aabf;
  }

  &:active {
    background: #0b7285;
  }

  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 40px;
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 16px;
  outline: none;
  border: none;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #f03e3e;

      &:hover {
        background: #ff6b6b;
      }

      &:active {
        background: #c92a2a;
      }

      transform: rotate(45deg);
    `}
`;

const SubmitButton = styled.button`
  background: #74c0fc;
  &:hover {
    background: #a5d8ff;
  }

  &:active {
    background: #4dabf7;
  }

  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 40px;
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 86px;
  outline: none;
  border: none;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const InsertForm = styled.form`
  background: #f1f3f5;
  display: flex;

  padding: 16px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #dee2e6;
`;

const InputBlock = styled.div`
  input {
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 450px;
    font-size: 18px;
    outline: none;
    padding: 12px;
    margin-bottom: 4px;
  }
`;

function AccountBookCreate() {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs, onChange, validateInputs] = useInputs();

  const { inputCategoryName, inputContent, inputExpense } = inputs;
  const { categories } = useAccountBookState();
  const dispatch = useAccountBookDispatch();
  const nextItemId = useAccountBookNextItemId();
  const nextCategoryId = useAccountBookNextCategoryId();

  const onToggle = () => setOpen(!open);

  // 랜덤 색상 발생기
  const randomColor = () =>
    '#' + Math.round(Math.random() * 0xffffff).toString(16);

  const onSubmit = e => {
    e.preventDefault();

    if (!validateInputs()) return;

    const existCategory = categories.find(
      category => category.name === inputCategoryName
    );
    if (existCategory) {
      dispatch({
        type: 'ADD_RECORD',
        record: {
          id: nextItemId.current,
          categoryId: existCategory.id,
          content: inputContent,
          expense: parseInt(inputExpense, 10),
        },
        categoryId: existCategory.id,
      });
    } else {
      const newColor = randomColor();
      dispatch({
        type: 'ADD_RECORD_CATEGORY',
        record: {
          id: nextItemId.current,
          categoryId: nextCategoryId.current,
          content: inputContent,
          expense: parseInt(inputExpense, 10),
        },
        newCategory: {
          id: nextCategoryId.current,
          name: inputCategoryName,
          color: newColor,
          count: 1,
        },
      });

      nextCategoryId.current += 1;
    }

    setInputs({
      inputCategoryName: '',
      inputContent: '',
      inputExpense: '',
    });
    setOpen(false);
    nextItemId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <InputBlock>
              <input
                name="inputCategoryName"
                value={inputCategoryName}
                onChange={onChange}
                placeholder="카테고리를 입력하세요"
              />
              <input
                name="inputContent"
                value={inputContent}
                onChange={onChange}
                placeholder="내용을 입력하세요"
              />
              <input
                name="inputExpense"
                value={inputExpense}
                onChange={onChange}
                placeholder="지출 비용을 입력하세요"
              />
            </InputBlock>
            <SubmitButton>
              <MdArrowForward />
            </SubmitButton>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CreateButton onClick={onToggle} open={open}>
        <MdAdd />
      </CreateButton>
    </>
  );
}

export default React.memo(AccountBookCreate);

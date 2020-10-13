import React from 'react';
import styled from 'styled-components';
import {
  useAccountBookDispatch,
  useAccountBookState,
} from '../contexts/AccountBookContext';

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

const DialogWrapper = styled.div`
  display: ${({ dialogOn }) => (dialogOn ? 'block' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: black;
  opacity: 0.3;
  width: 100%;
  height: 100%;
`;

function AccountBookRemove({ id }) {
  const dispatch = useAccountBookDispatch();
  const { dialogOn } = useAccountBookState();

  return (
    <>
      <RemoveForm>
        <h2>정말 삭제하시겠습니까?</h2>
        <div>
          <button
            type="button"
            className="submit"
            onClick={() => dispatch({ type: 'REMOVE_RECORD', removeId: id })}
          >
            확인
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
          >
            취소
          </button>
        </div>
      </RemoveForm>
      <DialogWrapper dialogOn={dialogOn} />
    </>
  );
}

export default AccountBookRemove;

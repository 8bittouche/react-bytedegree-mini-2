import React from 'react';
import styled from 'styled-components';
import {
  useAccountBookDispatch,
  useAccountBookState,
} from '../contexts/AccountBookContext';

const AccountBookCategoryBlock = styled.div`
  padding: 24px 0;
  font-weight: bold;
  font-size: 24px;
  border-bottom: 2px solid #ced4da;

  .category {
    float: right;
  }

  select {
    margin-left: 8px;
    border-radius: 4px;
    height: 32px;
    font-size: 16px;
    width: 85px;
    background: #868e96;
    color: white;
    border: none;
    outline: none;
  }
`;

function AccountBookCategory() {
  const dispatch = useAccountBookDispatch();
  const { categories } = useAccountBookState();

  const onChange = e => {
    const categoryId = categories.filter(
      category => category.name === e.target.value
    )[0].id;
    dispatch({ type: 'CHANGE_CATEGORY', categoryId });
  };

  return (
    <AccountBookCategoryBlock>
      <div className="category">
        카테고리별로 보기:
        <select onChange={onChange}>
          {categories.map(
            category =>
              category.count > 0 && (
                <option key={category.id}>{category.name}</option>
              )
          )}
        </select>
      </div>
    </AccountBookCategoryBlock>
  );
}

export default React.memo(AccountBookCategory);

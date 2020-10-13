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
    console.log(e.target.value);
    dispatch({ type: 'CHANGE_CATEGORY', categoryId: Number(e.target.value) });
  };

  return (
    <AccountBookCategoryBlock>
      <div className="category">
        카테고리별로 보기:
        <select onChange={onChange}>
          {categories.map(
            category =>
              category.count > 0 && (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
          )}
        </select>
      </div>
    </AccountBookCategoryBlock>
  );
}

export default React.memo(AccountBookCategory);

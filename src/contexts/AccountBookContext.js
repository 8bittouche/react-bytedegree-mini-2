import React, { useReducer, createContext, useRef } from 'react';
import { useContext } from 'react';

const initialState = {
  currentCategory: 0,
  dialogOn: false,

  records: [
    {
      id: 1,
      categoryId: 1,
      content: '용개반점',
      expense: 7000,
    },
    {
      id: 2,
      categoryId: 2,
      content: '양배추',
      expense: 5000,
    },
    {
      id: 3,
      categoryId: 3,
      content: '택시비',
      expense: 20000,
    },
    {
      id: 4,
      categoryId: 4,
      content: '관리비',
      expense: 100000,
    },
    {
      id: 5,
      categoryId: 5,
      content: '병원 진료',
      expense: 7000,
    },
  ],

  categories: [
    {
      id: 0,
      name: '전체',
      count: 999999, // categories 배열의 filter 사용 시 '전체' 카테고리는 제외시키기 위한 용도
    },
    {
      id: 1,
      name: '식사',
      color: '#ffec99',
      count: 1,
    },
    {
      id: 2,
      name: '식료품',
      color: '#d8f5a2',
      count: 1,
    },
    {
      id: 3,
      name: '교통',
      color: '#ffd8a8',
      count: 1,
    },
    {
      id: 4,
      name: '생활',
      color: '#d0bfff',
      count: 1,
    },
    {
      id: 5,
      name: '의료',
      color: '#a5d8ff',
      count: 1,
    },
  ],
};

function accountBookReducer(state, action) {
  const { records, categories } = state;

  switch (action.type) {
    case 'TOGGLE_DIALOG':
      return {
        ...state,
        dialogOn: !state.dialogOn,
      };
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        currentCategory: action.categoryId,
      };
    case 'ADD_RECORD':
      return {
        ...state,
        records: records.concat(action.record),
        categories: categories.map(category =>
          category.id === action.categoryId
            ? {
                ...category,
                count: category.count + 1,
              }
            : category
        ),
      };
    case 'ADD_RECORD_CATEGORY':
      return {
        ...state,
        records: records.concat(action.record),
        categories: categories.concat(action.newCategory),
      };
    case 'REMOVE_RECORD':
      return {
        ...state,
        records: records.filter(record => record.id !== action.removeId),
        categories: categories
          .map(category =>
            category.id === action.categoryId
              ? {
                  ...category,
                  count: category.count - 1,
                }
              : category
          )
          .filter(category => category.count > 0),
        dialogOn: !state.dialogOn,
      };
    case 'EDIT_RECORD':
      return {
        ...state,
        records: records.map(record =>
          record.id === action.editId
            ? {
                ...record,
                content: action.editContent,
                expense: action.editExpense,
              }
            : record
        ),
      };
    case 'EIDT_RECORD_CATEGORY':
      return {
        ...state,
        records: records.map(record =>
          record.id === action.editId
            ? {
                ...record,
                categoryId: action.afterCategoryId,
                content: action.editContent,
                expense: action.editExpense,
              }
            : record
        ),
        categories: categories.map(category =>
          category.id === action.beforeCategoryId
            ? { ...category, count: category.count - 1 }
            : category.id === action.afterCategoryId
            ? { ...category, count: category.count + 1 }
            : category
        ),
      };
    case 'EDIT_RECORD_ADD_CATEGORY':
      return {
        ...state,
        records: records.map(record =>
          record.id === action.editId
            ? {
                ...record,
                categoryId: action.newCategory.id,
                content: action.editContent,
                expense: action.editExpense,
              }
            : record
        ),
        categories: categories
          .map(category =>
            category.id === action.beforeCategoryId
              ? { ...category, count: category.count - 1 }
              : category
          )
          .concat(action.newCategory),
      };
    default:
      return state;
  }
}

const AccountBookStateContext = createContext();
const AccountBookDispatchContext = createContext();
const AccountBookNextItemIdContext = createContext();
const AccountBookNextCategoryIdContext = createContext();

export function AccountBookProvider({ children }) {
  const [state, dispatch] = useReducer(accountBookReducer, initialState);
  const nextItemId = useRef(6);
  const nextCategoryId = useRef(6);

  return (
    <AccountBookStateContext.Provider value={state}>
      <AccountBookDispatchContext.Provider value={dispatch}>
        <AccountBookNextItemIdContext.Provider value={nextItemId}>
          <AccountBookNextCategoryIdContext.Provider value={nextCategoryId}>
            {children}
          </AccountBookNextCategoryIdContext.Provider>
        </AccountBookNextItemIdContext.Provider>
      </AccountBookDispatchContext.Provider>
    </AccountBookStateContext.Provider>
  );
}

export function useAccountBookState() {
  const context = useContext(AccountBookStateContext);
  if (!context) {
    throw new Error('Cannot find AccountProvider');
  }
  return context;
}

export function useAccountBookDispatch() {
  const context = useContext(AccountBookDispatchContext);
  if (!context) {
    throw new Error('Cannot find AccountProvider');
  }
  return context;
}

export function useAccountBookNextItemId() {
  const context = useContext(AccountBookNextItemIdContext);
  if (!context) {
    throw new Error('Cannot find AccountProvider');
  }
  return context;
}

export function useAccountBookNextCategoryId() {
  const context = useContext(AccountBookNextCategoryIdContext);
  if (!context) {
    throw new Error('Cannot find AccountProvider');
  }
  return context;
}

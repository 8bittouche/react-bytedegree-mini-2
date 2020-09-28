import React from 'react';
import { createGlobalStyle } from 'styled-components';
import AccountBookTemplate from './components/AccountBookTemplate';
import AccountBookHead from './components/AccountBookHead';
import AccountBookCategory from './components/AccountBookCategory';
import AccountBookList from './components/AccountBookList';
import AccountBookCreate from './components/AccountBookCreate';
import { AccountBookProvider } from './AccountBookContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <AccountBookProvider>
        <GlobalStyle />
        <AccountBookTemplate>
          <AccountBookHead></AccountBookHead>
          <AccountBookCategory></AccountBookCategory>
          <AccountBookList></AccountBookList>
          <AccountBookCreate></AccountBookCreate>
        </AccountBookTemplate>
      </AccountBookProvider>
    </>
  );
}

export default App;

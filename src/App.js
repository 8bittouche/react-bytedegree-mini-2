import React from 'react';
import { createGlobalStyle } from 'styled-components';
import AccountBookTemplate from './components/AccountBookTemplate';
import { AccountBookProvider } from './contexts/AccountBookContext';

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
        <AccountBookTemplate />
      </AccountBookProvider>
    </>
  );
}

export default App;

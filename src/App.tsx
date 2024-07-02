import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import RepositoryPage from './pages/RepositoryPage.tsx';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer `,
  },
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repository/:owner/:name" element={<RepositoryPage />} />
        </Routes>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

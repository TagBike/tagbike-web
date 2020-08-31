import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyles from '@iso/assets/styles/globalStyle';
import { store } from './redux/store';
import Boot from './redux/boot';
import Routes from './router';
import AppProvider from './AppProvider';
import { Spin, Icon } from 'antd';

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </AppProvider>
  </Provider>
);
Boot()
  .then(() => App())
  .catch(error => console.error(error));

Spin.setDefaultIndicator(<Icon type='file'/>);

export default App;

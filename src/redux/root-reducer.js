import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import Box from '@iso/redux/box/reducer';
//import Invoices from '@iso/redux/invoice/reducer';
///import Articles from '@iso/redux/articles/reducers';
//import Customers from '@iso/redux/customers/reducers';
//import Investors from '@iso/redux/investors/reducers';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';

export default combineReducers({
  Auth,
  App,
  Box,
  //Customers,
  ThemeSwitcher,
  //Invoices,
  LanguageSwitcher,
  //Articles,
  //Investors,
});

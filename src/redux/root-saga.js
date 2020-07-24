import { all } from 'redux-saga/effects';
import authSagas from '@iso/redux/auth/saga';
import invoicesSagas from '@iso/redux/invoice/saga';
import articles from '@iso/redux/articles/sagas';
import investors from '@iso/redux/investors/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(), 
    invoicesSagas(),
    articles(),
    investors(),
  ]);
}

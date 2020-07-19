import antdBr from 'antd/lib/locale-provider/pt_BR';
import appLocaleData from 'react-intl/locale-data/br';
import brMessages from '../locales/pt_BR.json';
// import { getKeys, getValues } from '../conversion';
// getValues(enMessages);

const BrLang = {
  messages: {
    ...brMessages,
  },
  antd: antdBr,
  locale: 'br',
  data: appLocaleData,
};
export default BrLang;

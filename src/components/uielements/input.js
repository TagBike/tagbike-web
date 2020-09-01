import { Input, InputNumber } from 'antd';
import MaskedInput from 'antd-mask-input'
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '@iso/lib/helpers/rtl';
const { Search, TextArea, Group, Password } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

const WDStyledPassword = InputWrapper(Password);
const InputPassword = WithDirection(WDStyledPassword);

const WDStyledNumber = InputWrapper(InputNumber);
const Number = WithDirection(WDStyledNumber);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

const WDInputMasked = InputWrapper(MaskedInput);
const InputMasked = WithDirection(WDInputMasked)

export default StyledInput;
export { InputSearch, InputGroup, Textarea, InputPassword, Number, InputMasked};

import React, {useState} from 'react';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';

const Option = SelectOption;

export default function() {
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [telefone, setTelefone] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);
 }


  return (
    <BillingFormWrapper className="isoBillingForm">
       <form onSubmit={handleSubmit}>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Nome</label>
            <Input type="text" name="name" size="large" placeholder="Informe o nome Completo." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Email</label>
            <Input type="email" name="email" size="large" placeholder="Informe o Email." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>CPF</label>
            <Input type="text" name="cpf" size="large" placeholder="Informe o CPF." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>RG</label>
            <Input type="text" name="rg" size="large" placeholder="Informe o RG." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Telefone</label>
            <Input type="text" name="telefone" size="large" placeholder="Informe o Telefone." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>WhatsApp</label>
            <Input type="text" name="whatsapp" size="large" placeholder="Informe o WhatsApp." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Logradouro</label>
            <Input type="text" name="logradouro" size="large" placeholder="Informe o Logradouro." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Número</label>
            <Input type="text" name="numero" size="large" placeholder="Informe o Número." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Bairro</label>
            <Input type="text" name="bairro" size="large" placeholder="Informe o Bairro." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>CEP</label>
            <Input type="text" name="cep" size="large" placeholder="Informe o CEP." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Cidade</label>
            <Input type="text" name="cidade" size="large" placeholder="Informe a Cidade." />
          </InputBoxWrapper>
        </div>
      </form> 
    </BillingFormWrapper>
  );
}

import React, {useState} from 'react';
import Input from '@iso/components/uielements/input';
import {Button} from '@iso/components/utility/Buttons';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import { direction } from '@iso/lib/helpers/rtl';
import UseApi from '../../../helpers/BikeApi';

const Option = SelectOption;

export default function() {
  const api = UseApi();

  const margin = {
    margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
  };
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [phone, setPhone] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);

        const json = await api.createClient(name, cpf, email, password, cep, uf, city, neighborhood, 
        address, number, complement, phone, cellphone, birthday);

      if(json.error == '') {
        console.log('ERROR'+json)
      } else {
        window.location.href = '/customers';
      }

      setDisabled(false);
  }

  return (
    <BillingFormWrapper className="isoBillingForm">
       <form onSubmit={handleSubmit}>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Nome</label>
            <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} size="large" placeholder="Informe o nome Completo." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
        <InputBoxWrapper className="isoInputBox">
            <label>CPF</label>
            <Input type="text" value={cpf} onChange={(e)=>setCpf(e.target.value)} size="large" placeholder="Informe o CPF." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Email</label>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} size="large" placeholder="Informe o Email." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Senha</label>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} size="large" placeholder="Informe o RG." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Cep</label>
            <Input type="text" value={cep} onChange={(e)=>setCep(e.target.value)} size="large" placeholder="Informe o Cep." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Estado</label>
            <Input type="text" value={uf} onChange={(e)=>setUf(e.target.value)} size="large" placeholder="Informe o Estado." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Cidade</label>
            <Input type="text" value={city} onChange={(e)=>setCity(e.target.value)} size="large" placeholder="Informe a Cidade." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Bairro</label>
            <Input type="text" value={neighborhood} onChange={(e)=>setNeighborhood(e.target.value)} size="large" placeholder="Informe o Bairro." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Logradouro</label>
            <Input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} size="large" placeholder="Informe o Logradouro." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Número</label>
            <Input type="text" value={number} onChange={(e)=>setNumber(e.target.value)} size="large" placeholder="Informe a Número." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Complemento</label>
            <Input type="text" value={complement} onChange={(e)=>setComplement(e.target.value)} size="large" placeholder="Informe o Complemento." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Telefone</label>
            <Input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} size="large" placeholder="Informe a Número de Telefone." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Celular</label>
            <Input type="text" value={cellphone} onChange={(e)=>setCellphone(e.target.value)} size="large" placeholder="Informe o Número de Celular." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Data de Nascimento</label>
            <Input type="date" value={birthday} onChange={(e)=>setBirthday(e.target.value)} size="large"  />
          </InputBoxWrapper>
        </div>
        <div className="isoOrderTableFooter">
            <Button type="default">Cancelar</Button>
            <Button  style={margin} type="primary" htmlType="submit">Salvar</Button>
        </div>
      </form> 
    </BillingFormWrapper>
  );
}

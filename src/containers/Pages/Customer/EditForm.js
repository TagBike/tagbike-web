import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import UseApi from '../../../helpers/BikeApi';

const Option = SelectOption; 

const api = UseApi();

export default function() {
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);

  const [stateList, setStateList] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const getClientById = async (param) => {
        const clients = await api.getClientById(param);
          setStateList(clients);
    }

    getClientById(id);
  }, []);

  const dataSource = stateList;

  const [name, setName] = useState([
    {
      name: ['name'],
      value: dataSource.name
    }
  ]);
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

  console.log(dataSource);
  
  return (
    <BillingFormWrapper className="isoBillingForm">
       <form onSubmit={handleSubmit}>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Nome</label>
            <Input  
              value={name.value}
              name="name" 
              size="large" 
              placeholder="Nome Completo" 
            />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Email</label>
            <Input 
              value={dataSource.email}
              type="email" 
              name="email" 
              size="large" 
              placeholder="E-Mail." 
            />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>CPF</label>
            <Input 
              value={dataSource.cpf}
              mask="999.999.999-99"
              type="text" 
              name="cpf" 
              size="large"
              placeholder="CPF"
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>RG</label>
            <Input 
              value={dataSource.rg}
              name="rg" 
              size="large" 
              placeholder="RG" />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Telefone</label>
            <Input 
              value={dataSource.phone}
              name="telefone" 
              size="large" 
              placeholder="Telefone" 
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Celular</label>
            <Input
              value={dataSource.cellphone}
              name="whatsapp" 
              size="large" 
              placeholder="Número Celular" 
            />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Logradouro</label>
            <Input 
              value={dataSource.address}
              name="logradouro" 
              size="large" 
              placeholder="Logradouro" 
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Número</label>
            <Input 
              value={dataSource.number}
              name="numero" 
              size="large" 
              placeholder="Número" 
            />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Complemento</label>
            <Input 
              value={dataSource.complement}
              name="complement" 
              size="large" 
              placeholder="Complemento" 
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Bairro</label>
            <Input 
              value={dataSource.neighborhood} 
              name="bairro" 
              size="large" 
              placeholder="Bairro" 
            />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          
          <InputBoxWrapper className="isoInputBox">
            <label>Cidade</label>
            <Input 
              value={dataSource.city} 
              name="cidade" 
              size="large" 
              placeholder="Cidade" 
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Estado</label>
            <Input 
              value={dataSource.uf} 
              name="uf" 
              size="large" 
              placeholder="Estado" 
            />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>CEP</label>
            <Input
              value={dataSource.cep} 
              name="cep" 
              size="large" 
              placeholder="CEP" 
            />
          </InputBoxWrapper>
        </div>

        <div className="isoOrderTableFooter">
          {/* <Button disabled={disabled} style={{ marginRight: 20 }} class="ui primary button">Salvar</Button> */}
          <Button disabled={disabled}>Salvar</Button>
        </div>
      </form> 
    </BillingFormWrapper>
  );
}

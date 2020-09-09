import React, {useState} from 'react';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { FormWrapper } from '../Page.styles';

const Option = SelectOption;

export default function() {
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);
  }


  return (
    <FormWrapper className="isoBillingForm">
       <form onSubmit={handleSubmit}>
        <div className="isoInputFieldset">
          <label>Nome</label>
          <Input type="text" name="name" size="large" placeholder="Informe o nome Completo." />
        </div>
        <div className="isoInputFieldset">
          <label>Email</label>
          <Input type="email" name="email" size="large" placeholder="Informe o Email." />
        </div>
        <div className="isoInputFieldset">         
          <label>CPF</label>
          <Input type="text" name="cpf" size="large" placeholder="Informe o CPF." />          
          <label>RG</label>
          <Input type="text" name="rg" size="large" placeholder="Informe o RG." />
        </div>
        <div className="isoInputFieldset">
          <label>Telefone</label>
          <Input type="text" name="telefone" size="large" placeholder="Informe o Telefone." />
          <label>WhatsApp</label>
          <Input type="text" name="whatsapp" size="large" placeholder="Informe o WhatsApp." />
        </div>

        <div className="isoInputFieldset">
          <label>Logradouro</label>
          <Input type="text" name="logradouro" size="large" placeholder="Informe o Logradouro." />
        </div>

        <div className="isoInputFieldset">
          <label>Número</label>
          <Input type="text" name="numero" size="large" placeholder="Informe o Número." />
          <label>Bairro</label>
          <Input type="text" name="bairro" size="large" placeholder="Informe o Bairro." />
        </div>

        <div className="isoInputFieldset">
          <label>CEP</label>
          <Input type="text" name="cep" size="large" placeholder="Informe o CEP." />
          <label>Cidade</label>
          <Input type="text" name="cidade" size="large" placeholder="Informe a Cidade." />
        </div>

        <div className="isoInputFieldset"> 
          <label>Login</label>
          <Input type="text" name="login" size="large" placeholder="Informe o Login." />
          <label>Senha</label>
          <Input type="password" name="senha" size="large" placeholder="Informe a Senha." />
        </div>
        <div className="isoOrderTableFooter">
          {/* <Button disabled={disabled} style={{ marginRight: 20 }} class="ui primary button">Salvar</Button> */}
          <button disabled={disabled}>Salvar</button>
        </div>
      </form> 
    </FormWrapper>
  );
}

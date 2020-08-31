import React, {useState} from 'react';
import Input from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import {Button} from '@iso/components/utility/Buttons';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import { direction } from '@iso/lib/helpers/rtl';
import {useHistory} from 'react-router-dom';
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../helpers/BikeApi';

const Option = SelectOption;

export default function() {

  
  const history = useHistory();

  const margin = {
    margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
  };

  const handleOnChange = checkedValues => {};
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sexy, setSexy] = useState('');

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);

        let errors = [];

        if (errors.length === 0) {

          if (name == '') {
            errors.push(toast.error('Por favor preenchar o campo nome!'));
          }
          if (email == '') {
            errors.push(toast.error('Por favor preenchar o campo email!'));
          }
          if (password == '') {
            errors.push(toast.error('Por favor preenchar o campo senha!'));
          }
          if (uf == '') {
            errors.push(toast.error('Por favor preenchar o campo estado!'));
          }
          if (city == '') {
            errors.push(toast.error('Por favor preenchar o campo cidade!'));
          }
          if (cellphone == '') {
            errors.push(toast.error('Por favor preenchar o campo celular!'));
          }
          if (cpf == '') {
            errors.push(toast.error('Por favor preenchar o campo cpf!'));
          }
          if (birthday == '') {
            errors.push(toast.error('Por favor preenchar o campo data de aniversario!'));
          }
          if (sexy == '') {
            errors.push(toast.error('Por favor preenchar o campo Sexo!'));
          }

          const json = await api.createUser(name, email, password, uf, city, cellphone, cpf, birthday, sexy);

           if (json.error == '' ) {
              console.log('ERROR'+json)
              return;
          } else {
            toast.success('Usuário adicionador com sucesso!');

            setTimeout(() => {
              window.location.href = './';
              }, 3000)
           }
          
        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);

        
 }


  return (
    <BillingFormWrapper className="isoBillingForm">
      <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
       <form onSubmit={handleSubmit} >
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Nome</label>
            <Input  type="text" value={name} onChange={(e)=>setName(e.target.value)} size="large" placeholder="Informe o nome Completo." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Email</label>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} size="large" placeholder="Informe o Email." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Senha</label>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} size="large" placeholder="Informe o CPF." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Estado</label>
            <Select value={uf}  onChange={e=>setUf(e.target.value)} size="large" placeholder="Selecione o Tipo do freio">
            <Option value="AC">Acre</Option>
            <Option value="AL">Alagoas</Option>
            <Option value="AP">Amapá</Option>
            <Option value="AM">Amazonas</Option>
            <Option value="BA">Bahia</Option>
            <Option value="CE">Ceará</Option>
            <Option value="DF">Distrito Federal</Option>
            <Option value="ES">Espírito Santo</Option>
            <Option value="GO">Goiás</Option>
            <Option value="MA">Maranhão</Option>
            <Option value="MT">Mato Grosso</Option>
            <Option value="MS">Mato Grosso do Sul</Option>
            <Option value="MG">Minas Gerais</Option>
            <Option value="PA">Pará</Option>
            <Option value="PB">Paraíba</Option>
            <Option value="PR">Paraná</Option>
            <Option value="PE">Pernambuco</Option>
            <Option value="PI">Piauí</Option>
            <Option value="RJ">Rio de Janeiro</Option>
            <Option value="RN">Rio Grande do Norte</Option>
            <Option value="RS">Rio Grande do Sul</Option>
            <Option value="RO">Rondônia</Option>
            <Option value="RR">Roraima</Option>
            <Option value="SC">Santa Catarina</Option>
            <Option value="SP">São Paulo</Option>
            <Option value="SE">Sergipe</Option>
            <Option value="TO">Tocantins</Option>
            <Option value="EX">Estrangeiro</Option>
            </Select>
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Cidade</label>
            <Input type="text"  value={city} onChange={(e)=>setCity(e.target.value)} size="large" placeholder="Informe o Telefone." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Celular</label>
            <Input type="text"  value={cellphone} onChange={(e)=>setCellphone(e.target.value)} size="large" placeholder="Informe o WhatsApp." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>CPF</label>
            <Input type="text" value={cpf} onChange={(e)=>setCpf(e.target.value)} size="large" placeholder="Informe o Logradouro." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Data de aniversario</label>
            <Input type="date" value={birthday} onChange={(e)=>setBirthday(e.target.value)} size="large" placeholder="Informe o Número." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Sexo</label>
            <Select value={sexy} onChange={(e)=>setSexy(e.target.value)} size="large" placeholder="Selecione o sexo">
            <Option value="0">Masculino</Option>
            <Option value="1">Feminino</Option>
          </Select>
          </InputBoxWrapper>
        </div>
        <div className="isoOrderTableFooter">
            <Button  style={margin} type="submit" primary>Salvar</Button>
            <Button type="reset">Cancelar</Button>
        </div>
      </form> 
    </BillingFormWrapper>
  );
}

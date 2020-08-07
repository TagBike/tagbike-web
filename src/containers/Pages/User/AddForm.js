import React, {useState} from 'react';
import Input from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import {Button} from '@iso/components/utility/Buttons';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import { direction } from '@iso/lib/helpers/rtl';
import {useHistory} from 'react-router-dom';
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseApi from '../../../helpers/BikeApi';

const Option = SelectOption;

export default function() {

  const api = UseApi();
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
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
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
            <option value="0">Masculino</option>
            <option value="1">Feminino</option>
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

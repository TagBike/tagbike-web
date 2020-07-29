import React, {useState} from 'react';
import Input from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import {Button} from '@iso/components/utility/Buttons';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import { direction } from '@iso/lib/helpers/rtl';
import {useHistory} from 'react-router-dom';
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Password from 'antd/lib/input/Password';

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
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [telefone, setTelefone] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);

        let errors = [];

        if (errors.length === 0) {

          const fData = new FormData();
          fData.append('name', name);
          fData.append('email', email);
          fData.append('cpf', cpf);
          fData.append('rg', rg);
          fData.append('telefone', telefone);
          fData.append('whatsApp', whatsApp);
          fData.append('logradouro', logradouro);
          fData.append('numero', numero);
          fData.append('bairro', bairro);
          fData.append('cep', cep);
          fData.append('cidade', cidade);
          fData.append('login', login);
          fData.append('senha', senha);

          if (name == '') {
            errors.push(toast.error('Por favor preenchar o campo nome!'));
          }
          if (email == '') {
            errors.push(toast.error('Por favor preenchar o campo email!'));
          }
          if (cpf == '') {
            errors.push(toast.error('Por favor preenchar o campo CPF!'));
          }
          if (rg == '') {
            errors.push(toast.error('Por favor preenchar o campo RG!'));
          }
          if (telefone == '') {
            errors.push(toast.error('Por favor preenchar o campo telefone!'));
          }
          if (whatsApp == '') {
            errors.push(toast.error('Por favor preenchar o campo whatsapp!'));
          }
          if (logradouro == '') {
            errors.push(toast.error('Por favor preenchar o campo logradouro!'));
          }
          if (numero == '') {
            errors.push(toast.error('Por favor preenchar o campo número!'));
          }
          if (bairro == '') {
            errors.push(toast.error('Por favor preenchar o campo bairro!'));
          }
          if (cep == '') {
            errors.push(toast.error('Por favor preenchar o campo CEP!'));
          }
          if (cidade == '') {
            errors.push(toast.error('Por favor preenchar o campo cidade!'));
          }
          if (login == '') {
            errors.push(toast.error('Por favor preenchar o campo loogin!'));
          }
          if (senha == '') {
            errors.push(toast.error('Por favor preenchar o campo senha!'));
          }

          const json = fData;

           if (!json.error) {
              history.push();
              return;
          } else {
              setError(json.error);
           }
          
        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);
        toast.success('Usuário adicionador com sucesso!');

        setTimeout(() => {
          history.push(`users`);
          }, 6000)
        
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
            <label>CPF</label>
            <Input type="text" value={cpf} onChange={(e)=>setCpf(e.target.value)} size="large" placeholder="Informe o CPF." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>RG</label>
            <Input type="text" value={rg} onChange={(e)=>setRg(e.target.value)} size="large" placeholder="Informe o RG." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Telefone</label>
            <Input type="text"  value={telefone} onChange={(e)=>setTelefone(e.target.value)} size="large" placeholder="Informe o Telefone." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>WhatsApp</label>
            <Input type="text"  value={whatsApp} onChange={(e)=>setWhatsApp(e.target.value)} size="large" placeholder="Informe o WhatsApp." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Logradouro</label>
            <Input type="text" value={logradouro} onChange={(e)=>setLogradouro(e.target.value)} size="large" placeholder="Informe o Logradouro." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Número</label>
            <Input type="text" value={numero} onChange={(e)=>setNumero(e.target.value)} size="large" placeholder="Informe o Número." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Bairro</label>
            <Input type="text" value={bairro} onChange={(e)=>setBairro(e.target.value)} size="large" placeholder="Informe o Bairro." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>CEP</label>
            <Input type="text" value={cep} onChange={(e)=>setCep(e.target.value)} size="large" placeholder="Informe o CEP." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Cidade</label>
            <Input type="text" value={cidade} onChange={(e)=>setCidade(e.target.value)} size="large" placeholder="Informe a Cidade." />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset"> 
          <InputBoxWrapper className="isoInputBox">
            <label>Login</label>
            <Input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} size="large" placeholder="Informe o Login." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Senha</label>
            <Input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} size="large" placeholder="Informe a Senha." />
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

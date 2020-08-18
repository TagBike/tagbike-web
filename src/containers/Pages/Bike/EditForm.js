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
            <label>Número de série</label>
            <Input type="text" name="cpf" size="large" placeholder="Informe o Número de série." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Tipo da bike</label>
            <Select placeholder="Informe o Tipo da bike.">
            <option value="Bmx Cross">Bmx | Cross</option>
            <option value="Dobravel">Dobrável</option>
            <option value="Downhill">Downhill</option>
            <option value="Eletrica">Elétrica</option>
            <option value="Estrada Speed Road">Estrada | Speed | Road</option>
            <option value="Handbike">Handbike</option>
            <option value="Hibrida">Híbrida</option>
            <option value="Infantil">Infantil</option>
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Scooter">Scooter</option>
            <option value="Triatlo">Triatlo</option>
            <option value="Triciclo">Triciclo</option>
            <option value="Urbana">Urbana</option>
            <option value="Outros">Outros</option>
          </Select>
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Marca</label>
            <Input type="text" name="marca" size="large" placeholder="Informe a Marca." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Modelo</label>
            <Input type="text" name="telefone" size="large" placeholder="Informe o Modelo." />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Cor</label>
            <Input type="text" name="whatsapp" size="large" placeholder="Informe a Cor (Ex: preta/branca)." />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Câmbio dianteiro</label>
            <Select placeholder="Selecione o Câmbio dianteiro">
            <option value="1">1 Velocidade</option>
            <option value="2">2 Velocidades</option>
            <option value="3">3 Velocidades</option>
          </Select>
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Câmbio traseiro</label>
            <Select placeholder="Selecione o Câmbio traseiro">
            <option value="1">1 Velocidade</option>
            <option value="2">2 Velocidades</option>
            <option value="3">3 Velocidades</option>
            <option value="4">4 Velocidades</option>
            <option value="5">5 Velocidades</option>
            <option value="6">6 Velocidades</option>
            <option value="7">7 Velocidade</option>
            <option value="8">8 Velocidades</option>
            <option value="9">9 Velocidades</option>
            <option value="10">10 Velocidades</option>
            <option value="11">11 Velocidade</option>
            <option value="12">12 Velocidades</option>
            <option value="13">13 Velocidades</option>
            <option value="14">14 Velocidade</option>
            <option value="15">15 Velocidades</option>
            <option value="16">16 Velocidades</option>
            <option value="17">17 Velocidade</option>
            <option value="18">18 Velocidades</option>
            <option value="3">3 Velocidades</option>
            <option value="19">19 Velocidades</option>
            <option value="20">20 Velocidade</option>
            <option value="21">21 Velocidades</option>
            <option value="22">22 Velocidades</option>
            <option value="23">23 Velocidade</option>
            <option value="24">24 Velocidades</option>
            <option value="25">25 Velocidades</option>
            <option value="26">26 Velocidade</option>
            <option value="27">27 Velocidades</option>
            <option value="28">28 Velocidades</option>
            <option value="29">29 Velocidades</option>
            <option value="30">30 Velocidades</option>
          </Select>
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Tipo do freio</label>
            <Select placeholder="Selecione o Tipo do freio">
            <option value="1">Freio a disco hidráulico</option>
            <option value="2">Freio a disco mecânico</option>
            <option value="3">Freio V break</option>
            <option value="4">Outros</option>
          </Select>
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Tipo de suspensão</label>
            <Select placeholder="Selecione o Tipo de suspensão">
            <option value="1">Ar/Óleo</option>
            <option value="2">Elastômero/Óleo</option>
            <option value="3">Mola</option>
            <option value="4">Outros</option>
          </Select>
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Tipo da roda/aro</label>
            <Select placeholder="Selecione o Tipo da roda/aro">
            <option value="Aro 20">Aro 20</option>
            <option value="Aro 26">Aro 26</option>
            <option value="Aro 27,5">Aro 27,5</option>
            <option value="Aro 29">Aro 29</option>
            <option value="Aro 700">Aro 700</option>
            <option value="Outro">Outro</option>
          </Select>
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>Tipo do garfo</label>
            <Select placeholder="Selecione o Tipo do garfo">
            <option value="Aço">Aço</option>
            <option value="Alumínio">Alumínio</option>
            <option value="Carbono">Carbono</option>
            <option value="Outro">Outro</option>
          </Select>
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>Tipo de quadro</label>
            <Select placeholder="Selecione o Tipo do quadro">
            <option value="Aço">Aço</option>
            <option value="Alumínio">Alumínio</option>
            <option value="Carbono">Carbono</option>
            <option value="Outro">Outro</option>
          </Select>
          </InputBoxWrapper>
        </div>

        <div className="isoOrderTableFooter">
          {/* <Button disabled={disabled} style={{ marginRight: 20 }} class="ui primary button">Salvar</Button> */}
          <button disabled={disabled}>Salvar</button>
        </div>
      </form> 
    </BillingFormWrapper>
  );
}

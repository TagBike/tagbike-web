import React, { useState } from 'react';
import Input from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { Button } from '@iso/components/utility/Buttons';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import { direction } from '@iso/lib/helpers/rtl';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../helpers';

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
    const [qrCode, setQrCode] = useState('');

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);

        let errors = [];

        if (errors.length === 0) {

          if (name === '') {
            errors.push(toast.error('Por favor preenchar o campo nome!'));
          }
          if (qrCode === '') {
            errors.push(toast.error('Por favor preenchar o campo código!'));
          }

          const json = await api.bike.createTag(name, qrCode);

           if (json.error == '' ) {
              console.log('ERROR'+json)
              return;
          } else {
            toast.success('Etiqueta adicionada com sucesso!');

            setTimeout(() => {
              window.location.href = './';
              }, 2000)
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
            <label>Código</label>
            <Input  type="text" value={qrCode} onChange={(e)=>setQrCode(e.target.value)} size="large" placeholder="Informe o nome Completo." />
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

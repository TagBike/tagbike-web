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

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setDisabled(true);

        let errors = [];

        if (errors.length === 0) {

          if (name == '') {
            errors.push(toast.error('Por favor preenchar o campo nome!'));
          }

          const json = await api.createPlan(name);

           if (json.error == '' ) {
              console.log('ERROR'+json)
              return;
          } else {
            toast.success('Plano adicionador com sucesso!');

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
            <Input 
              value={name} 
              onChange={(e)=> setName(e.target.value)} 
              size="large" placeholder="Nome Plano" />
          </InputBoxWrapper>
        </div>
        <div className="isoOrderTableFooter">
            <Button type="reset">Cancelar</Button>
            <Button  style={margin} type="submit" primary>Salvar</Button>
        </div>
      </form> 
    </BillingFormWrapper>
  );
}

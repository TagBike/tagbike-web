import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputPassword, Textarea } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import api from '../../../helpers';

const { Option }  = SelectOption; 



export default function() {
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [data, setData] = useState([]);

  let { id } = useParams();

  const onFinish = async (values) =>  {

    const response = await api.bike.createPlan(values);
    if(response === "sucess") {
      setRedirect(true);
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao salvar o plano', response);
    }
      
    //setDisabled(true);
  }

  useEffect(() => {
    const getPlanById = async () => {
      let response = await api.bike.getPlanById(id);
      setData(response);
    }

    getPlanById();
  }, []);
  
  console.log(data);

  const [form] = Form.useForm();

  
  if(redirect) {
    return <Redirect 
              to={{
                pathname: "/plans",
                state: {response: "success" }
              }}
            />

  }

  if(data.length === 0) {
    return <BillingFormWrapper> Nenhum dado encontrado para o plano.</BillingFormWrapper>;
  }

  return (
    <BillingFormWrapper>
      <Form 
        layout="vertical"
        initialValues={{
          name: data.name,
          price: data.price,
          description: data.description

        }}
        onFinish={onFinish}>
      
        <Form.Item
          name="name"
          label="Nome Plano"
          rules={[
            {
              required: true,
              message: 'Insira seu Nome do Plano!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
        >
          <Textarea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Preço"
          rules={[
            {
              required: true,
              message: 'Insira o preço do plano',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Salvar</Button>
      </Form> 
    </BillingFormWrapper>
  );
}

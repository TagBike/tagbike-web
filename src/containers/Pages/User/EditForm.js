import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import api from '../../../helpers/BikeApi';

const Option = SelectOption; 



export default function() {
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);

  const [data, setData] = useState([]);

  let { id } = useParams();
    

  useEffect(() => {
    const getUserById = async () => {
      let response = await api.getUserById(id);
      setData(response.data);
    }
    getUserById();
  }, []);

  const onFinish = async (values) =>  {
    const response = await api.updateUser(values);
      
    setDisabled(true);
  }
  const [form] = Form.useForm();

  const genders = [
    {
      label: 'Feminino',
      value: 'female'
    },
    {
      label: 'Masculino',
      value: 'male'
    },
    {
      label: "Outro",
      value: 'other'
    }
  ];

  if(data.length === 0) {
    return <BillingFormWrapper> Nenhum dado encontrado para o usuário.</BillingFormWrapper>;
  } else {
    return (
      <BillingFormWrapper>
        <Form 
          layout="vertical"
          initialValues={{
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            cpf: data.cpf,
            phone: data.phone,
            cellphone: data.cellphone,
            city: data.city,
            uf: data.uf,
          }}
          onFinish={onFinish}>
        <Form.Item
            name="id"
            label="Código Usuário"
            rules={[
              {
                required: true,
                message: 'Insira Código do Usuário!',
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            name="name"
            label="Nome Completo"
            rules={[
              {
                required: true,
                message: 'Insira o Nome Completo!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Este E-mail não é válido!',
              },
              {
                required: true,
                message: 'Insira o endereço de E-Mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cpf"
            label="CPF"
            rules={[
              {
                required: true,
                message: 'Insira o CPF!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="cellphone" label="Celular">
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="Cidade"
            rules={[
              {
                required: true,
                message: 'Insira a cidade!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="uf"
            label="Estado"
            rules={[
              {
                required: true,
                message: 'Selecione o Estado!',
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
}

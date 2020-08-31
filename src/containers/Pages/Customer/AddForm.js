import React, { useState } from 'react';
import Form from '@iso/components/uielements/form';
import Input, { InputPassword } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import api from '../../../helpers/BikeApi';

const Option = SelectOption; 



export default function() {
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) =>  {
    console.log(values);

    const response = await api.createClient(values);
    console.log(response);
      
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

  
  
  return (
    <BillingFormWrapper>
      <Form 
        layout="vertical"
        onFinish={onFinish}>
      
        <Form.Item
          name="name"
          label="Nome Completo"
          rules={[
            {
              required: true,
              message: 'Insira seu Nome Completo!',
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
              message: 'Insira seu endereço de E-Mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          rules={[
            {
              required: true,
              message: 'Insira uma senha',
            },
          ]}
        >
          <InputPassword />
        </Form.Item>

        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            {
              required: true,
              message: 'Insira seu CPF!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rg"
          label="RG"
          rules={[
            {
              required: true,
              message: 'Insira seu RG!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Telefone">
          <Input />
        </Form.Item>
        <Form.Item name="cellphone" label="Celular">
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Logradouro"
          rules={[
            {
              required: true,
              message: 'Insira seu Logradouro!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="number"
          label="Número"
          rules={[
            {
              required: true,
              message: 'Insira o número da sua residência!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="complement"
          label="Complemento"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="neighborhood"
          label="Bairro"
          rules={[
            {
              required: true,
              message: 'Insira seu bairro!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="Cidade"
          rules={[
            {
              required: true,
              message: 'Insira sua cidade!',
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
              message: 'Selecione seu Estado!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cep"
          label="CEP"
          rules={[
            {
              required: true,
              message: 'Insira seu CEP!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="Cidade"
          rules={[
            {
              required: true,
              message: 'Insira sua cidade!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gênero"
          rules={[
            {
              required: true,
              message: 'Selecione o gênero',
            },
          ]}
        >
          <Select options={genders} />
        </Form.Item>
        <Button htmlType="submit">Salvar</Button>
      </Form> 
    </BillingFormWrapper>
  );
}

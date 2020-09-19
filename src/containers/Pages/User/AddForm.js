import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputMasked, InputPassword } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { FormWrapper } from '../Page.styles';
import {Divider} from 'antd';
import api from '../../../helpers';

const Option = SelectOption; 



export default function() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  
  const onFinish = async (values) =>  {
    setDisabled(true);
    const response = await api.bike.createUser(values);
    if(response === "success") {
      notification('success', 'Usuário criado!', 'Dados criado com sucesso.');
      history.push('/users');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao adicionar usuário', response.toString());
      setDisabled(false);
    } 
  }

  const onChangeMasked = (e) => {
    let obj = {};
    obj[e.target.id] = e.target.value.replace(/[\D]/gi, '');
    form.setFieldsValue(obj);
  }

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
    <FormWrapper>
      <Form 
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
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
              message: 'Insira o CPF!',
            },
          ]}
        >
          <InputMasked 
            mask="111.111.111-11" 
            onChange={onChangeMasked}
          />
        </Form.Item>
        <Form.Item name="cellphone" label="Celular">
          <InputMasked 
            mask="(11) 11111 - 1111" 
            onChange={onChangeMasked}
          />
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
        <Divider />
        <Button htmlType="submit" disabled={disabled}>Salvar</Button>
      </Form> 
    </FormWrapper>
  );
}
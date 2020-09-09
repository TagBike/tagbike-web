import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputMasked } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import IntlMessages from '@iso/components/utility/intlMessages';
import { FormWrapper } from '../Page.styles';
import Skeleton from '@iso/components/uielements/skeleton';
import {Divider} from 'antd';
import api from '../../../helpers';


export default function() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  const [data, setData] = useState([]);

  let { id } = useParams();
    

  useEffect(() => {
    const getUserById = async () => {
      let response = await api.bike.getUserById(id);
      setData(response.data);
      form.setFieldsValue({
        cellphone: response.data.cellphone,
        cpf: response.data.cpf,
      });
    }
    getUserById();
  }, []);

  const onFinish = async (values) =>  {
    setDisabled(true);
    const response = await api.bike.updateUser(values);
      
    if(response === "success!") {
      notification('success', 'Usuário atualizado!', 'Dados alterados com sucesso.');
      history.push('/users');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao atualizar o usuário', response.toString());
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

  if(data.length === 0) {
    return <>
      <Skeleton active size="large"/>
      <Divider />
      <Skeleton.Button active size="large"/>  
      </>
  }
  return (
    <FormWrapper>
      <Form 
        form={form}
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
        <Button htmlType="submit" disabled={disabled}>Salvar</Button>
      </Form> 
    </FormWrapper>
  );  
}

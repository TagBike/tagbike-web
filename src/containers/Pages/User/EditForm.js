import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputMasked } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import api from '../../../helpers';

const Option = SelectOption; 



export default function() {
  const [form] = Form.useForm();
  const handleOnChange = checkedValues => {};
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
    const response = await api.bike.updateUser(values);
      
    setDisabled(true);
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
    return <BillingFormWrapper> Nenhum dado encontrado para o usuário.</BillingFormWrapper>;
  } else {
    return (
      <BillingFormWrapper>
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
          <Button htmlType="submit">Salvar</Button>
        </Form> 
      </BillingFormWrapper>
    );  
  }
}

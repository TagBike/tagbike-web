import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputMasked } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import api from '../../../helpers';
import app from '../../../helpers/';

const Option = SelectOption; 


export default function() {
  const [form] = Form.useForm();
  const handleOnChange = checkedValues => {};
  const [disabled, setDisabled] = useState(false);

  const [data, setData] = useState([]);

  let { id } = useParams();
    

  useEffect(() => {
    const getClientById = async () => {
      let response = await api.bike.getClientById(id);
      setData(response.data);
      form.setFieldsValue({
        cellphone: response.data.cellphone,
        cpf: response.data.cpf,
      });
    }
    
    getClientById();
  }, []);

  const onFinish = async (values) =>  {
    const response = await api.bike.updateClient(values);
      
    setDisabled(true);
  }

  const onChangeMasked = (e) => {
    let obj = {};
    obj[e.target.id] = e.target.value.replace(/[\D]/gi, '');
    form.setFieldsValue(obj);
  }

  const searchZipcode = async (zip) => { 
    
    app.utils.zip.getAddressByZip(zip).then((res) => {
      const response = res.data;
      if(response) {
        form.setFieldsValue({
          address: response.logradouro,
          neighborhood: response.bairro,
          city: response.cidade,
          uf: response.uf,
        });
      }
    });
  }

  const onChangeZipcode = async (e) => {
    let obj = {};
    const value = e.target.value.replace(/[\D]/gi, '')
    obj[e.target.id] = value;
    form.setFieldsValue(obj);

    if(value.length === 8) {
      searchZipcode(value);
    } 

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
    return <BillingFormWrapper> Nenhum dado encontrado para o cliente.</BillingFormWrapper>;
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
            cpf: data.cpf,
            rg: data.rg,
            phone: data.phone,
            cellphone: data.cellphone,
            address: data.address,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: data.city,
            uf: data.uf,
            cep: data.cep,
            gender: data.gender
          }}
          onFinish={onFinish}>
        <Form.Item
            name="id"
            label="Código Cliente"
            rules={[
              {
                required: true,
                message: 'Insira Código Cliente!',
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
            name="cpf"
            label="CPF"
            rules={[
              {
                required: true,
                message: 'Insira seu CPF!',
              },
            ]}
          >
            <InputMasked 
              mask="111.111.111-11" 
              onChange={onChangeMasked}
            />
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
            <InputMasked 
              mask="(11) 1111 - 1111" 
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
            name="cep"
            label="CEP"
            rules={[
              {
                required: true,
                message: 'Insira seu CEP!',
              },
            ]}
          >
            <InputMasked 
              mask="11111-111" 
              onChange={onChangeZipcode}
            />
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
}

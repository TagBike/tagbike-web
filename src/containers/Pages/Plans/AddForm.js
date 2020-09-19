import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputPassword, Textarea, Number } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import { FormWrapper } from '../Page.styles';
import {Divider} from 'antd';
import api from '../../../helpers';

export default function() {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) =>  {
    setDisabled(true);
    const response = await api.bike.createPlan(values);
    if(response === "success") {
      notification('success', 'Plano adicionado!', 'Dados adicionados com sucesso.');
      history.push('/plans');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao adicionar o plano', response);
      setDisabled(false);
    }
      
  }

  return (
    <FormWrapper>
      <Form 
        layout="vertical"
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
          <Number
            defaultValue={1}
            parser={value => value.replace(/R\$\s?|(,*)/g, '')}
            formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>
        <Divider />
        <Button htmlType="submit" disabled={disabled}>Salvar</Button>
      </Form> 
    </FormWrapper>
  );
}

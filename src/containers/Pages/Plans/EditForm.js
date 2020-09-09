import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { Textarea, Number } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import IntlMessages from '@iso/components/utility/intlMessages';
import { FormWrapper } from '../Page.styles';
import Skeleton from '@iso/components/uielements/skeleton';
import {Divider} from 'antd';
import api from '../../../helpers';



export default function() {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const [data, setData] = useState([]);

  let { id } = useParams();

  const onFinish = async (values) =>  {
    setDisabled(true);
    const response = await api.bike.updatePlan(values);
    if(response === "success") {
      notification('success', 'Plano atualizado!', 'Dados atualizados com sucesso.');
      history.push('/plans');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao salvar o plano', response);
      setDisabled(false);
    }
  }

  useEffect(() => {
    const getPlanById = async () => {
      let response = await api.bike.getPlanById(id);
      response = response.data;
      setData(response);
    }

    getPlanById();
  }, []);

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
        layout="vertical"
        initialValues={{
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description

        }}
        onFinish={onFinish}
      >
        <Form.Item
            name="id"
            label="Código Plano"
            rules={[
              {
                required: true,
                message: 'Insira o código do plano!',
              },
            ]}
            hidden
          >
            <Input disabled />
          </Form.Item>  
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

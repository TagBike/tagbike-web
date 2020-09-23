import React, { useState, useEffect } from 'react';
import streamSaver from 'streamsaver';
import { Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { Number, InputSearch } from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import Skeleton from '@iso/components/uielements/skeleton';
import { FormWrapper } from '../Page.styles';
import {Divider, Result} from 'antd';
import api from '../../../helpers';

import Tag from './Tag';

export default function() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const [data, setData] = useState([]);

  

  let { id } = useParams();

  const selections = [
    {
      label: 'Tudo',
      value: 'all'
    },
    {
      label: 'QRCode',
      value: 'qrcode'
    },
  ];

  const types = [
    {
      label: 'SVG',
      value: 'svg'
    },
    {
      label: 'PDF',
      value: 'pdf',
      disabled: true
    },
    {
      label: 'PNG',
      value: 'png',
      disabled: true
    },
    {
      label: 'JPG',
      value: 'jpg',
      disabled: true
    },
  ];

  useEffect(() => {
    const getBikeById = async () => {
        try{
          setLoading(true);
          let response = await api.bike.getBikeById(id);
          setData(response.data);
          if(response.status) {
            setStatus(response.status);
            setLoading(false);
          }
          
        } catch(error) {
          setLoading(false);
          setData(status);
          console.log('Error: ', error);
          notification('error', 'Erro ao buscar dados da bike', error.toString());
        }
      
    }
    getBikeById();
  }, []);

  const onFinish = async (values) =>  {
    
    const type = values.export_type;
    if(type === 'svg') {
      
      const fileStream = streamSaver.createWriteStream(`tag.${type}`, {
        size: 22, // (optional) Will show progress
        writableStrategy: undefined, // (optional)
        readableStrategy: undefined  // (optional)
      })
       
      api.bike.download(values)
      .then(response => {
        if(response.status === 200) {
          const fileContent = response.data;
          new Response(fileContent).body
          .pipeTo(fileStream)
          .then(function(){
            console.log('success');
          }, console.log('error'))
        }
      });
    }
    
  }

  if(!status) {
    return <>
        <Skeleton active size="large"/>
        <Divider />
        <Skeleton.Button active size="large"/>  
        </>
  } else if(status && !data.hash) {
    return (
      <Result
        status="404"
        title="Tag não encontrada"
        subTitle="Nenhuma tag foi registrada para esta bike."
        //extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  return (
      <Row >
          <Col span={8} offset={4}>
            <Tag id={data.hash} />
          </Col>
          
          <Col span={12} >
          <FormWrapper className="isoBillingForm">
            <Form form={form}
              layout="vertical"
              initialValues={{
                id: data.hash,
                export: 'all',
                export_type: 'svg',
                color: true
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="id"
                label="Código da Bike"
                rules={[
                  {
                    required: true,
                    message: 'Insira o código da bike!',
                  },
                ]}
                hidden
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                name="export"
                label="Exportar"
                rules={[
                  {
                    required: true,
                    message: 'Insira o seleção para exportar!',
                  },
                ]}
              >
                <Select defaultValue="all" options={selections} />
              </Form.Item>

              <Form.Item
                name="export_type"
                label="Exportar como"
                rules={[
                  {
                    required: true,
                    message: 'Insira o tipo de exportação!',
                  },
                ]}
              >
                <Select defaultValue="pdf" options={types} />
              </Form.Item>
              <Form.Item
                name="color"
                label="Colorida"
                
              >
                <Select defaultValue="pdf" options={[{label:'Sim',value: true},{label: 'Não', value: false}]} />
              </Form.Item>
              <Divider />
              <Button htmlType="submit" loading={loading}>Exportar</Button>
            </Form> 
          </FormWrapper>
          </Col>
      </Row>
  );
}

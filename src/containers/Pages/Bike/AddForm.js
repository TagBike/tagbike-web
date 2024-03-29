import React, { useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import Form from '@iso/components/uielements/form';
import Input, { Number, InputSearch } from '@iso/components/uielements/input';
import AutoComplete from '@iso/components/uielements/autocomplete';
import Button from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import IntlMessages from '@iso/components/utility/intlMessages';
import { FormWrapper } from '../Page.styles';
import { direction } from '@iso/lib/helpers/rtl';
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from '@iso/components/uielements/skeleton';
import {Divider} from 'antd';
import api from '../../../helpers';

const { Search } = AntInput;

export default function() {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const { customer } = queryString.parse(location.search);

  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getCustomer = async (customer) => {
      
        try {
          let response = await api.bike.getClientById(customer);
  
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    if(customer) getCustomer(customer);
  },[]);

  useEffect(() => {
    if(data.id) form.setFieldsValue({customer_id: data.id});
  },[data]);
  
  const types = [
    {
      label: 'Bmx | Cross', 
      value: 'Bmx Cross'
    },
    {

      label: 'Dobrável', 
      value: 'Dobrável'
    },
    {
      label: 'Downhill',
      value: 'Downhill'
    },
    {
      label: 'Elétrica',
      value: 'Elétrica',
    },
    {
      label: 'Estrada | Speed | Road', 
      value: 'Estrada Speed Road', 
    },
    {
      label: 'Handbike', 
      value: 'Handbike', 
    },
    {
      label: 'Híbrida',
      value: 'Híbrida' 

    },
    {
      label: 'Infantil',
      value: 'Infantil'  
    },
    {
      label: 'Mountain Bike',
      value: 'Mountain Bike'  
    },
    {
      label: 'Scooter',
      value: 'Scooter'  
    },
    {
      label: 'Triatlo',
      value: 'Triatlo' 
    },
    {
      label: 'Triciclo',
      value: 'Triciclo'  
    },
    {
      label: 'Urbana',
      value: 'Urbana'  
    },
    {
      label: 'Outros',
      value: 'Outros'  
    },
  ];

  const brakeTypes = [
    {
 			value: '1',
			label: 'Freio a disco hidráulico'
		},
    {
 			value: '2',
			label: 'Freio a disco mecânico'
		},
    {
 			value: '3',
			label: 'Freio V break'
		},
    {
 			value: '4',
			label: 'Outros'
		}
  ];

  const suspensionTypes = [
    {
 			value: '1',
			label: 'Ar/Óleo'
		},
    {
 			value: '2',
			label: 'Elastômero/Óleo'
		},
    {
 			value: '3',
			label: 'Mola'
		},
    {
 			value: '4',
			label: 'Outros'
		},
  ];

  const wheelTypes = [
    {
 			value: 20,
			label: 'Aro 20'
		},
    {
 			value: 26,
			label: 'Aro 26'
		},
    {
 			value: 27.5,
			label: 'Aro 27,5'
		},
    {
 			value: 29,
			label: 'Aro 29'
		},
    {
 			value: 700,
			label: 'Aro 700'
		},
    {
 			value: 0,
			label: 'Outro'
		},
  ];  

  const forkTypes = [
    {
 			value: 'Aço',
			label: 'Aço'
		},
    {
 			value: 'Alumínio',
			label: 'Alumínio'
		},
    {
 			value: 'Carbono',
			label: 'Carbono'
		},
    {
 			value: 'Outro',
			label: 'Outro'
		},
  ];

  const frameTypes = [
    {
 			value: 'Aço',
			label: 'Aço'
		},
    {
 			value: 'Alumínio',
			label: 'Alumínio'
		},
    {
 			value: 'Carbono',
			label: 'Carbono'
		},
    {
 			value: 'Outro',
			label: 'Outro'
		},
  ];


  const onFinish = async (values) =>  {
    setDisabled(true);
    const response = await api.bike.createBike(values);
    if(response === "success") {
      notification('success', 'Bike adicionada!', 'Bike adicionada com sucesso.');
      history.push('/bikes');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao adicionar a bike', response.toString());
      setDisabled(false);
    }    
  }

  const AutoCompletes = (props) => {
    const [searching, setSearching] = useState(false);
    const [options, setOptions] = useState([]);

    const onSearch = async (searchText) => {
        setSearching(true);
        let list = [];
        const response = await api.bike.get(props.url, {data: searchText});

        response.data.map((value, key) => {
            list.push({value: `${value.id} - ${value.name}`});
        });
        setSearching(false);
        setOptions(list);
    };

    const onSelect = data => {
        const regex = /^[0-9]+/;
        const id = regex.exec(data)[0];
        form.setFieldsValue({customer_id: id});
    };

    return (
        <>
        <AutoComplete
          options={options}
          onSelect={onSelect}
          onSearch={onSearch}
          defaultValue={`${data.id} - ${data.name}`}
        >
            <Search loading={searching} />
        </AutoComplete>
        </>
    );
};

if(data.length === 0 && customer) {
  return <>
    <Skeleton active size="large"/>
    <Divider />
    <Skeleton.Button active size="large"/>  
    </>
}
  return (
    <FormWrapper className="isoBillingForm">
       <Form form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="customer_id"
          label="Proprietário"        
          rules={[
            {
              required: true,
              message: 'Insira o proprietário da bike!',
            },
          ]}
        >
          <AutoCompletes 
            url="/search/customer"
            placeholder="Proprietário"
          />
        </Form.Item>
        <Form.Item
          name="serialNumber"
          label="Número de Série"
          rules={[
            {
              required: true,
              message: 'Insira o número de série da bike!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="biketype"
          label="Tipo da Bike"
          rules={[
            {
              required: true,
              message: 'Selecione o tipo da bike',
            },
          ]}
        >
          <Select options={types} />

        </Form.Item>
        <Form.Item
          name="brand"
          label="Marca"
          rules={[
            {
              required: true,
              message: 'Insira a marca da bike!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="model"
          label="Modelo"
          rules={[
            {
              required: true,
              message: 'Insira o modelo da bike!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Cor"
          rules={[
            {
              required: true,
              message: 'Insira a cor da bike!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="forwardExchange"
          label="Cambio Dianteiro"
          rules={[
            {
              required: true,
              message: 'Insira o tipo de cambio dianteiro da bike!',
            },
          ]}
        >
          <Input defaultValue={1} suffix="Velocidades"/>
        </Form.Item>
        <Form.Item
          name="rearDerailleur"
          label="Cambio Traseiro"
          rules={[
            {
              required: true,
              message: 'Insira o tipo de cambio traseiro da bike!',
            },
          ]}
        >
          <Input defaultValue={18} suffix="Velocidades"/>
        </Form.Item>
        <Form.Item
          name="brakeType"
          label="Tipo de Freio"
          rules={[
            {
              required: true,
              message: 'Selecione o tipo de freio da bike',
            },
          ]}
        >
          <Select options={brakeTypes} />
        </Form.Item>
        <Form.Item
          name="typeSuspension"
          label="Tipo de Suspensão"
          rules={[
            {
              required: true,
              message: 'Selecione o tipo de suspensão da bike',
            },
          ]}
        >
          <Select options={suspensionTypes} />
        </Form.Item>
        <Form.Item
          name="wheelType"
          label="Tipo de Aro"
          rules={[
            {
              required: true,
              message: 'Selecione o tipo de aro da bike',
            },
          ]}
        >
          <Select options={wheelTypes} />
        </Form.Item>
        <Form.Item
          name="forkType"
          label="Tipo de Garfo"
          rules={[
            {
              required: true,
              message: 'Selecione o tipo de garfo da bike',
            },
          ]}
        >
          <Select options={forkTypes} />
        </Form.Item>
        <Form.Item
          name="frametype"
          label="Tipo de Quadro"
          rules={[
            {
              required: true,
              message: 'Selecione o tipo de quadro da bike',
            },
          ]}
        >
          <Select options={frameTypes} />
        </Form.Item>

        <Divider />
        <Button htmlType="submit" loading={disabled}>Salvar</Button>
      </Form> 
    </FormWrapper>
  );
}

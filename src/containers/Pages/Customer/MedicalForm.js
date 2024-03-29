import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '@iso/components/uielements/form';
import Input, { InputMasked, Textarea } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import notification from '@iso/components/Notification';
import IntlMessages from '@iso/components/utility/intlMessages';
import { FormWrapper } from '../Page.styles';
import Skeleton from '@iso/components/uielements/skeleton';
import {Divider} from 'antd';
import api from '../../../helpers';

const Option = SelectOption; 


export default function() {
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState(false);

  const [data, setData] = useState([]);

  const [status, setStatus] = useState(0);

  const { id } = useParams();


  useEffect(() => {
    const getMedicalById = async () => {
      try {
        let response = await api.bike.getMedicalById(id);
        const res = response.data[0];
        res.doctor = JSON.parse(res.doctor);
        setData(res);
        if(response.status) {
          setStatus(response.status);
        }
        

      } catch (error) {
        console.error(error);
        setStatus(error);
      }
    }
    getMedicalById();
  }, []);

  const onUpdate = async (values) =>  {
    const body = values;
    const doctor = {
      name: values.doctor_name,
      phone: values.doctor_phone,
      mobile: values.doctor_mobile
    };

    delete body['doctor_name'];
    delete body['doctor_phone'];
    delete body['doctor_mobile'];

    body['doctor'] =  doctor ;

    const response = await api.bike.updateMedical(body);

    if(response === "success") {
      notification('success', 'Dados médicos atualizados!', 'Dados médicos foram alterados com sucesso.');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao atualizar dados médicos do cliente', response.toString());
    } 
  }

  const onCreate = async (values) =>  {
    const body = values;
    const doctor = {
      name: values.doctor_name,
      phone: values.doctor_phone,
      mobile: values.doctor_mobile
    };

    delete body['doctor_name'];
    delete body['doctor_phone'];
    delete body['doctor_mobile'];

    body['doctor'] =  doctor ;

    const response = await api.bike.createMedical(body);
    if(response === "success") {
      notification('success', 'Dados médicos adicionados!', 'Dados médicos foram adicionados com sucesso.');
    } else {
      console.log('Error: ', response);
      notification('error', 'Erro ao adicionar dados médicos do cliente', response.toString());
    }
  }

  const onChangeMasked = (e) => {
    let obj = {};
    obj[e.target.id] = e.target.value.replace(/[\D]/gi, '');
    form.setFieldsValue(obj);
  }

  const bloodtypes = [
    {
      label: 'A+',
      value: 'a+'
    },
    {
      label: 'A-',
      value: 'a-'
    },
    {
      label: "B+",
      value: 'b+'
    },
    {
      label: 'B-',
      value: 'b-'
    },
    {
      label: 'AB+',
      value: 'ab+'
    },
    {
      label: 'AB-',
      value: 'ab-'
    },
    {
      label: 'O+',
      value: 'o+'
    },
    {
      label: 'O-',
      value: 'o-'
    },
  ];

  if(!status) {
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
        initialValues={status === 200 ? {
          customer_id: id,
          referral_hospital: data.referral_hospital,
          observations: data.observations,
          emergency_contacts: data.emergency_contacts,
          doctor_name: data.doctor.name,
          doctor_phone: data.doctor.phone,
          doctor_mobile: data.doctor.mobile,
          bloodtype: data.bloodtype,
          allergic_reactions: data.allergic_reactions,
          medicines: data.medicines,
          additional_notes: data.additional_notes,
          insurance: data.insurance,
          insurance_number: data.insurance_number
        }: {
          customer_id: id,
        }}
        onFinish={ status === 200 ? onUpdate : onCreate  }
      >
        <Form.Item
          name="customer_id"
          label="Código Cliente"
          rules={[
            {
              required: true,
              message: 'Insira Código Cliente!',
            },
          ]}
          hidden
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name="bloodtype"
          label="Tipo  Sanguíneo"
        >
          <Select options={bloodtypes} />
        </Form.Item>
        <Form.Item
          name="referral_hospital"
          label="Hospital de Referência"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="observations"
          label="Observações"
        >
          <Textarea />
        </Form.Item>
        <Form.Item
          name="doctor_name"
          label="Nome Médico"
        >
          <Input />
        </Form.Item>
        <Form.Item name="doctor_phone" label="Telefone Médico">
          <InputMasked 
            mask="(11) 1111 - 1111" 
            onChange={onChangeMasked}
          />
        </Form.Item>
        <Form.Item name="doctor_mobile" label="Celular Médico">
          <InputMasked 
            mask="(11) 11111 - 1111" 
            onChange={onChangeMasked}
          />
        </Form.Item>
        <Form.Item
          name="allergic_reactions"
          label="Alergias e Reacções"
        >
          <Textarea />
        </Form.Item>
        <Form.Item
          name="medicines"
          label="Medicamentos"
        >
          <Textarea />
        </Form.Item>

        <Form.Item
          name="additional_notes"
          label="Observações adicionais"
        >
          <Textarea />
        </Form.Item>
        <Form.Item
          name="insurance"
          label="Convênio Médico"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="insurance_number"
          label="Número Convênio Médico"
        >
          <Input />
        </Form.Item>

        <Divider />
        <Button htmlType="submit" loading={disabled}>Salvar</Button>
      </Form> 
    </FormWrapper>
  );  
}

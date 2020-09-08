import React, {useState, useEffect} from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Box from '@iso/components/utility/box';
import { Link } from 'react-router-dom';
import ContentHolder from '@iso/components/utility/contentHolder';
import Input from '@iso/components/uielements/input';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import Popconfirms from '@iso/components/Feedback/Popconfirm';
import Loader from '@iso/components/utility/loader';

import { 
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
  ToolbarWrapper
} from './Customer.styles';
import api from '../../../helpers';
 
const Toolbar = props => {
  const [display, setDisplay] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setDisplay(display ? false : true);
  }
  
  return (
    <ToolbarWrapper>
      <ButtonGroup>
        <Input placeholder="Pesquisa" hidden={display} onChange={props.onSearch} />
        <Button shape="circle" onClick={onClick}>
            <i className="ion-android-search" />
          </Button>
        <Link to="/customers/add">
          <Button shape="circle">
            <i className="ion-android-add" />
          </Button>
        </Link>
      </ButtonGroup>
    </ToolbarWrapper>
  );
}

const Actions = props => (
  <ButtonGroup>
    {props.children}
  </ButtonGroup>
);

export default function Customers() {
  const [isLoading, setLoading] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getListClient = async () => {
      const clients = await api.bike.getListClient();
      setStateList(clients);
    }

    getListClient();
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilteredList(stateList);
  }, [stateList]);

  const dataSource = filteredList.map( (item) => ({
      id : item.id,
      name : item.name,
      email : item.email,
      cpf : item.cpf,
      phone : item.phone
  }));

  const handleChange = (e) => {
    const search = e.target.value;
    
    if(search) {
      const filteredData = stateList.filter((data) => {
        return data.name.toString().toLowerCase().includes(search);
      });
      
      setFilteredList(filteredData);
    } else {
      setFilteredList(dataSource);
    }
    
  }

  const handleDelete = async (id) => {
    const json = await api.bike.deleteClient(id);
    window.location.href = './customers';
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      },
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      width: '170px',
      key: 'name',
      width: '25%',
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '170px',
      key: 'email',
      width: '25%',
      sorter: (a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      },
    },
    {
      title: 'Cpf',
      dataIndex: 'cpf',
      width: '170px',
      key: 'cpf',
      width: '20%',
      sorter: (a, b) => {
        if (a.cpf < b.cpf) return -1;
        if (a.cpf > b.cpf) return 1;
        return 0;
      },
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      width: '170px',
      key: 'phone',
      sorter: (a, b) => {
        if (a.phone < b.phone) return -1;
        if (a.phone > b.phone) return 1;
        return 0;
      },
    },
    {
      title: 'Ações',
      key: 'action',
      width: '60px',
      className: 'noWrapCell',
      render: (text, row) => {
        return (
          <ActionWrapper>
            <Actions >

              <Link to={`/customers/edit/${row.id}`}>
                <Button shape="circle">
                  <i className="ion-android-create" />
                </Button>
              </Link>
              <Popconfirms
                title="Deseja Excluir esse cliente?"
                okText="Sim"
                cancelText="Não"
                placement="topRight"
                onConfirm={() => handleDelete(row.id)}
              >
                <Button shape="circle">
                  <i className="ion-android-delete" />
                </Button>          
              </Popconfirms>
            </Actions>
          </ActionWrapper>
        );
      },
    },
  ];

  if(isLoading || dataSource.length === 0 ) {
    return <Loader />
  }

  return (
    <LayoutContentWrapper>
      <PageHeader>
        <IntlMessages id="Clientes" />
      </PageHeader>
      <Box extra={<Toolbar onSearch={handleChange}/>} >
        <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
          <TableWrapper
            rowKey="key"
            columns={columns}
            bordered={true}
            dataSource={dataSource}
            loading={isLoading}
            className="isoSimpleTable"
            pagination={{
              defaultPageSize: 10,
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]}-${range[1]} of ${
                  dataSource.length
                } Results`;
              },
            }}
          />
        </ContentHolder>
      </Box>
    </LayoutContentWrapper>
  );
}

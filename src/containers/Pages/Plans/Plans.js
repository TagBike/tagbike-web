import React, {useState, useEffect} from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Box from '@iso/components/utility/box';
import { Link } from 'react-router-dom';
import ContentHolder from '@iso/components/utility/contentHolder';
import Input from '@iso/components/uielements/input';
import Skeleton from '@iso/components/uielements/skeleton';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import Popconfirms from '@iso/components/Feedback/Popconfirm';

import {
  ActionWrapper,
  TableWrapper,
  ToolbarWrapper
} from '../Page.styles';
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
        <Link to="/plans/add">
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

export default function Plans() {
  const [stateList, setStateList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const getListPlan = async () => {
      const tags = await api.bike.getListPlan();
      setStateList(tags);
    }

    getListPlan();
  }, []);

  useEffect(() => {
    setFilteredList(stateList);
  }, [stateList]);


  const dataSource = filteredList.map( (item) => ({
    id : item.id,
    name : item.name,
    description : item.description,
    price : item.price,
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
    const json = await api.bike.deletePlan(id);
    window.location.href = './plans';
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      width: '170px',
      key: 'name',
      width: '60%',
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      }, render: (text, row) => {
        return `R$ ${text}`;
      }
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
              <Link to={`/plans/edit/${row.id}`}>
                <Button shape="circle">
                  <i className="ion-android-create" />
                </Button>
              </Link>
              <Popconfirms
                title="Deseja Excluir esse plano?"
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

  const Table = (props) => {
    if(dataSource.length === 0 ) {
      return <Skeleton/>
    }
    return <TableWrapper  {...props} />
  };

  return (
    <LayoutContentWrapper>
      <PageHeader>
        <IntlMessages id="Planos" />
      </PageHeader>
      <Box extra={<Toolbar onSearch={handleChange} />} >
        <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
          <Table
            rowKey="key"
            columns={columns}
            bordered={true}
            dataSource={dataSource}
            //loading={isLoading}
            className="isoSimpleTable"
            pagination={{
              defaultPageSize: 10,
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Mostrando ${range[0]}-${range[1]} de ${
                  dataSource.length
                } Resultados`;
              },
            }}
          />
        </ContentHolder>
      </Box>
    </LayoutContentWrapper>
  );
}

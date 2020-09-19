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
import Skeleton from '@iso/components/uielements/skeleton';

import {
  ActionWrapper,
  TableWrapper,
  StatusTag,
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
        <Link to="/tags/add">
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

export default function Tags() {
  const [stateList, setStateList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const getListTag = async () => {
      const response = await api.bike.getListTag();
      setStateList(response.data);
      if(response.status) {
        setStatus(response.status);
      }
    }

    getListTag();
  }, []);

  useEffect(() => {
    setFilteredList(stateList);
  }, [stateList]);


  const dataSource = filteredList.map( (item) => (  
    {
      id : item.id,
      name : item.name,
      qrCode : item.qr_code,
    }
  ));

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
    const json = await api.bike.deleteTag(id);
    window.location.href = './tags';
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      width: '170px',
      key: 'name',
      width: '40%',
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    },
    {
      title: 'Código',
      dataIndex: 'qrCode',
      width: '170px',
      key: 'qrCode',
      width: '40%',
      sorter: (a, b) => {
        if (a.qrCode < b.qrCode) return -1;
        if (a.qrCode > b.qrCode) return 1;
        return 0;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'noWrapCell',
      key: 'status',
      sorter: (a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      },

      render: (text, row) => {
        let className;
        if (row.status === ('draft' || 'Draft' || 'DRAFT')) {
          className = 'draft';
        } else if (row.status === ('publish' || 'Publish' || 'PUBLISH')) {
          className = 'publish';
        }
        return <StatusTag className={className}>{row.status}</StatusTag>;
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
              <Link to={`/tags/edit/${row.id}`}>
                <Button shape="circle">
                  <i className="ion-android-create" />
                </Button>
              </Link>
              <Popconfirms
                title="Deseja Excluir essa etiqueta?"
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
    if(!status) {
      return <Skeleton/>
    }
    return <TableWrapper  {...props} />
  };

  return (
    <LayoutContentWrapper>
      <PageHeader>
        <IntlMessages id="Etiquetas" />
      </PageHeader>
      <Box extra={<Toolbar onSearch={handleChange}/>} >
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

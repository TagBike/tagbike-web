import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import IntlMessages from '@iso/components/utility/intlMessages';
import Box from '@iso/components/utility/box';
import { Link } from 'react-router-dom';
import ContentHolder from '@iso/components/utility/contentHolder';
import Input from '@iso/components/uielements/input';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import notification from '@iso/components/Notification';
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
  const { id } = useParams();
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
        <Link to={`/bikes/add?customer=${id}`}>
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

export default function Bikes() {
  const [stateList, setStateList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [status, setStatus] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const getListBike = async () => {
      try {
        const response = await api.bike.getBikeByCustomer(id);
        setStateList(response.data);
        if(response.status) {
          setStatus(response.status);
        }
      } catch (error) {
        console.error(error);
        setStatus(error);
      }
    }

    getListBike();
  }, []);

  useEffect(() => {
    setFilteredList(stateList);
  }, [stateList]);


  const dataSource = filteredList.map( (item) => ({
      id : item.id,
      customer_id : item.customer_id,
      serialNumber : item.serialNumber,
      model : item.model,
      color : item.color
  }));

  const handleChange = (e) => {
    const search = e.target.value;
    
    if(search) {
      const filteredData = stateList.filter((data) => {
        return data.serialNumber.toString().toLowerCase().includes(search);
      });
      
      setFilteredList(filteredData);
    } else {
      setFilteredList(dataSource);
    }
    
  }

  const handleDelete = async (id) => { 
    const json = await api.bike.deleteBike(id);
    window.location.href = '/bikes';
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      width: '40px',
      key: 'id',
      sorter: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      },
    },
    {
      title: 'Número de série ',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      sorter: (a, b) => {
        if (a.serialNumber < b.serialNumber) return -1;
        if (a.serialNumber > b.serialNumber) return 1;
        return 0;
      },
    },
    {
      title: 'Modelo',
      dataIndex: 'model',
      width: '170px',
      key: 'model',
      sorter: (a, b) => {
        if (a.model < b.model) return -1;
        if (a.model > b.model) return 1;
        return 0;
      },
    },
    {
      title: 'Cor',
      dataIndex: 'color',
      width: '170px',
      key: 'color',
      sorter: (a, b) => {
        if (a.color < b.color) return -1;
        if (a.color > b.color) return 1;
        return 0;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '80px',
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
              <Link to={`/bikes/edit/${row.id}`}>
                <Button shape="circle">
                  <i className="ion-android-create" />
                </Button>
              </Link>
              <Popconfirms
                title="Deseja Excluir esta bike?"
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
              return `Showing ${range[0]}-${range[1]} of ${
                dataSource.length
              } Results`;
            },
          }}
        />
      </ContentHolder>
    </Box>
  );
}

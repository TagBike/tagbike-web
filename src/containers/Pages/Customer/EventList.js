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
        <Link to={`/events/add?customer=${id}`}>
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

export default function Events() {
  const [stateList, setStateList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getListBike = async () => {
      try {
        const response = await api.bike.getEventByCustomer(id);
        setStateList(response);
      } catch (error) {
        console.error(error);
      }
    }

    getListBike();
  }, []);

  useEffect(() => {
    setFilteredList(stateList);
  }, [stateList]);


  const dataSource = filteredList.map( (item) => ({
      id : item.id,  
      eventName : item.eventName,
      eventKey : item.eventKey,
      createdBy : item.createdBy,
      createdAt : item.created_at,
      ownerId : item.ownerId,
      customerName : item.customerName,
      data: item.data,
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
    const json = await api.bike.deleteEvent(id);
    //window.location.href = '/bikes';
  }

  const columns = [
    {
      title: 'Evento ',
      dataIndex: 'eventKey',
      width: '60%',
      key: 'eventKey',
      sorter: (a, b) => {
        if (a.eventKey < b.eventKey) return -1;
        if (a.eventKey > b.eventKey) return 1;
        return 0;
      },
      render: (text, row) => {
      return <IntlMessages id={`event.${row.eventKey}`} />
      }
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      width: '20%',
      key: 'createdAt',
      sorter: (a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      },
    },
    {
      title: 'Criado Por ',
      dataIndex: 'ownerId',
      width: '20%',
      key: 'ownerId',
      sorter: (a, b) => {
        if (a.ownerId < b.ownerId) return -1;
        if (a.ownerId > b.ownerId) return 1;
        return 0;
      },
      render: (text, row) => {
        return <Link to={`/customers/edit/${id}`}>
                  <Button type="link">
                  { row.customerName }
                  </Button>
                </Link>
      }
    },
  ];

  const Table = (props) => {
    if(dataSource.length === 0 ) {
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
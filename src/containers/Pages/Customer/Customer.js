import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import customersActions from '@iso/redux/customers/actions';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import Breadcrumb from '@iso/components/uielements/breadcrumb';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import Popconfirms from '@iso/components/Feedback/Popconfirm';
import {
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from './Customer.styles';
import UseApi from '../../../helpers/BikeApi';

const api = UseApi();

const {
  loadFromFireStore,
  resetFireStoreDocuments,
  saveIntoFireStore,
  toggleModal,
  update,
} = customersActions;

const Actions = props => (
  <ButtonGroup>
    <Link to="/customers/Add">
      <Button shape="circle">
        <i className="ion-android-add" />
      </Button>
    </Link>
  </ButtonGroup>
);

export default function Customer() {
  const { customers, customer, modalActive, isLoading } = useSelector(
    state => state.Customers
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadFromFireStore());
  }, [dispatch]);
  const handleRecord = (actionName, customer) => {
    if (customer.key && actionName !== 'delete') actionName = 'update';
    dispatch(saveIntoFireStore(customer, actionName));
  };
  const resetRecords = () => {
    dispatch(resetFireStoreDocuments());
  };

  const handleModal = (customer = null) => {
    dispatch(toggleModal(customer));
  };

  const onRecordChange = (event, key) => {
    if (key) customer[key] = event.target.value;
    dispatch(update(customer));
  };

  const onSelectChange = (key, value) => {
    if (key) customer[key] = value;
    dispatch(update(customer));
  };

  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getListClient = async () => {
        const users = await api.getListClient();
          setStateList(users);
    }
  
    getListClient();
  }, []);
  
  
  const dataSource = stateList.map( (item) => (  
      {
        name : item.name,
        email : item.email,
        cpf : item.cpf,
        telefone : item.phone
      }
    ));

  Object.keys(customers).map((customer, index) => {
    return dataSource.push({
      ...customers[customer],
      key: customer,
    });
  });


  const columns = [
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
      dataIndex: 'telefone',
      width: '170px',
      key: 'telefone',
      sorter: (a, b) => {
        if (a.telefone < b.telefone) return -1;
        if (a.telefone > b.telefone) return 1;
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
            <a onClick={() => handleModal(row)} href="/customers/edit">
              <i className="ion-android-create" />
            </a>

            <Popconfirms
              title="Deseja Excluir esse Cliente？"
              okText="Sim"
              cancelText="Não"
              placement="topRight"
              onConfirm={() => handleRecord('delete', row)}
            >
              <a className="deleteBtn" href="#">
                <i className="ion-android-delete" />
              </a>
            </Popconfirms>
          </ActionWrapper>
        );
      },
    },
  ];


  return (
    <LayoutContentWrapper>
      {/*<Breadcrumb>
        <Breadcrumb.Item>
          <Button as="a" type="link"><i className="ion-android-home" /></Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Button as="a" type="link"><IntlMessages id="Clientes" /></Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <IntlMessages id="Adicionar" />
        </Breadcrumb.Item>
      </Breadcrumb>*/}
      <PageHeader>
        <IntlMessages id="Clientes" />
      </PageHeader>
      {/*<Box title={<IntlMessages id="sidebar.customers" />}>*/}
      <Box extra={<Actions />}>
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

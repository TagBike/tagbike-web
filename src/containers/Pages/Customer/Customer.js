import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '@iso/redux/articles/actions';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Box from '@iso/components/utility/box';
import { Link } from 'react-router-dom';
import ContentHolder from '@iso/components/utility/contentHolder';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
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
} = articleActions;

const Actions = props => (
  <ButtonGroup>
    <Link to="././Add">
      <Button shape="circle">
        <i className="ion-android-add" />
      </Button>
    </Link>
  </ButtonGroup>
);

export default function Articles() {
  const { articles, article, modalActive, isLoading } = useSelector(
    state => state.Articles
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadFromFireStore());
  }, [dispatch]);
  const handleRecord = (actionName, article) => {
    if (article.key && actionName !== 'delete') actionName = 'update';
    dispatch(saveIntoFireStore(article, actionName));
  };
  const resetRecords = () => {
    dispatch(resetFireStoreDocuments());
  };

  const handleModal = (article = null) => {
    dispatch(toggleModal(article));
  };

  const onRecordChange = (event, key) => {
    if (key) article[key] = event.target.value;
    dispatch(update(article));
  };

  const onSelectChange = (key, value) => {
    if (key) article[key] = value;
    dispatch(update(article));
  };


const [stateList, setStateList] = useState([]);

useEffect(() => {
  const getListClient = async () => {
      const clients = await api.getListClient();
        setStateList(clients);
  }

  getListClient();
}, []);


const dataSource = stateList.map( (item) => (  
    {
      id : item.id,
      name : item.name,
      email : item.email,
      cpf : item.cpf,
      telefone : item.phone
    }
  ));

  const handleDelete = async (id) => {
    id = stateList.map( (item) => (  
      item.id
    )); 
    const json = await api.deleteClient(id);
    window.location.href = './customers';
  }

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
            <a onClick={() => handleModal(row)} href="./customer/Edit">
              <i className="ion-android-create" />
            </a>

            <Popconfirms
              title="Deseja Excluir esse Usuário？"
              okText="Sim"
              cancelText="Não"
              placement="topRight"
              onConfirm={() => handleDelete()}
            >
              <a className="deleteBtn" >
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
      <PageHeader>
        <IntlMessages id="Clientes" />
      </PageHeader>
      <Box extra={<Actions />} >
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

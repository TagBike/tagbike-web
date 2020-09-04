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
} from './Article.styles';
import api from '../../../helpers';



const {
  loadFromFireStore,
  resetFireStoreDocuments,
  saveIntoFireStore,
  toggleModal,
  update,
} = articleActions;

const Toolbar = props => (
  <ButtonGroup>
    <Link to="/plans/add">
      <Button shape="circle">
        <i className="ion-android-add" />
      </Button>
    </Link>
  </ButtonGroup>
);

const Actions = props => (
  <ButtonGroup>
    {props.children}
  </ButtonGroup>
);

export default function Plans() {
  /*const { articles, article, modalActive, isLoading } = useSelector(
    state => state.Articles
  );*/
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

  /*const onRecordChange = (event, key) => {
    if (key) article[key] = event.target.value;
    dispatch(update(article));
  };*/

  /*const onSelectChange = (key, value) => {
    if (key) article[key] = value;
    dispatch(update(article));
  };*/


const [stateList, setStateList] = useState([]);

useEffect(() => {
  const getListPlan = async () => {
      const tags = await api.bike.getListPlan();
        setStateList(tags);
  }

  getListPlan();
}, []);


const dataSource = stateList.map( (item) => (  
    {
      id : item.id,
      name : item.name,
      qrCode : item.qr_code,
    }
  ));

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

  return (
    <LayoutContentWrapper>
      <PageHeader>
        <IntlMessages id="Planos" />
      </PageHeader>
      <Box extra={<Toolbar />} >
        <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
          <TableWrapper
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

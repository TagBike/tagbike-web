import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import articleActions from '@iso/redux/articles/actions';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import Box from '@iso/components/utility/box';
import ContentHolder from '@iso/components/utility/contentHolder';
import Popconfirms from '@iso/components/Feedback/Popconfirm';
import {
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from './Article.styles';
const {
  loadFromFireStore,
  resetFireStoreDocuments,
  saveIntoFireStore,
  toggleModal,
  update,
} = articleActions;
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

  const dataSource = [
    'nome' ,
    'cpf',
    'email',
    'telefone',
    'status'
  ];

  Object.keys(articles).map((article, index) => {
    return dataSource.push({
      ...articles[article],
      key: article,
    });
  });


  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
      render: (text, row) => {
        const trimByWord = sentence => {
          let result = sentence;
          let resultArray = result;
          if (resultArray > 7) {
            resultArray = resultArray.slice(0, 7);
            result = resultArray.join(' ') + '...';
          }
          return result;
        };

        return trimByWord(row.title);
      },
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      width: '360px',
      sorter: (a, b) => {
        if (a.cpf < b.cpf) return -1;
        if (a.cpf > b.cpf) return 1;
        return 0;
      },
      render: (text, row) => {
        const trimByWord = sentence => {
          let result = sentence;
          let resultArray = result;
          if (resultArray> 20) {
            resultArray = resultArray.slice(0, 20);
            result = resultArray.join(' ') + '...';
          }
          return result;
        };

        return trimByWord(row.description);
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '220px',
      sorter: (a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      },
      render: (text, row) => {
        const trimByWord = sentence => {
          let result = sentence;
          let resultArray = result;
          if (resultArray > 8) {
            resultArray = resultArray.slice(0, 8);
            result = resultArray.join(' ') + '...';
          }
          return result;
        };

        return trimByWord(row.excerpt);
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
            <a onClick={() => handleModal(row)} href="edit-tags">
              <i className="ion-android-create" />
            </a>

            <Popconfirms
              title="Deseja Excluir essa Etiqueta?"
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
      <Box>
        <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
          <TitleWrapper>
            <ComponentTitle>Etiquetas</ComponentTitle>
          </TitleWrapper>

        
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

import React from 'react';
import { Col, Row, Icon } from 'antd';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import Select, { SelectOption } from '@iso/components/uielements/select';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';

import DefaultForm from './DefaultForm';
import EventList from './EventList';
import TagTab from './TagTab';

const Option = SelectOption;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 80 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 70 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

export default function() {
  const [dataSource, setDataSource] = React.useState([]);


  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };

  const margin = {
    margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
  };
  const colStyle = {
    marginBottom: '16px',
  };
  const gutter = 16;

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="Editar Bicicleta" />
      </PageHeader>
      
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          <Box>
          <ContentHolder>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="Detalhes" key="1">
                  <DefaultForm />
                </TabPane>                  
                <TabPane tab="Tag" key="2">
                  <TagTab />
                </TabPane>   
                <TabPane tab="Eventos" key="3">
                  <EventList />
                </TabPane>          
              </Tabs>                                         
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}

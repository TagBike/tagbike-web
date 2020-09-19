import React from 'react';
import { Col, Row, Icon } from 'antd';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';

import DefaultForm from './GeneralForm';
import MedicalForm from './MedicalForm';
import BikeTable from './BikeTable';
import EventList from './EventList';

export default function() {
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };

  const colStyle = {
    marginBottom: '16px',
  };
  const gutter = 16;

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="Editar Cliente" />
      </PageHeader>
      
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          <Box>
            <ContentHolder>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="Dados Pessoais" key="1">
                  <DefaultForm />
                </TabPane>                  
                <TabPane tab="Dados Médicos" key="2">
                  <MedicalForm />
                </TabPane>   
                <TabPane tab="Bikes" key="3">
                  <BikeTable />
                </TabPane>  
                <TabPane tab="Eventos" key="4">
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

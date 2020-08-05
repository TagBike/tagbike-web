import React from 'react';
import { Col, Row, Icon } from 'antd';
import Input, {
  InputSearch,
  InputGroup,
  Textarea,
} from '@iso/components/uielements/input';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import styled  from 'styled-components';

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

  const handleChange = value => {
    setDataSource(
      !value || value.indexOf('@') >= 0
        ? []
        : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`]
    );
  };

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

const LabelText = styled.label `
    font-size: 15px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
`;

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="forms.input.header" />
      </PageHeader>
      
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          <Box>
            <ContentHolder>
            <div className="isoInputWrapper">
            <form method="post">
              <InputGroup compact style={{ marginBottom: '15px' }}>
                <LabelText >Nome</LabelText>
                <Input type="text" name="name" style={{ marginLeft: 48,  width: '80%' }} placeholder="Informe o nome completo." />
              </InputGroup>
              <InputGroup compact style={{ marginBottom: '15px' }}>
                <LabelText >Email</LabelText>
                <Input type="text" name="email" style={{ marginLeft: 50,  width: '80%' }} placeholder="Informe o nome completo." />
              </InputGroup>
              <InputGroup compact style={{ marginBottom: '15px' }}>
                <LabelText>Telefone</LabelText>
                <Input type="text" name="cellphone" style={{ marginLeft: 28,  width: '80%' }} placeholder="Informe o nome completo." />
              </InputGroup>
              <InputGroup compact style={{ marginBottom: '15px' }}>
                <LabelText>Login</LabelText>
                <Input type="text" name="login" style={{ marginLeft: 50,  width: '80%' }} placeholder="Informe o nome completo." />
              </InputGroup>
              <InputGroup compact style={{ marginBottom: '15px' }}>
                <LabelText>Senha</LabelText>
                <Input type="password" name="password" style={{ marginLeft: 45,  width: '80%' }} placeholder="Informe o nome completo." />
              </InputGroup>
              
              <InputGroup compact style={{ marginBottom: '15px' }}>
              <Button type="primary" style={margin}>
                {<IntlMessages id="Salvar" />}
              </Button>
              <Button type="danger" style={margin}>
                {<IntlMessages id="Cancelar" />}
              </Button>
              </InputGroup>
            </form>  
            </div>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}

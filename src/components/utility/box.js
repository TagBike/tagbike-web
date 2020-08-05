import React from 'react';
import { Card, Icon } from 'antd';
import Button, { ButtonGroup } from '@iso/components/uielements/button';
import BoxTitleWrapper from './boxTitle';
import { BoxWrapper } from './box.style';
import { BoxActionsWrapper } from './boxActions';

export default props => (
  <BoxWrapper
    className={`${props.className ? props.className : ''} isoBoxWrapper`}
    style={props.style}
  >
    <Card title={props.title} {...props} >
      {props.children}
    </Card>
  </BoxWrapper>
);
import React from 'react';
import {  } from 'antd';
import { BoxActionsWrapper } from './boxActions.style';

export default props => (
  <BoxActionsWrapper
    className={`${props.className ? props.className : ''} isoBoxActionsWrapper`}
    style={props.style}
  >
    {props.children}
  </BoxActionsWrapper>
);

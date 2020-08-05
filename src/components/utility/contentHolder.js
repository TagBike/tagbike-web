import React from 'react';
import { ContentHolderWrapper } from './contentHolder.style';

export default props => (
  <ContentHolderWrapper className="isoExampleWrapper" style={props.style} {...props}>
    {props.children}
  </ContentHolderWrapper>
);

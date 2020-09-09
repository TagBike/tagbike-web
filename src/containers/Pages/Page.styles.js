import styled from 'styled-components';
import { palette } from 'styled-theme';
import Buttons from '@iso/components/uielements/button';
import { borderRadius } from '@iso/lib/helpers/style_utils';
import Table from '../Tables/AntTables/AntTables.styles';
import WithDirection from '@iso/lib/helpers/rtl';

const TableWrapper = styled(Table)`
  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
`;

const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette('primary', 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.draft {
    background-color: ${palette('warning', 0)};
  }

  &.publish {
    background-color: ${palette('success', 0)};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonHolders = styled.div``;

const ComponentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${palette('text', 0)};
  margin: 5px 0;
`;

const ActionBtn = styled(Buttons)`
  && {
    padding: 0 12px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 17px;
      color: ${palette('text', 1)};
    }

    &:hover {
      i {
        color: inherit;
      }
    }
  }
`;

const Fieldset = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 13px;
  color: ${palette('text', 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 18px;
      color: ${palette('primary', 0)};

      &:hover {
        color: ${palette('primary', 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette('error', 0)};

        &:hover {
          color: ${palette('error', 2)};
        }
      }
    }
  }
`;

const Form = styled.div``;

const WDFormWrapper = styled.div`
  width: 100%;
  padding: ${props =>
    props['data-rtl'] === 'rtl' ? '0 30px 0 20px' : '0 20px 0 30px'};
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 0;
    margin-bottom: 50px;
  }

  .isoInputFieldset {
    width: 100%;
    display: flex;
    margin-bottom: 35px;

    &.vertical {
      flex-direction: column;
    }

    .isoInputBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: ${props =>
        props['data-rtl'] === 'rtl' ? '0 0 0 35px' : '0 35px 0 0'};

      &:last-child {
        margin: 0;
      }

      .ant-select {
        .ant-select-selection {
          &.ant-select-selection--single {
            height: 42px;
            ${borderRadius()};
          }

          .ant-select-selection__rendered {
            line-height: 42px;
            font-size: 13px;
          }
        }
      }
    }

    input {
      ${borderRadius()};
    }
  }

  .ant-checkbox-wrapper {
    span {
      font-size: 13px;
      font-weight: 500;
      color: ${palette('text', 0)};
      line-height: 1.2;
      vertical-align: middle;
    }
  }
`;


const FormWrapper = WithDirection(WDFormWrapper);

const ToolbarWrapper = styled.div`
  input{
    border-right-width: 0 !important;
    border-radius: 0 !important;
    &:focus, &:hover, .ant-input-focused{
      border-right-width: 0 !important;
      border-color: #e9e9e9 !important;
    }
  }
`;

export {
  ActionBtn,
  Fieldset,
  Label,
  Form,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
  FormWrapper,
  ToolbarWrapper
};

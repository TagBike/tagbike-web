import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import IntlMessages from '@iso/components/utility/intlMessages';
import userpic from '@iso/assets/images/user1.png';
import authAction from '@iso/redux/auth/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import {doLogout} from '../../helpers/AuthHandler';

const { logout } = authAction;

const handleLogout = () => {
  doLogout();
  window.location.href = '/';
}

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to={'/myprofile'}>
        <IntlMessages id="topbar.myprofile" />
      </Link>
      <div className="isoDropdownLink" onClick={handleLogout}>
        <IntlMessages id="topbar.logout" />
      </div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={userpic} />
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}

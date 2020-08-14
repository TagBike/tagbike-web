import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';

import logoIcon from '@iso/assets/images/icons/icon-96x96.png';
import logo from '@iso/assets/images/logo_header.png';

export default ({ collapsed, title }) => {
  return (
    <div className={`isoLogoWrapper ${collapsed ? 'collapsed' : ''}`} >
      {collapsed ? (
        <Link to="/">
          <img src={logoIcon} alt={title} />
        </Link>
      ) : (
        <Link to="/">
          <img src={logoIcon} alt={title} />
        </Link>
      )}
    </div>
  );
};


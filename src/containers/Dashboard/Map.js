import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';
import ThemeSwitcher from '@iso/containers/ThemeSwitcher/ThemeSwitcher';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import DashboardRoutes from './DashboardRoutes';

import { DashboardContainer, DashboardGlobalStyles } from './Dashboard.styles';

import SocketController from '../../SocketController';

const { Content } = Layout;
const {
  toggleAll,
  toggleCollapsed,
} = appActions;

const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '60px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  topbar: {
    position: 'absolute',
    zIndex: 500,
    width: '100%',
    left: 0,
    top: 0,
    background: 'transparent',
    borderTop: '1px solid #ededed',
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(state => state.App.height);
  const { width, height } = useWindowSize();
  
  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  dispatch(toggleCollapsed());
  
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <SocketController />
        <Topbar style={styles.topbar}/>
        <Layout style={styles.layout}>
          <Sidebar collapsed={true} openDrawer={false} />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isomorphicContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
          </Layout>
        </Layout>
        <ThemeSwitcher />
      </Layout>
    </DashboardContainer>
  );
}

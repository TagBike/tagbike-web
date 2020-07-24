import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: '',
    component: lazy(() => import('@iso/containers/Widgets/Widgets')),
    exact: true,
  },
  {
    path: 'add-user',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/Add-User')
    ),
  },
  {
    path: 'list-user',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/List-User.js')
    ),
  },
  {
    path: 'add-client',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Client/Add-Client')
    ),
  },
  {
    path: 'list-client',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Client/List-Client.js')
    ),
  },
  {
    path: 'add-plans',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/Add-Plans')
    ),
  },
  {
    path: 'list-plans',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/List-Plans')
    ),
  },
  {
    path: 'add-bike',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/Add-Bike')
    ),
  },
  {
    path: 'list-bike',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/List-Bike')
    ),
  },
  {
    path: 'add-hangtags',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Hangtags/Add-Hangtags')
    ),
  },
  {
    path: 'list-hangtags',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Hangtags/List-Hangtags')
    ),
  },
 
 
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}

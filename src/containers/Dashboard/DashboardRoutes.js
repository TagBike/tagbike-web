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
    path: 'users',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/User.js')
    ),
  },
  {
    path: 'edit-user',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/Edit-User.js')
    ),
  },
  {
    path: 'add-client',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Client/Add-Client')
    ),
  },
  {
    path: 'customers',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Client/List-Client.js')
    ),
  },
  {
    path: 'edit-client',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Client/Edit-Client.js')
    ),
  },
  {
    path: 'add-plans',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/Add-Plans')
    ),
  },
  {
    path: 'plans',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/List-Plans')
    ),
  },
  {
    path: 'edit-plan',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/Edit-Plans')
    ),
  },
  {
    path: 'add-bike',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/Add-Bike')
    ),
  },
  {
    path: 'bikes',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/List-Bike')
    ),
  },
  {
    path: 'edit-bike',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/Edit-Bike')
    ),
  },
  {
    path: 'add-tags',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Tags/Add')
    ),
  },
  {
    path: 'tags',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Tags/Tags')
    ),
  },
  {
    path: 'edit-tags',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Tags/Edit')
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

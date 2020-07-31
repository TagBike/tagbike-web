import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [

  {
    path: '',
    component: lazy(() => import('@iso/containers/Widgets/Widgets')),
    exact: true
  },
  {
    path: 'dashboard',
    component: lazy(() => import('@iso/containers/Widgets/Widgets')),
  },
  {
    path: 'users/add',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/Add')
    ),
  },
  {
    path: 'users',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/User.js')
    ),
  },
  {
    path: 'users/edit',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/User/Edit.js')
    ),
  },
  {
    path: 'customers/add',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Customer/Add')
    ),
  },
  {
    path: 'customers',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Customer/Customer.js')
    ),
  },
  {
    path: 'customers/edit',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Customer/Edit.js')
    ),
    exact:true
  },
  {
    path: 'plans/add',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/Add')
    ),
    exact:true
  },
  {
    path: 'plans',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/Plans')
    ),
    exact:true
  },
  {
    path: 'plans/edit',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Plans/Edit')
    ),
    exact:true
  },
  {
    path: 'add/bikes',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/Add')
    ),
  },
  {
    path: 'bikes',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/Bike')
    ),
  },
  {
    path: 'bikes/edit',
    component: lazy(() =>
      import('@iso/containers/FirestoreCRUD/Article/Bike/Edit')
    ),
  },
  {
    path: 'tags/add',
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
    path: 'tags/edit',
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
        {
        routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}

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
      import('@iso/containers/Pages/User/Add')
    ),
  },
  {
    path: 'users',
    component: lazy(() =>
      import('@iso/containers/Pages/User/User.js')
    ),
  },
  {
    path: 'users/edit',
    component: lazy(() =>
      import('@iso/containers/Pages/User/Edit.js')
    ),
  },
  {
    path: 'customers/add',
    component: lazy(() =>
      import('@iso/containers/Pages/Customer/Add')
    ),
  },
  {
    path: 'customers',
    component: lazy(() =>
      import('@iso/containers/Pages/Customer/Customer.js')
    ),
  },
  {
    path: 'customers/edit',
    component: lazy(() =>
      import('@iso/containers/Pages/Customer/Edit.js')
    ),
    exact:true
  },
  {
    path: 'plans/add',
    component: lazy(() =>
      import('@iso/containers/Pages/Plans/Add')
    ),
    exact:true
  },
  {
    path: 'plans',
    component: lazy(() =>
      import('@iso/containers/Pages/Plans/Plans')
    ),
    exact:true
  },
  {
    path: 'plans/edit',
    component: lazy(() =>
      import('@iso/containers/Pages/Plans/Edit')
    ),
    exact:true
  },
  {
    path: 'add/bikes',
    component: lazy(() =>
      import('@iso/containers/Pages/Bike/Add')
    ),
  },
  {
    path: 'bikes',
    component: lazy(() =>
      import('@iso/containers/Pages/Bike/Bike')
    ),
  },
  {
    path: 'bikes/edit',
    component: lazy(() =>
      import('@iso/containers/Pages/Bike/Edit')
    ),
  },
  {
    path: 'tags/add',
    component: lazy(() =>
      import('@iso/containers/Pages/Tags/Add')
    ),
  },
  {
    path: 'tags',
    component: lazy(() =>
      import('@iso/containers/Pages/Tags/Tags')
    ),
  },
  {
    path: 'tags/edit',
    component: lazy(() =>
      import('@iso/containers/Pages/Tags/Edit')
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

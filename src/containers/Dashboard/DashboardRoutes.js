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
    component: lazy(() => 
      import('@iso/containers/Widgets/Widgets')
    ),
    exact: true
  },
  
  {
    path: 'users/add',
    component: lazy(() =>
      import('@iso/containers/Pages/User/Add')
    ),
    exact: true
  },
  {
    path: 'users',
    component: lazy(() =>
      import('@iso/containers/Pages/User/User.js')
    ),
    exact: true
  },
  {
    path: 'users/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Pages/User/Edit.js')
    ),
    exact: true
  },
  {
    path: 'customers/add',
    component: lazy(() =>
      import('@iso/containers/Pages/Customer/Add')
    ),
    exact: true
  },
  {
    path: 'customers',
    component: lazy(() =>
      import('@iso/containers/Pages/Customer/Customer.js')
    ),
    exact: true
  },
  {
    path: 'customers/edit/:id',
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
    exact: true
  },
  {
    path: 'plans',
    component: lazy(() =>
      import('@iso/containers/Pages/Plans/Plans')
    ),
    exact: true
  },
  {
    path: 'plans/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Pages/Plans/Edit')
    ),
    exact: true
  },
  {
    path: 'bikes/add',
    component: lazy(() =>
      import('@iso/containers/Pages/Bike/Add')
    ),
    exact: true
  },
  {
    path: 'bikes',
    component: lazy(() =>
      import('@iso/containers/Pages/Bike/Bike')
    ),
    exact: true
  },
  {
    path: 'bikes/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Pages/Bike/Edit')
    ), 
    exact: true
  },
  {
    path: 'tags/add',
    component: lazy(() =>
      import('@iso/containers/Pages/Tags/Add')
    ),
    exact: true
  },
  {
    path: 'tags',
    component: lazy(() =>
      import('@iso/containers/Pages/Tags/Tags')
    ),
    exact: true
  },
  {
    path: 'tags/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Pages/Tags/Edit')
    ),
    exact: true
  }, 
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}

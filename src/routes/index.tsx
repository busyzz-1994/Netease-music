import React, { lazy, Suspense } from 'react';
import BlankLayout from 'layout/BlankLayout';
import IndexLayout from 'layout/IndexLayout';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};
const Recommend = lazy(() => import('pages/recommend'));
const Singers = lazy(() => import('pages/singers'));
const SingerDetail = lazy(() => import('pages/singerDetail'));
const Album = lazy(() => import('pages/album'));
const Rank = lazy(() => import('pages/rank'));
const Search = lazy(() => import('pages/search'));
const routes: Array<RouteConfig> = [
  {
    component: BlankLayout,
    routes: [
      {
        path: '/',
        component: IndexLayout,
        routes: [
          {
            path: '/',
            exact: true,
            render: () => <Redirect to="/recommend" />,
          },
          {
            path: '/recommend',
            component: SuspenseComponent(Recommend),
            routes: [
              {
                path: '/recommend/:id',
                component: SuspenseComponent(Album),
              },
            ],
          },
          {
            path: '/singers',
            component: SuspenseComponent(Singers),
            routes: [
              {
                path: '/singers/:id',
                component: SuspenseComponent(SingerDetail),
              },
            ],
          },
          {
            path: '/rank',
            component: SuspenseComponent(Rank),
          },
          {
            path: '/search',
            component: SuspenseComponent(Search),
          },
        ],
      },
    ],
  },
];
export default routes;

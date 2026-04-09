import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Solar } from './pages/Solar';
import { Pumping } from './pages/Pumping';
import { Grid } from './pages/Grid';
import { Reports } from './pages/Reports';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'solar',
        Component: Solar,
      },
      {
        path: 'pumping',
        Component: Pumping,
      },
      {
        path: 'grid',
        Component: Grid,
      },
      {
        path: 'reports',
        Component: Reports,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);


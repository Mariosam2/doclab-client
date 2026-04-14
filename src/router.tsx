import { createBrowserRouter } from 'react-router';
import Landing from './features/Landing/Landing';
import NotFound from './features/NotFound/NotFound';
import LoginForm from './features/Auth/LoginForm/LoginForm';
import Documents from './features/Dashboard/components/Documents/Documents';
import App from './App';
import RegisterForm from './features/Auth/Register/RegisterForm';
import Summary from './features/Dashboard/components/Summary/Summary';
import Editor from './features/Dashboard/components/Editor/Editor';
import AcceptInvite from './features/AcceptInvite/AcceptInvite';
import Profile from './features/Dashboard/components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    HydrateFallback: () => null,
    children: [
      {
        element: <Landing />,
        index: true,
      },
      {
        path: 'home',
        element: <Landing />,
        index: true,
      },
      {
        path: 'auth',
        lazy: () =>
          import('./features/Auth/layouts/AuthLayout').then((m) => ({
            Component: m.default,
          })),
        children: [
          {
            element: <LoginForm />,
            index: true,
          },
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'register',
            element: <RegisterForm />,
          },
        ],
      },
      {
        path: '/dashboard',
        lazy: () =>
          import('./features/Dashboard/Dashboard').then((m) => ({
            Component: m.default,
          })),

        children: [
          {
            element: <Documents />,
            index: true,
          },
          {
            path: 'documents',
            element: <Documents />,
          },
          {
            path: 'summary',
            element: <Summary />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'documents/:documentId',
            element: <Editor />,
          },
          {
            path: 'invite/:linkId',
            element: <AcceptInvite />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

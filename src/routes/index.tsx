import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminLayout from '@/layout/AdminLayout';
import Landingpage from '@/pages/landing.page';
import SignInPage from '@/pages/signin.page';
import PublicRoute from './PublicRoute';
import Homepage from '@/pages/homepage';
import Builder from '@/pages/builder';
import FormDetailPage from '@/pages/forms';

interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

const NotFound = () => {
  return <Navigate to='/dashboard' />;
};

const routes: AppRoute[] = [
  { path: '/', element: <PublicRoute element={<Landingpage />} /> },
  { path: '/sign-in', element: <PublicRoute element={<SignInPage />} /> },
  {
    path: '/dashboard',
    element: <PrivateRoute element={<AdminLayout />} />,

    children: [
      {
        path: '',
        element: <Homepage />,
      },
      { path: 'builder', element: <Builder /> },
      {
        path: 'builder/:id',
        element: <Builder />,
      },
      {
        path: 'forms/:id',
        element: <FormDetailPage />,
      },
      {
        path: 'forms/:id',
        element: <p>Forms page</p>,
      },
    ],
  },

  {
    path: '/*',
    element: <NotFound />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route?.children?.map((childRoute) => (
            <Route
              key={childRoute.path}
              path={childRoute.path}
              element={childRoute.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;

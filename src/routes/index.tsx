import { Navigate, Route, Routes } from 'react-router-dom';

interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

const NotFound = () => {
  return <Navigate to='/home' />;
};
const routes: AppRoute[] = [
  {
    path: '/home',
    element: <p>Home</p>,
  },
  {
    path: '/builder',
    element: <p>Builder</p>,
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
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;

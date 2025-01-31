import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ element }: { element?: JSX.Element }) => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    // Prevent rendering until authentication state is resolved
    return null;
  }

  if (!user) {
    return <Navigate to='/sign-in' replace />;
  }
  return element || <Outlet />;
};

export default PrivateRoute;

import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ element }: { element?: JSX.Element }) => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    // Prevent rendering until authentication state is resolved
    return null;
  }

  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  return element || <Outlet />;
};

export default PublicRoute;

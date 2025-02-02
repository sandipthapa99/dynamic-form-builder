import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = ({ element }: { element?: JSX.Element }) => {
  const { isLoaded, user } = useUser();
  const { pathname } = useLocation();
  const isSubmitPage = pathname.split('/')[1] === 'submit';

  if (!isLoaded) {
    // Prevent rendering until authentication state is resolved
    return null;
  }

  if (user && !isSubmitPage) {
    return <Navigate to='/dashboard' replace />;
  }

  return element || <Outlet />;
};

export default PublicRoute;

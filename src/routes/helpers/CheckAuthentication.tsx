import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface CheckAuthenticationProps {
  page: 'public' | 'private';
}

export const CheckAuthentication: React.FC<CheckAuthenticationProps> = ({
  page,
}) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (page === 'public' && isLoggedIn) {
    return <Navigate to="/user" replace />;
  }

  if (page === 'private' && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

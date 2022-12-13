import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../features/hooks';
const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
    />
  );
};

export default PrivateRoute;

import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CheckAuthentication } from './helpers/CheckAuthentication';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout.layout';

// Lazy-loaded components
const LoginPage = lazy(() => import('../../src/pages/Login.page'));
const DashboardPage = lazy(() => import('../pages/Dashboard.page'));
const UsersPage = lazy(() => import('../../src/pages/User.page'));
const DivisionPage = lazy(() => import('../../src/pages/Division.page'));
const ZillaPage = lazy(() => import('../../src/pages/Zilla.page'));
const UpoZillaPage = lazy(() => import('../../src/pages/Upozilla.page'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<CheckAuthentication page="public" />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route element={<CheckAuthentication page="private" />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UsersPage />} />
          <Route path="/division" element={<DivisionPage />} />
          <Route path="/zilla" element={<ZillaPage />} />
          <Route path="/upo-zilla" element={<UpoZillaPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

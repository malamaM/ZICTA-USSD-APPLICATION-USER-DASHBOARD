import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Login from './pages/Login';
import Loginn from './pages/Loginn';
import Home from './pages/Home';
import Search from './pages/Search';
import ApplicationForm from './pages/ApplicationForm';
import SignUp from './pages/SignUpPage';
import Apply from './pages/Apply';
import Successful from './pages/Successful';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <Loginn />,
    },
    {path: 'successful', element: <Successful />},
    {
      path: 'home',
      element: <Home />,
    },
    {path: 'search', element: <Search />},
    { path: 'apply', element: <ApplicationForm /> },
    { path: 'signup', element: <SignUp /> },
    { path: 'apply2', element: <Apply /> },
,

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);


  return routes;
}

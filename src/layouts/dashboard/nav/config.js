// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    customStyle: {
      color: 'red',
      fontWeight: 'bold',
  },
  },
  {
    title: 'Applications',
    path: '/dashboard/user',
    icon: icon('folder-solid'),
  },
  {
    title: 'New Application',
    path: '/apply2',
    icon: icon('plus-solid'),
  },
  {
    title: 'Place Holder',
    path: '/',
    icon: icon('ic_blog'),
  },
  {
    title: 'Login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Search',
    path: '/Home',
    icon: icon('searchengin'),
  },
];

export default navConfig;

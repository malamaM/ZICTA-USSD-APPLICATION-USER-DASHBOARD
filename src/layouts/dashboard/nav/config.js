// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),      fontWeight: 'bold',
  
  },
  
    {
      title: 'Applications',
      path: '/dashboard/user',
      icon: icon('folder-solid'),
    },
  {
    title: 'New Application',
    path: '/apply',
    icon: icon('plus-solid'),
  },
  {
    title: 'Place Holder',
    path: '/apply',
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

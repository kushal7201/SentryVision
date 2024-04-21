// import FeedbackIcon from '@mui/icons-material/Feedback';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },

  // {
  //   title: 'User',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'Papers',
  //   path: '/papers',
  //   icon: icon('ic_papers'),
  // },
  // {
  //   title: 'Blogs',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'General Info',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Feedback',
  //   path: '/feedback',
  //   icon: icon('ic_feedback'),
  // },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'About Us',
    path: '/info',
    icon: icon('ic_info'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

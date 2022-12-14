import * as pages from '@/pages';

export const routes = [
  {
    path: '/home',
    exact: true,
    name: '首页',
    Component: pages.HomePage,
    children: [],
  },
  {
    path: '/demo',
    exact: true,
    name: 'demo',
    Component: pages.Demo,
    children: [],
  },
  {
    path: '/user',
    exact: true,
    name: '用户',
    Component: pages.UserPage,
    children: [
      {
        path: '/user/signin',
        exact: true,
        name: '登陆',
        Component: pages.SignIn,
        children: [],
      },
      {
        path: '/user/signup',
        exact: true,
        name: '注册',
        Component: pages.SignUp,
        children: [],
      },
      {
        path: '/user/personalinfo',
        exact: true,
        name: '个人信息',
        Component: pages.personalInfoPage,
        children: [],
      },
    ],
  },
];

import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Khách hàng',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Sản phẩm',
    path: '/products',
    icon: icon('ic_cart'),
    children: [
      {
        title: 'Sản phẩm 1',
        path: '/products/1',
      },
      {
        title: 'Sản phẩm 2',
        path: '/products/2',
      },
    ],
  },
  {
    title: 'Loại sản phẩm',
    path: '/productType',
    icon: icon('ic_productType'),
  },
  {
    title: 'Dịch vụ',
    path: '/services',
    icon: icon('ic_services'),
  },
  {
    title: 'Loại dịch vụ',
    path: '/serviceType',
    icon: icon('ic_serviceTypes'),
  },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

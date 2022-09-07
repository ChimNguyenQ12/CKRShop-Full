import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin',
    iconComponent: { name: 'cil-speedometer' },

  },
  {
    title: true,
    name: 'Account'
  },
  {
    name: 'Login',
    url: '/login/login',
    iconComponent: { name: 'cil-lockLocked' }
  },
  {
    name: 'Profile',
    url: '/information',
    iconComponent: { name: 'cilUser' }
  },
  {
    name: 'Management',
    title: true
  },
  {
    name: 'Product',
    url: '/product',
    iconComponent: { name: 'cil-pencil' },
    children: [
      {
        name: 'All Products',
        url: '/product/product',
      },
      {
        name: 'Trash',
        url: '/product-trash'
      },
    ]
  },
  {
    name: 'Category',
    url: '/product-type',
    iconComponent: { name: 'cil-calculator' },
    children: [
      {
        name: 'All Categories',
        url: '/category/category'
      },
      {
        name: 'Trash',
        url: '/category/trash'
      },
    ]
  },
  {
    name: 'User',
    url: '/user',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'All Users',
        url: '/user/user'
      },
      {
        name: 'Trash',
        url: '/user-trash'
      },
    ]
  },
  {
    name: 'Comments',
    iconComponent: { name: 'cilCommentSquare' },
    url: '/comment',
    children: [
      {
        name: 'All Comments',
        url: '/comment/comment',

      },
      {
        name: 'Trash',
        url: '/comment/trash'
      }
    ]
  },
  {
    name: 'Order',
    url: '/order',
    iconComponent: { name: 'cilBookmark' },
    children: [
      {
        name: 'All Orders',
        url: '/order/order'
      },
      {
        name: 'Trash',
        url: '/oder/trash'
      },
    ]
  },
  {
    name: 'Order Status',
    url: '/order-status',
    iconComponent: { name: 'cilBookmark' },
    children: [
      {
        name: 'Processing',
        url: 'order-processing'
      },
      {
        name: 'Confirmed',
        url: 'order-confirmed'
      },
      {
        name: 'Packed',
        url: 'order-packed'
      },
      {
        name: 'Transported',
        url: 'order-transported'
      },
      {
        name: 'Delivered',
        url: 'order-delivered'
      },
      {
        name: 'Canceled',
        url: 'order-canceled'
      },

    ]
  },
  {
    name: 'Image',
    url: '/advertisement',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'All Images',
        url: '/advertisement/advertisement'
      },
      {
        name: 'Image Type',
        url: '/image-type/image-type'
      },
      {
        name: 'Trash',
        url: '/advertisement/trash'
      },
    ]
  },
  {
    name: 'Trademark',
    url: '/trademark',
    iconComponent: { name: 'cilMenu' },
    children: [
      {
        name: 'All Trademarks',
        url: '/trademark/trademark'
      },
      {
        name: 'Trash',
        url: '/trademark/trash'
      },
    ]
  },
  {
    name: 'Statistical',
    url: '/statistical',
    iconComponent: { name: 'cilChart' },
    children: [
      {
        name: 'Product Statistics',
        url: '/product-statistics/'
      },
      {
        name: 'User Statistics',
        url: '/user-statistics/'
      },
      {
        name: 'Order Statistics',
        url: '/order-statistics/'
      },
      {
        name: 'Comment Statistics',
        url: '/comment-statistics/'
      },

    ]
  },
];


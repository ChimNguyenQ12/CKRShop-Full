import { IndexComponent } from './views/Client/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/Client/pages/page404/page404.component';
import { Page500Component } from './views/Client/pages/page500/page500.component';
import { RegisterComponent } from './views/Client/pages/register/register.component';
import { LoginComponent } from './views/Client/pages/login/login.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/homepage',
    pathMatch: 'full'
  },
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'CKR Shop'
    },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/Client/index/index.module').then((m) => m.IndexModule)
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('./views/Client/wishlist/wishlist.module').then((m) => m.WishlistModule)
      },
      {
        path: 'producttype/:id',
        loadChildren: () =>
          import('./views/Client/productsbytype/productsbytype.module').then((m) => m.ProductByTypeModule)
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./views/Client/checkout/checkout.module').then((m) => m.CheckoutModule)
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./views/Client/cart/cart.module').then((m) => m.CartModule)
      },
      {
        path: 'products/:id',
        loadChildren: () =>
          import('./views/Client/single-product/single-product.module').then((m) => m.SingleProductModule)
      },
      {
        path: 'searchproducts/:searchtext',
        loadChildren: () =>
          import('./views/Client/searchedproducts/searchedproducts.module').then((m) => m.SearchProductModule)
      },
      {
        path: 'home/products',
        loadChildren: () =>
          import('./views/Client/products/products.module').then((m) => m.ProductModule)
      },
      {
        path: 'home/homepage',
        loadChildren: () =>
          import('./views/Client/homepage/homepage.module').then((m) => m.HomePageModule)
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./views/Client/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'home/forgot-password',
        loadChildren: () =>
          import('./views/Client/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
      },
      {
        path: 'home/infor',
        loadChildren: () =>
          import('./views/Client/infor/infor.module').then((m) => m.InforModule)
      },
      {
        path: 'home/order',
        loadChildren: () =>
          import('./views/Client/order/order.module').then((m) => m.OrderModule)
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/Admin/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./views/Admin/products/products.module').then((m) => m.ProductModule)
      },
      {
        path: 'product-trash',
        loadChildren: () =>
          import('./views/Admin/products-trash/products-trash.module').then((m) => m.ProductTrashModule)
      },
      {
        path: 'category',

        loadChildren: () =>
          import('./views/Admin/categories/categories.module').then((m) => m.CategoryModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./views/Admin/users/users.module').then((m) => m.UserModule)
      },
      {
        path: 'user-trash',
        loadChildren: () =>
          import('./views/Admin/users-trash/users-trash.module').then((m) => m.UserTrashModule)
      },
      {
        path: 'comment',
        loadChildren: () =>
          import('./views/Admin/comments/comments.module').then((m) => m.CommentModule)
      },
      {
        path: 'advertisement',
        loadChildren: () =>
          import('./views/Admin/advertisements/advertisements.module').then((m) => m.AdvertisementModule)
      },
      {
        path: 'image-type',
        loadChildren: () =>
          import('./views/Admin/image-types/image-types.module').then((m) => m.ImageTypeModule)
      },
      {
        path: 'trademark',
        loadChildren: () =>
          import('./views/Admin/trademarks/trademarks.module').then((m) => m.TrademarkModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/Admin/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/Admin/login/login.module').then((m) => m.LoginModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./views/Admin/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
      },
      {
        path: 'information',
        loadChildren: () =>
          import('./views/Admin/infor/infor.module').then((m) => m.InforModule)
      },
      {
        path: 'product-statistics',
        loadChildren: () =>
          import('./views/Admin/product-statistics/product-statistics.module').then((m) => m.ProductStatisticsModule)
      },
      {
        path: 'user-statistics',
        loadChildren: () =>
          import('./views/Admin/user-statistics/user-statistics.module').then((m) => m.UserStatisticsModule)
      },
      {
        path: 'comment-statistics',
        loadChildren: () =>
          import('./views/Admin/comment-statistics/comment-statistics.module').then((m) => m.CommentStatisticsModule)
      },
      {
        path: 'order-statistics',
        loadChildren: () =>
          import('./views/Admin/order-statistics/order-statistics.module').then((m) => m.OrderStatisticsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/Admin/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./views/Admin/orders/orders.module').then((m) => m.OrderModule)
      },
      {
        path: 'order-canceled',
        loadChildren: () =>
          import('./views/Admin/orders-canceled/orders-canceled.module').then((m) => m.OrderCanceledModule)
      },
      {
        path: 'order-confirmed',
        loadChildren: () =>
          import('./views/Admin/orders-confirmed/orders-confirmed.module').then((m) => m.OrderConfirmedModule)
      },
      {
        path: 'order-delivered',
        loadChildren: () =>
          import('./views/Admin/orders-delivered/orders-delivered.module').then((m) => m.OrderDeliveredModule)
      },
      {
        path: 'order-packed',
        loadChildren: () =>
          import('./views/Admin/orders-packed/orders-packed.module').then((m) => m.OrderPackedModule)
      },
      {
        path: 'order-processing',
        loadChildren: () =>
          import('./views/Admin/orders-processing/orders-processing.module').then((m) => m.OrderProcessingModule)
      },
      {
        path: 'order-transported',
        loadChildren: () =>
          import('./views/Admin/orders-transported/orders-transported.module').then((m) => m.OrderTransportedModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

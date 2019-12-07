import { ShopLayout } from '../layouts'
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
/**
 * 店(温泉)动态路由
 */
 export const asyncShopRestaurantRouterMap = [
    {
      path: '/shop',
      name: 'shop-home',
      component: ShopLayout,
      meta: { title: '首页' },
      redirect: '/shop/restaurant',
      children: [
        {
          path: '/shop/restaurant',
          name: 'shop-dashboard',
          redirect: '/shop/restaurant/restaurantManagement',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '餐厅管理', icon: 'form' },
          children: [
            {
              path: '/shop/restaurant/restaurantManagement',
              name: 'shop-restaurant-restaurantManagement',
              component: () => import('@/views/shop/restaurant/restaurantManagement/RestaurantManagement'),
              meta: { title: '餐厅管理', },
            },
          ]
        },
      ]
    }
  ]
  
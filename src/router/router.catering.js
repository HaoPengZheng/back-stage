import { ShopLayout } from '../layouts'
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
/**
 * 店(温泉)动态路由
 */
 export const asyncShopCateringRouterMap = [
    {
      path: '/shop/catering',
      name: 'shop-catering',
      component: ShopLayout,
      meta: { title: '首页' },
      redirect: '/shop/catering/:shopId',
      children: [
        {
          path: '/shop/catering/:shopId',
          name: 'shop-dashboard',
          redirect: '/shop/catering/:shopId/restaurantManagement',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '餐厅管理', icon: 'form' },
          children: [
            {
              path: '/shop/catering/:shopId/restaurantManagement',
              name: 'shop-catering-restaurantManagement',
              component: () => import('@/views/shop/catering/restaurantManagement/RestaurantManagement'),
              meta: { title: '餐厅管理', },
            },
          ]
        },
      ]
    }
  ]
  
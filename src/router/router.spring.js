import { ShopLayout } from '../layouts'
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
/**
 * 店(温泉)动态路由
 */
 export const asyncShopSpringRouterMap = [
    {
      path: '/shop/hot_spring',
      name: 'shop-home',
      component: ShopLayout,
      meta: { title: '首页' },
      redirect: '/shop/spring',
      children: [
        {
          path: '/shop/hot_spring/:shopId',
          name: 'shop-dashboard',
          redirect: '/shop/hot_spring/:shopId/springManagement',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '温泉管理', icon: 'form' },
          children: [
            {
              path: '/shop/hot_spring/:shopId/springManagement',
              name: 'shop-spring-springManagement',
              component: () => import('@/views/shop/spring/springManagement/SpringManagement'),
              meta: { title: '温泉管理', },
            },
          ]
        },
      ]
    }
  ]
  
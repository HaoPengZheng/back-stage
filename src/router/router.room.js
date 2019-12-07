import { ShopLayout } from '../layouts'
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
/**
 * 店(房间)动态路由
 */
 export const asyncShopRoomRouterMap = [
    {
      path: '/shop',
      name: 'shop-home',
      component: ShopLayout,
      meta: { title: '首页' },
      redirect: '/shop/room',
      children: [
        {
          path: '/shop/room',
          name: 'shop-dashboard',
          redirect: '/shop/room/roomManagement',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '房价管理', icon: 'form' },
          children: [
            {
              path: '/shop/room/roomManagement',
              name: 'shop-room-roomManagement',
              component: () => import('@/views/shop/room/roomManagement/RoomManagement'),
              meta: { title: '房间管理', },
            },
          ]
        },
      ]
    }
  ]
  
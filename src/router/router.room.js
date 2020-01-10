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
        {
          path: '/shop/room/good',
          name: 'shop-room-good',
          redirect: '/shop/room/good',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '商品', icon: 'shop' },
          children: [
            {
              path: '/shop/room/good/add',
              name: 'shop-room-good-add',
              component: () => import('@/views/shop/room/good/addGood/AddGood'),
              meta: { title: '添加商品', },
            },
            {
              path: '/shop/room/good/management',
              name: 'shop-room-console.log(flag)good-management',
              component: () => import('@/views/shop/room/good/goodManagement/GoodManagement'),
              meta: { title: '商品管理' }
            },
          ]
        },
        {
          path: '/shop/room/order',
          name: 'shop-room-order',
          redirect: '/shop/room/order',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '酒店订单', icon: 'shop' },
          children: [
            {
              path: '/shop/room/good/place',
              name: 'shop-room-orlder-place',
              component: () => import('@/views/shop/room/order/placeOrder/PlaceOrder'),
              meta: { title: '酒店下单', },
            },
            {
              path: '/shop/room/order/management',
              name: 'shop-room-all-order',
              component: () => import('@/views/shop/room/order/AllOrder'),
              meta: { title: '酒店订单管理' }
            },
          ]
        },
      ]
    }
  ]
    
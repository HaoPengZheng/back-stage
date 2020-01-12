import { ShopLayout } from '../layouts'
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
/**
 * 店(房间)动态路由
 */
 export const asyncShopHotelRouterMap = [
    {
      path: '/shop/hotel',
      name: 'shop-home',
      component: ShopLayout,
      meta: { title: '首页' },
      redirect: '/shop/hotel/:shopId',
      children: [
        {
          path: '/shop/hotel/:shopId',
          name: 'shop-dashboard',
          redirect: '/shop/hotel/:shopId/roomManagement',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '房价管理', icon: 'form' },
          children: [
            {
              path: '/shop/hotel/:shopId/roomManagement',
              name: 'shop-hotel-roomManagement',
              component: () => import('@/views/shop/hotel/roomManagement/RoomManagement'),
              meta: { title: '房间管理', },
            },
          ]
        },
        {
          path: '/shop/hotel/good',
          name: 'shop-hotel-good',
          redirect: '/shop/hotel/:shopId/good',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '商品', icon: 'shop' },
          children: [
            {
              path: '/shop/hotel/:shopId/good/add',
              name: 'shop-hotel-good-add',
              component: () => import('@/views/shop/hotel/good/addGood/AddGood'),
              meta: { title: '添加商品', },
            },
            {
              path: '/shop/hotel/:shopId/good/management',
              name: 'shop-hotel-good-management',
              component: () => import('@/views/shop/hotel/good/goodManagement/GoodManagement'),
              meta: { title: '商品管理' }
            },
          ]
        },
        {
          path: '/shop/hotel/:shopId/order',
          name: 'shop-hotel-order',
          redirect: '/shop/hotel/order',
          component: RouteView,
          permission: ['dashboard'],
          meta: { title: '酒店订单', icon: 'shop' },
          children: [
            {
              path: '/shop/hotel/:shopId/good/place',
              name: 'shop-hotel-orlder-place',
              component: () => import('@/views/shop/hotel/order/placeOrder/PlaceOrder'),
              meta: { title: '酒店下单', },
            },
            {
              path: '/shop/hotel/:shopId/order/management',
              name: 'shop-hotel-all-order',
              component: () => import('@/views/shop/hotel/order/AllOrder'),
              meta: { title: '酒店订单管理' }
            },
          ]
        },
      ]
    }
  ]
    
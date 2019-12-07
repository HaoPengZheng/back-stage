import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
import { ShopLayout } from '../layouts'
/**
 * 基础路由
 * @type { *[] }
 */
 export const constantRouterMap = [
    {
      path: '/',
      component: LoginLayout,
      redirect: '/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/user/Login'),
          meta: { title: '登录' }
        },
        {
          path: '/company-choose',
          name: 'company-choose',
          component: () => import('@/views/user/CompanyChoose'),
          meta: { title: '切换公司' }
        }
      ]
    },
    {
      path: '/apply',
      component: LoginLayout,
      redirect: '/apply/company',
      children: [
        {
          path: '/apply/company',
          name: 'apply-company',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/public/ApplyCompany'),
          meta: { title: '申请公司', }
        }
      ]
    },
    // Exception
    {
      path: '/exception',
      name: 'exception',
      component: RouteView,
      redirect: '/exception/403',
      meta: {
        title: '异常页',
        icon: 'warning',
        permission: ['exception']
      },
      children: [
        {
          path: '403',
          name: 'Exception403',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
          meta: { title: '403', }
        },
        {
          path: '404',
          name: 'Exception404',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
          meta: { title: '404', }
        },
        {
          path: '500',
          name: 'Exception500',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
          meta: { title: '500', }
        }
      ]
    }
  ]
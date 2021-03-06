// eslint-disable-next-line
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'
import { ShopLayout } from '../layouts'
import { asyncShopHotelRouterMap} from './router.hotel'
import { asyncShopSpringRouterMap } from './router.spring'
import { asyncShopCateringRouterMap} from './router.catering'
import { constantRouterMap } from './router.base';
/**
 * 公司动态路由
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/shop',
        component: RouteView,
        permission: ['dashboard'],
        meta: { title: '仪表盘', icon: 'form' },
        children: [
          {
            path: '/dashboard/shop',
            name: 'shop-choice',
            component: () => import('@/views/dashboard/shopChoice/ShopChoice'),
            meta: { title: '进店' }
          },
          {
            path: '/dashboard/statistics',
            name: 'statistics',
            component: () => import('@/views/dashboard/statistics/DataStatistics'),
            meta: { title: '数据统计', },
          },
          {
            path: '/dashboard/report',
            name: 'report',
            component: () => import('@/views/dashboard/report/ReportCenter'),
            meta: {
              title: '报表中心',
              permission: ['report']
            }
          },
          {
            path: '/dashboard/log',
            name: 'admin-log',
            component: () => import('@/views/dashboard/AdminLog'),
            meta: { title: '系统日志' },
          }
        ]
      },
      {
        path: '/business',
        name: 'business',
        redirect: '/business/roomtype',
        component: RouteView,
        meta: {
          title: '营业管理',
          icon: 'wechat',
          permission: ['business'],
        },
        children: [
          {
            path: '/business/roomtype',
            name: 'roomtype',
            component: () => import('@/views/business/roomtype/RoomTypeManagement'),
            meta: { title: '房型管理', icon: '' }
          },
          {
            path: '/business/state',
            name: 'roomstate',
            component: () => import('@/views/business/roomstate/RoomState'),
            meta: { title: '房态', icon: '' }
          },
          {
            path: '/business/bus',
            name: 'bus',
            component: () => import('@/views/business/bus/BusManagement'),
            meta: { title: '接车管理', icon: '' }
          }
        ]
      },
      {
        path: '/company',
        name: 'company',
        redirect: '/company/employee/management',
        component: RouteView,
        meta: {
          title: '公司', icon: 'deployment-unit',
          //  permission: ['company']
        },
        children: [
          {
            path: '/company/employee/management',
            name: 'staff-management',
            component: () => import('@/views/company/employee/StaffManagement'),
            meta: { title: '员工管理' }
          },
          {
            path: '/company/employee/list',
            name: 'staff-list',
            component: () => import('@/views/company/employeeList/EmployeeList'),
            meta: { title: '员工列表' }
          },
          {
            path: '/company/employee/day',
            name: 'day-employee',
            component: () => import('@/views/company/dayEmployee/DayEmployee'),
            meta: { title: '临时工管理' }
          },
          {
            path: '/company/organizational/management',
            name: 'organizational-management',
            component: () => import('@/views/company/organizational/OrgManagement'),
            meta: { title: '机构管理', icon: '' }
          },
          {
            path: '/company/job/management',
            name: 'job-management',
            component: () => import('@/views/company/job/JobManagement'),
            meta: { title: '职位管理', icon: '' }
          },
          {
            path: '/company/user/management/list',
            name: 'user-management',
            component: () => import('@/views/company/user/UserManagement'),
            meta: { title: '用户管理', icon: '' },
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        redirect: '/order/index',
        meta: { title: '订单', icon: 'shop', },
        component: RouteView,
        children: [
          {
            path: '/order/index',
            name: 'order-index',
            component: () => import('@/views/order/AllOrder'),
            meta: { title: '全部订单' }
          },
          {
            path: '/order/place',
            name: 'place-order',
            component: () => import('@/views/order/placeOrder/PlaceOrder'),
            meta: { title: '快速下单' }
          }
        ]
      },
      {
        path: '/good',
        name: 'good',
        redirect: '/good/add',
        meta: { title: '商品', icon: 'shop' },
        component: RouteView,
        children: [
          {
            path: '/good/add',
            name: 'add-good',
            component: () => import('@/views/good/addGood/AddGood'),
            meta: { title: '添加商品' }
          },
          {
            path: '/good/price',
            name: 'price-date',
            component: () => import('@/views/good/price/PriceDateManagement'),
            meta: { title: '价格日期规则' }
          },
          {
            path: '/good/price/management',
            name: 'price-management',
            component: () => import('@/views/good/priceManagement/GoodPriceManagement'),
            meta: { title: '商品价格管理' }
          },
          {
            path: '/good/management',
            name: 'good-management',
            component: () => import('@/views/good/goodManagement/GoodManagement'),
            meta: { title: '商品管理' }
          },
          {
            path: '/good/comment/management',
            name: 'comment-management',
            component: () => import('@/views/good/comment/CommentManagement'),
            meta: { title: '评论管理' }
          },
          {
            path: '/good/type/management',
            name: 'type-management',
            component: () => import('@/views/good/typeManagement/TypeManagement'),
            meta: { title: '类型管理' }
          }
        ]
      },
      {
        path: '/wechat',
        name: 'wechat',
        redirect: '/wechat/AutoResponse',
        meta: { 
          title: '微信设置', icon: 'wechat',
          // permission: ['company'] 
        },
        component: RouteView,
        children: [
          {
            path: '/wechat/response',
            name: 'auto-response',
            component: () => import('@/views/wechat/autoResponse/index'),
            meta: { title: '自动回复' }
          },
          {
            path: '/wechat/menu',
            name: 'wechat-menu',
            component: () => import('@/views/wechat/customizeMenu/index'),
            meta: { title: '自定义菜单' }
          }
        ]
      },
      {
        path: '/linen',
        name: 'linen',
        redirect: '/linen/linenManagement',
        meta: {
          title: '布草管理', icon: 'wechat',
          //  permission: ['linen'] 
        },
        component: RouteView,
        children: [
          {
            path: '/linen/linenManagement',
            name: 'linen-management',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '布草类型' }
          },
          {
            path: '/linen/linenStorage',
            name: 'linen-Storage',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '布草入库' }
          },
          {
            path: '/linen/linenScan',
            name: 'linen-scan',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '布草扫描' }
          },
          {
            path: '/linen/linenSetting',
            name: 'linen-setting',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '仓库设置' }
          },
          {
            path: '/linen/linenRoomType',
            name: 'linen-roomType',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '房型布草' }
          }
        ]
      },
      {
        path: '/reception',
        name: 'reception',
        redirect: '/reception/roomstate',
        meta: { title: '前台', icon: 'shop' },
        component: RouteView,
        children: [
          {
            path: '/reception/roomstate',
            component: () => import('@/views/reception/roomManagement/RoomManagement'),
            meta: { title: '房态管理', icon: 'menu', module: 1 }
          },
          // {
          //   path: 'checkin',
          //   component: () => import('@/views/errpage/err404'),
          //   meta: { title: '预定分房入住', icon: 'menu', module: 1 }
          // },
          {
            path: 'chooseroom',
            component: () => import('@/views/reception/chooseRoom/ChooseRoom'),
            meta: { title: '房态分房', icon: 'menu', module: 1 }
          },
          // {
          //   path: 'order',
          //   component: () => import('@/views/orderPage/OrderPage'),
          //   meta: { title: '订单管理', icon: 'menu', module: 1 }
          // },
          {
            path: 'lock',
            component: () => import('@/views/reception/doorLock/index'),
            meta: { title: '门锁管理', icon: 'menu', module: 1 }
          }
        ]
      },
      {
        path: '/account',
        name: 'account',
        redirect: '/account/center',
        meta: {
          title: '个人中心', icon: 'wechat',
        },
        component: RouteView,
        children: [
          {
            path: '/account/center',
            name: 'account-center',
            component: () => import('@/views/account/center/Center'),
            meta: { title: '个人信息' }
          },
        ],
      },
      {
        path: '/coupon',
        name: 'coupon',
        redirect: '/coupon/list',
        meta: {
          title: '优惠券',
          icon: 'euro'
        },
        component: RouteView,
        children: [{
          path: '/coupon/list',
          name: 'coupon-list',
          component: () => import('@/views/coupon/couponList/CouponList'),
          meta: {
            title: '优惠券列表'
          }
        },
        {
          path: '/coupon/add',
          name: 'coupon-add',
          component: () => import('@/views/coupon/addCoupon/AddCoupon'),
          meta: {
            title: '添加优惠券'
          }
        }
        ]
      },
      {
        path: '/tag',
        name: 'tag',
        redirect: '/tag/list',
        meta: {
          title: '标签',
          icon: 'tags'
        },
        component: RouteView,
        children: [
          {
            path: '/tag/list',
            name: 'tag-list',
            component: () => import('@/views/tags/tagList/TagList'),
            meta: {
              title: '标签列表'
            }
          },
          {
            path: '/tag/edit',
            name: 'tag-edit',
            component: () => import('@/views/tags/tagEdit/TagEdit'),
            meta: {
              title: '标签編輯'
            }
          }
        ]
      },
      {
        path: '/member',
        name: 'member',
        redirect: '/member/message',
        meta: {
          title: '会员中心',
          icon: 'message'
        },
        component: RouteView,
        children: [
          {
            path: '/member/message',
            name: 'member-message',
            component: () => import('@/views/member/memberMessage/MemberMessage'),
            meta: {
              title: '会员通信中心'
            }
          },
          {
            path: '/member/management',
            name: 'member-management',
            component: () => import('@/views/member/memberManagement/MemberManagement'),
            meta: {
              title: '会员管理'
            }
          },
          {
            path: '/member/vip/setting',
            name: 'vip-setting',
            component: () => import('@/views/member/vipSetting/VipSetting'),
            meta: {
              title: 'Vip设置'
            }
          }
        ]
      },
      {
        path: '/machine',
        name: 'machine',
        redirect: '/machine/management',
        meta: {
          title: '设备中心',
          icon: 'tool'
        },
        component: RouteView,
        children: [
          {
            path: '/machine/management',
            name: 'machine-management',
            component: () => import('@/views/machine/machineManagement/MachineManagement'),
            meta: {
              title: '设备管理'
            }
          },
          {
            path: '/machine/inout',
            name: 'inout-management',
            component: () => import('@/views/machine/inoutPage/InoutListPage'),
            meta: {
              title: '进出记录'
            }
          }
        ]
      },
      {
        path: '/lottery',
        name: 'lottery',
        redirect: '/lottery/list',
        meta: {
          title: '抽奖',
          icon: 'euro'
        },
        component: RouteView,
        children: [
        {
          path: '/lottery/list',
          name: 'lottery-list',
          component: () => import('@/views/lottery/lotteryList/LotteryList'),
          meta: {
            title: '抽奖列表'
          }
        },
        {
          path: '/lottery/add',
          name: 'lottery-add',
          component: () => import('@/views/lottery/addLottery/AddLottery'),
          meta: {
            title: '添加抽奖'
          }
        },
        {
          path: '/lottery/management',
          name: 'lottery-management',
          component: () => import('@/views/lottery/lotteryManagement/LotteryManagement'),
          meta: {
            title: '抽奖管理'
          }
        }
        ]
      },
    ]
  },
  {
    path: '*', redirect: '/exception/404'
  }
]

/**
 * 店动态路由
 */

export {asyncShopSpringRouterMap ,asyncShopHotelRouterMap,asyncShopCateringRouterMap};

/**
 * 基础路由
 * @type { *[] }
 */
export {constantRouterMap};


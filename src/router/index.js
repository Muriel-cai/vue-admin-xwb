import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/monitoring',
    component: Layout,
    redirect: '/monitoringPage',
    name: 'Monitoring',
    meta: {
      title: '预警监控',
      icon: 's-marketing'
    },
    children: [{
      path: 'monitoringPage',
      name: 'MonitoringPage',
      component: () => import('@/views/monitoring/monitoringPage'),
      meta: {
        title: '预警监控'
      }
    }]
  },
  {
    path: '/underwriting',
    component: Layout,
    redirect: '/surveyIndex',
    name: 'Underwriting',
    meta: {
      title: '保前查勘',
      icon: 's-claim'
    },
    children: [{
      path: 'surveyIndex',
      name: 'SurveyIndex',
      component: () => import('@/views/underwriting/surveyIndex'),
      meta: {
        title: '查勘记录'
      }
    },
    {
      path: 'underwritingIndex',
      name: 'UnderwritingIndex',
      component: () => import('@/views/underwriting/underwritingIndex'),
      meta: {
        title: '核保'

      }
    },

    {
      path: 'maxCateIndex',
      name: 'MaxCateIndex',
      component: () => import('@/views/underwriting/maxCateIndex'),
      meta: {
        title: '行业配置'
      }
    },
    {
      path: 'minCateIndex',
      name: 'MinCateIndex',
      component: () => import('@/views/underwriting/minCateIndex'),
      meta: {
        title: '查勘项配置'
      }
    }
    ]
  },

  {
    path: '/policyAdmin',
    component: Layout,
    redirect: '/index',
    name: 'PolicyAdmin',
    meta: {
      title: '保单管理',
      icon: 's-order'
    },
    children: [{
      path: 'policyIndex',
      name: 'PolicyIndex',
      component: () => import('@/views/policyAdmin/policyIndex'),
      meta: {
        title: '保单管理'
      }
    }]
  },
  {
    path: '/equipmentManag',
    component: Layout,
    redirect: '/equipmentIndex',
    name: 'EquipmentManag',
    meta: {
      title: '场所管理',
      icon: 's-shop'
    },
    children: [{
      path: 'equipmentIndex',
      name: 'EquipmentIndex',
      component: () => import('@/views/equipmentManag/equipmentIndex'),
      meta: {
        title: '场所管理'
      }
    }]
  },
  {
    path: '/productManag',
    component: Layout,
    redirect: '/productManag',
    name: 'ProductManag',
    meta: {
      title: '产品管理',
      icon: 's-help'
    },
    children: [{
      path: 'productIndex',
      name: 'ProductIndex',
      component: () => import('@/views/productManag/productIndex'),
      meta: {
        title: '产品管理'
      }
    }]
  },
  {
    path: '/claims',
    component: Layout,
    redirect: '/claimsIndex',
    name: 'Claims',
    meta: {
      title: '理赔',
      icon: 's-check'
    },
    children: [{
      path: 'claimsIndex',
      name: 'ClaimsIndex',
      component: () => import('@/views/claims/claimsIndex'),
      meta: {
        title: '理赔'
      }
    }]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financialIndex',
    name: 'Financial',
    meta: {
      title: '财务',
      icon: 's-finance'
    },
    children: [{
      path: 'financialIndex',
      name: 'FinancialIndex',
      component: () => import('@/views/financial/financialIndex'),
      meta: {
        title: '财务'
      }
    }]
  },
  {
    path: '/basicData',
    component: Layout,
    redirect: '/insuranceTo',
    name: 'BasicData',
    meta: {
      title: '基础数据',
      icon: 's-grid'
    },
    children: [
      {
        path: 'structureBuild',
        name: 'StructureBuild',
        component: () => import('@/views/basicData/structureBuild'),
        meta: {
          title: '建筑结构'
        }
      },
      {
        path: 'enterpriseType',
        name: 'EnterpriseType',
        component: () => import('@/views/basicData/enterpriseType'),
        meta: {
          title: '企业类型'
        }
      },
      {
        path: 'industryList',
        name: 'IndustryList',
        component: () => import('@/views/basicData/industryList'),
        meta: {
          title: '行业列表'
        }
      },
      {
        path: 'underlyingProject',
        name: 'UnderlyingProject',
        component: () => import('@/views/basicData/underlyingProject'),
        meta: {
          title: '标的项目'
        }
      },
      {
        path: 'insuranceCompany',
        name: 'InsuranceCompany',
        component: () => import('@/views/basicData/insuranceCompany'),
        meta: {
          title: '保险公司管理'
        }
      }
    ]
  },
  {
    path: '/userManag',
    component: Layout,
    redirect: '/userManag',
    name: 'Managment',
    meta: {
      title: '系统管理',
      icon: 's-tools'
    },
    children: [{
      path: 'userManag',
      name: 'UserManag',
      component: () => import('@/views/management/userManag'),
      meta: {
        title: '用户管理'

      }
    },
    {
      path: 'resourceManag',
      name: 'ResourceManag',
      component: () => import('@/views/management/resourceManag'),
      meta: {
        title: '资源管理'
      }
    },
    {
      path: 'roleManag',
      name: 'RoleManag',
      component: () => import('@/views/management/roleManag'),
      meta: {
        title: '角色管理'
      }
    }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  {
    path: '/basicData',
    component: Layout,
    redirect: '/insuranceTo',
    name: 'BasicData',
    meta: {
      title: '基础数据',
      icon: 's-grid'
    },
    children: [
      {
        path: 'insuranceTo',
        name: 'InsuranceTo',
        component: () => import('@/views/basicData/insuranceTo'),
        meta: {
          title: '共保业务管理'
        }
      },
      {
        path: 'structureBuild',
        name: 'StructureBuild',
        component: () => import('@/views/basicData/structureBuild'),
        meta: {
          title: '建筑结构'
        }
      }
    ]
  },
  // 404 page页面必须放在最后 切记 （防止addRoutes动态添加路由 刷新页面跳转404路由）!!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

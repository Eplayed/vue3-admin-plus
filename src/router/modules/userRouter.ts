import Layout from '@/layout/index.vue'
const userList = [
  {
    path: '/user-management',
    redirect: '/user-management/role',
    name: 'UserManagement',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'UserManagement'
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/user-management/role.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: ''
        }
      },
      {
        path: 'user',
        component: () => import('@/views/user-management/user.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: ''
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/user-management/permission.vue'),
        name: 'Permission',
        meta: {
          title: '权限管理',
          icon: ''
        }
      }
      // {
      //   path: 'login-log',
      //   component: 'user-management/login-log',
      //   name: 'LoginLog',
      //   meta: {
      //     title: '登录日志',
      //     icon: ''
      //   }
      // }
    ]
  },
  {
    path: '/system-conf',
    redirect: '/system-conf/data-dictionary',
    name: 'SystemConf',
    component: Layout,
    alwaysShow: 1,
    meta: {
      title: '系统配置',
      icon: 'SystemConf'
    },
    children: [
      {
        path: 'data-dictionary',
        component: () => import('@/views/system-conf/data-dictionary.vue'),
        name: 'DataDictionary',
        meta: {
          title: '数据字典',
          icon: ''
        }
      },
      {
        path: 'template-management',
        component: () => import('@/views/system-conf/template-management.vue'),
        name: 'TemplateManagement',
        meta: {
          title: '模板管理',
          icon: ''
        }
      },
      {
        path: 'system-parameter',
        component: () => import('@/views/system-conf/system-parameter.vue'),
        name: 'SystemParameter',
        meta: {
          title: '系统参数',
          icon: ''
        }
      }
    ]
  }
]

export default userList

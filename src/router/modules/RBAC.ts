import Layout from '@/layout/index.vue'
const RBAC = {
  path: '/permission-center',
  component: Layout,
  meta: { title: 'RBAC', elSvgIcon: 'Fold' },
  alwaysShow: true,
  children: [
    {
      path: 'user-table-query',
      component: () => import('@/views/permission-center/user/UserTableQuery.vue'),
      name: 'UserTableQuery',
      meta: { title: '用户列表' }
    },
    {
      path: 'user-add-edit',
      component: () => import('@/views/permission-center/user/UserAddEdit.vue'),
      name: 'UserAddEdit',
      hidden: true,
      meta: { title: '用户列表-新增编辑', activeMenu: '/permission-center/user-table-query' }
    },
    {
      path: 'role-table-query',
      component: () => import('@/views/permission-center/role/RoleTableQuery.vue'),
      name: 'RoleTableQuery',
      meta: { title: '角色列表' }
    },
    {
      path: 'role-add-edit',
      component: () => import('@/views/permission-center/role/RoleAddEdit.vue'),
      name: 'RoleAddEdit',
      hidden: true,
      meta: { title: '角色列表-新增编辑', activeMenu: '/permission-center/role-table-query' }
    },
    {
      path: 'permission-table-query',
      component: () => import('@/views/permission-center/permission/PermissionTableQuery.vue'),
      name: 'PermissionTableQuery',
      meta: { title: '菜单权限' }
    },
    {
      path: 'permission-add-edit',
      component: () => import('@/views/permission-center/permission/PermissionAddEdit.vue'),
      name: 'PermissionAddEdit',
      hidden: true,
      meta: { title: '菜单权限-新增编辑', activeMenu: '/permission-center/permission-table-query' }
    },
    {
      path: 'plateForm-table-query',
      component: () => import('@/views/permission-center/plateForm/PlateFormTableQuery.vue'),
      name: 'PlateFormTableQuery',
      meta: { title: '平台列表' }
    },
    {
      path: 'plateForm-add-edit',
      component: () => import('@/views/permission-center/plateForm/PlateFormAddEdit.vue'),
      name: 'PlateFormAddEdit',
      hidden: true,
      meta: { title: '新增编辑', activeMenu: '/permission-center/plateForm-table-query' }
    }
  ]
}

export default RBAC

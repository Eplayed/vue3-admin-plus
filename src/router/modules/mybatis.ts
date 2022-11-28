import Layout from '@/layout/index.vue'
const mybatis = {
  path: '/mybatis-plus',
  component: Layout,
  redirect: '/mybatis-plus/index',
  meta: { title: 'mybatis-plus', elSvgIcon: 'Fold' },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      name: 'MybatisPlus',
      component: () => import('@/views/mybatis-plus'),
      meta: { title: '基础生成' }
    }
  ]
}

export default mybatis

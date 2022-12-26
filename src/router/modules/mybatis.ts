import Layout from '@/layout/index.vue'
const mybatis = {
  path: '/mybatis-plus',
  component: Layout,
  meta: { title: 'mybatis-plus', elSvgIcon: 'Fold' },
  alwaysShow: true,
  children: [
    {
      path: 'codeGenerator',
      name: 'MybatisPlus',
      component: () => import('@/views/mybatis-plus/CodeGenerator.vue'),
      meta: { title: '基础生成' }
    }
  ]
}

export default mybatis

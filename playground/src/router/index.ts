import { createRouter, createWebHashHistory } from 'vue-router'

export interface NavItem {
  name: string
  path: string
}

export interface NavCategory {
  key: string
  label: string
  accent: string
  items: NavItem[]
}

export const navConfig: NavCategory[] = [
  {
    key: 'advanced-antdv',
    label: 'Advanced Antdv',
    accent: '#818cf8',
    items: [
      { name: 'useTable', path: '/advanced-antdv/table' },
    ],
  },
  {
    key: 'core',
    label: 'Core',
    accent: '#4ade80',
    items: [
      { name: 'StorageManager', path: '/core/cache' },
    ],
  },
  {
    key: 'shared',
    label: 'Shared',
    accent: '#f472b6',
    items: [
      { name: 'Color Utils', path: '/shared/color' },
      { name: 'Tree Utils', path: '/shared/tree' },
      { name: 'Date Utils', path: '/shared/date' },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      redirect: '/advanced-antdv/table',
      children: [
        {
          path: 'advanced-antdv/table',
          component: () => import('@/views/advanced-antdv/TableDemo.vue'),
          meta: { title: 'useTable', category: 'advanced-antdv' },
        },
        {
          path: 'core/cache',
          component: () => import('@/views/core/CacheDemo.vue'),
          meta: { title: 'StorageManager', category: 'core' },
        },
        {
          path: 'shared/color',
          component: () => import('@/views/shared/ColorDemo.vue'),
          meta: { title: 'Color Utils', category: 'shared' },
        },
        {
          path: 'shared/tree',
          component: () => import('@/views/shared/TreeDemo.vue'),
          meta: { title: 'Tree Utils', category: 'shared' },
        },
        {
          path: 'shared/date',
          component: () => import('@/views/shared/DateDemo.vue'),
          meta: { title: 'Date Utils', category: 'shared' },
        },
      ],
    },
  ],
})

export default router

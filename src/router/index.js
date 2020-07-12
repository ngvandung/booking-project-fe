// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash }
        if (savedPosition) return savedPosition

        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/common/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('@/views/common/Index.vue')
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: () => import('@/views/common/Login.vue')
                },
                {
                    path: '/search',
                    name: 'Search',
                    component: () => import('@/views/common/Search.vue')
                },
                {
                    path: '/home/:homeId',
                    name: 'CommonHome',
                    component: () => import('@/views/common/Home.vue')
                },
                {
                    path: '/vnpay/response',
                    name: 'VnPayResponse',
                    component: () => import('@/views/common/VnPayResponse.vue')
                },
                {
                    path: '/home/payment',
                    name: 'PaymentView',
                    props: true,
                    component: () => import('@/views/common/Payment.vue')
                },
                {
                    path: '/hotelhome',
                    name: 'HotelHome',
                    component: () => import('@/views/common/HotelHome.vue')
                }
            ]
        },
        {
            path: '/me',
            component: () => import('@/layouts/user/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'Me',
                    redirect: '/me/bookings',
                    component: () => import('@/views/user/Index.vue'),
                    children: [
                        {
                            path: '/me/bookings',
                            name: 'MyBookings',
                            component: () => import('@/views/user/MyBookings.vue')
                        },
                        {
                            path: '/me/edit-account/profile',
                            name: 'UserProfile',
                            props: true,
                            component: () => import('@/components/Profile.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/host',
            component: () => import('@/layouts/host/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'Host',
                    redirect: '/host/dashboard',
                    component: () => import('@/views/host/Index.vue'),
                    children: [
                        {
                            path: '/host/dashboard',
                            name: 'DashboardHost',
                            component: () => import('@/views/host/Dashboard.vue')
                        },
                        {
                            path: '/host/homes',
                            name: 'ListHomeHost',
                            component: () => import('@/views/host/ListHome.vue')
                        },
                        {
                            path: '/host/home/',
                            name: 'HostHome',
                            component: () => import('@/views/host/Home.vue')
                        },
                        {
                            path: '/host/home/:homeId',
                            name: 'HostHomeDetail',
                            component: () => import('@/views/host/Home.vue')
                        },
                        {
                            path: '/host/edit-account/profile',
                            name: 'HostProfile',
                            component: () => import('@/components/Profile.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/error/403',
            name: 'PermissionDenied',
            component: () => import('@/views/error/PermissionDenied.vue')
        },
        {
            path: '/manager',
            component: () => import('@/layouts/manager/Index.vue'),
            children: [
                {
                    path: '',
                    redirect: '/manager/dashboard',
                    component: () => import('@/views/manager/Index.vue'),
                    children: [
                        {
                            path: '/manager/dashboard',
                            name: 'ManagerDashboard',
                            component: () => import('@/views/manager/Dashboard.vue')
                        },
                        {
                            path: '/manager/homes',
                            name: 'ListHomeManager',
                            component: () => import('@/views/manager/ListHome.vue')
                        },
                        {
                            path: '/manager/hosts',
                            name: 'ListHostManager',
                            component: () => import('@/views/manager/ListHost.vue')
                        },
                        {
                            path: '/manager/edit-account/profile',
                            name: 'ManagerProfile',
                            component: () => import('@/components/Profile.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/admin',
            component: () => import('@/layouts/admin/Index.vue'),
            children: [
                {
                    path: '',
                    redirect: '/admin/dashboard',
                    component: () => import('@/views/admin/Index.vue'),
                    children: [
                        {
                            path: '/admin/dashboard',
                            name: 'AdminDashboard',
                            component: () => import('@/views/admin/Dashboard.vue')
                        },
                        {
                            path: '/admin/users',
                            name: 'ListUser',
                            component: () => import('@/views/admin/ListUser.vue')
                        },
                        {
                            path: '/admin/indexing',
                            name: 'Indexing',
                            component: () => import('@/views/admin/Indexing.vue')
                        }
                    ]
                }
            ]
        }
    ],
})

export default router

// Imports
import Vue from 'vue'
import Router from 'vue-router'
import LayCoIndex from "@/layouts/common/Index.vue";
import ViCoIndex from "@/views/common/Index.vue";
import ViCoLogin from "@/views/common/Login.vue";
import ViCoSearch from "@/views/common/Search.vue";
import ViCoHome from "@/views/common/Home.vue";
import ViCoVnPayRes from "@/views/common/VnPayResponse.vue";
import ViCoPayment from "@/views/common/Payment.vue";
import ViCoHotelHome from "@/views/common/HotelHome.vue";
import LayUIndex from "@/layouts/user/Index.vue";
import ViUIndex from "@/views/user/Index.vue";
import ViUBookings from "@/views/user/MyBookings.vue";
import CompProfile from "@/components/Profile.vue";
import LayHostIndex from "@/layouts/host/Index.vue";
import ViHostIndex from "@/views/host/Index.vue";
import ViHostDashboard from "@/views/host/Dashboard.vue";
import ViHostListHome from "@/views/host/ListHome.vue";
import ViHostHome from "@/views/host/Home.vue";
//import ViErPer from "@/views/error/PermissionDenied.vue";
import LayManIndex from "@/layouts/manager/Index.vue";
import ViManIndex from "@/views/manager/Index.vue";
import ViManDashboard from "@/views/manager/Dashboard.vue";
import ViManListHome from "@/views/manager/ListHome.vue";
import ViManListHost from "@/views/manager/ListHost.vue";
import LayAdIndex from "@/layouts/admin/Index.vue";
import ViAdIndex from "@/views/admin/Index.vue";
import ViAdDashboard from "@/views/admin/Dashboard.vue";
import ViAdListUser from "@/views/admin/ListUser.vue";
import ViAdIndexing from "@/views/admin/Indexing.vue";
import ViHostDetailBookings from "@/views/host/DetailBookings.vue";

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash }
        if (savedPosition) return savedPosition

        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            component: LayCoIndex,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: ViCoIndex
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: ViCoLogin
                },
                {
                    path: '/search',
                    name: 'Search',
                    component: ViCoSearch
                },
                {
                    path: '/home/:homeId',
                    name: 'CommonHome',
                    component: ViCoHome
                },
                {
                    path: '/vnpay/response',
                    name: 'VnPayResponse',
                    component: ViCoVnPayRes
                },
                {
                    path: '/home/payment',
                    name: 'PaymentView',
                    props: true,
                    component: ViCoPayment
                },
                {
                    path: '/hotelhome',
                    name: 'HotelHome',
                    component: ViCoHotelHome
                }
            ]
        },
        {
            path: '/me',
            component: LayUIndex,
            children: [
                {
                    path: '',
                    name: 'Me',
                    redirect: '/me/bookings',
                    component: ViUIndex,
                    children: [
                        {
                            path: '/me/bookings',
                            name: 'MyBookings',
                            component: ViUBookings
                        },
                        {
                            path: '/me/edit-account/profile',
                            name: 'UserProfile',
                            props: true,
                            component: CompProfile
                        }
                    ]
                }
            ]
        },
        {
            path: '/host',
            component: LayHostIndex,
            children: [
                {
                    path: '',
                    name: 'Host',
                    redirect: '/host/dashboard',
                    component: ViHostIndex,
                    children: [
                        {
                            path: '/host/dashboard',
                            name: 'DashboardHost',
                            component: ViHostDashboard
                        },
                        {
                            path: '/host/homes',
                            name: 'ListHomeHost',
                            component: ViHostListHome
                        },
                        {
                            path: '/host/home/',
                            name: 'HostHome',
                            component: ViHostHome
                        },
                        {
                            path: '/host/home/:homeId',
                            name: 'HostHomeDetail',
                            component: ViHostHome
                        },
                        {
                            path: '/host/edit-account/profile',
                            name: 'HostProfile',
                            component: CompProfile
                        },
                        {
                            path: '/host/detail/bookings',
                            name: 'DetailBookings',
                            component: ViHostDetailBookings
                        }
                    ]
                }
            ]
        },
        // {
        //     path: '/error/403',
        //     name: 'PermissionDenied',
        //     component: ViErPer
        // },
        {
            path: '/manager',
            component: LayManIndex,
            children: [
                {
                    path: '',
                    redirect: '/manager/dashboard',
                    component: ViManIndex,
                    children: [
                        {
                            path: '/manager/dashboard',
                            name: 'ManagerDashboard',
                            component: ViManDashboard
                        },
                        {
                            path: '/manager/homes',
                            name: 'ListHomeManager',
                            component: ViManListHome
                        },
                        {
                            path: '/manager/hosts',
                            name: 'ListHostManager',
                            component: ViManListHost
                        },
                        {
                            path: '/manager/edit-account/profile',
                            name: 'ManagerProfile',
                            component: CompProfile
                        }
                    ]
                }
            ]
        },
        {
            path: '/admin',
            component: LayAdIndex,
            children: [
                {
                    path: '',
                    redirect: '/admin/dashboard',
                    component: ViAdIndex,
                    children: [
                        {
                            path: '/admin/dashboard',
                            name: 'AdminDashboard',
                            component: ViAdDashboard
                        },
                        {
                            path: '/admin/users',
                            name: 'ListUser',
                            component: ViAdListUser
                        },
                        {
                            path: '/admin/indexing',
                            name: 'Indexing',
                            component: ViAdIndexing
                        }
                    ]
                }
            ]
        }
    ]
})

export default router

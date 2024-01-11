import { createRouter, createWebHistory } from "vue-router";
import FriendList from "@/components/FriendList.vue";
import LoginUser from "@/components/LoginUser.vue";
import AboutPage from "@/components/AboutPage.vue";
import DashboardPage from "@/components/DashboardPage.vue";

const routes = [
  {
    name: 'FriendList',
    component: FriendList,
    path: '/friends',
    meta: { requiresAuth: true },
  },
  {
    name: 'AboutPage',
    component: AboutPage,
    path: '/about',
    meta: { requiresAuth: true },
  },
  {
    name: 'DashboardPage',
    component: DashboardPage,
    path: '/dashboard',
    meta: { requiresAuth: true },
  },
  {
    name: 'LoginUser',
    component: LoginUser,
    path: '/',
    meta: { requiresGuest: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('auth-token');

  if (to.meta.requiresAuth && !authToken) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next('/');
  } if (to.path === '/' && authToken) {
    // If trying to access the login page and the user is authenticated, redirect to another page (e.g., '/friends')
    next('/dashboard');
  } else {
    // Route does not require authentication or guest status, proceed
    next();
  }
});


export default router;

const Login = () => import("pages/login/Login")
const ForgetPwd = () => import("pages/forgetPwd/ForgetPwd")
const Register = () => import("pages/register/Register")
const Main = () => import("layouts/MainLayout")
const AssetProfile = () => import("pages/assetProfile/AssetProfile")
const AssetsList = () => import("pages/assetManager/assetList/AssetList")
const Warehousing = () => import("pages/assetManager/assetWarehousing/Warehousing")
const AssetUseHistory = () => import("pages/assetManager/assetUseHietory/AssetUseHistory")
const Profile = () => import("pages/profile/Profile")
const Warehouse = () => import("pages/warehouse/Warehouse")

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/forget-password',
    component: ForgetPwd
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/main',
    component: Main,
    redirect: '/main/asset-profile',
    children: [
      {
        path: 'asset-profile',
        component: AssetProfile
      },
      {
        path: 'asset-list',
        component: AssetsList
      },
      {
        path: 'asset-warehousing',
        component: Warehousing
      },
      {
        path: 'asset-use-history',
        component: AssetUseHistory
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'warehouse',
        component: Warehouse
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

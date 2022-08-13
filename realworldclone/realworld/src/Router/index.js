import Login from "../Account/Login"
import Signup from "../Account/Signup"
import Home from "../Pages/Home"
import Editor from "../Pages/Editor"
import Profiles from "../Pages/Profiles"
import Settings from "../Pages/Settings"
import ArticleDetail from "../Pages/ArticalDetail"

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Signup },
    { path: `/@:username`, component: Profiles },
    { path: `/articles/:slug`, component: ArticleDetail },
]

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/editor/:slug', component: Editor },
    { path: '/settings', component: Settings },
    { path: `/@:username`, component: Profiles },
    { path: `/articles/:slug`, component: ArticleDetail },
]

export { publicRoutes, privateRoutes }
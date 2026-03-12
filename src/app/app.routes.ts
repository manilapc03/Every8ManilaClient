import { Routes } from '@angular/router';
import { authGuard } from './services/Auth/auth-guard';
import { LoginPageComponent } from './pages/Login/login-page.component/login-page.component';
import { HomePage } from './pages/home-page/home-page';
import { NAccessCountList } from './pages/N-AccessCount/n-accesscount-list/n-accesscount-list';
import { NShopList } from './pages/N-Shop/n-shop-list/n-shop-list';
import { NUserList } from './pages/N-User/n-user-list/n-user-list';
import { NUsersBlockShopList } from './pages/N-User/n-usersblockshop-list/n-usersblockshop-list';
import { SharedNavbarComponent } from './pages/shared-pages/shared-navbar';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

    // 
    // {
    //     path:"",component:List
    // },


    {
        path: '',
        component: SharedNavbarComponent, // The parent layout with the sidebar
        children: [
            {
                path: 'home',
                component: HomePage,
                canActivate: [authGuard]
            },
            {
                path: 'userlist',
                component: NUserList,
            },
            {
                path: 'accesscountlist',
                component: NAccessCountList
                //canActivate: [authGuard]  
            },
            {
                path: 'shopList',
                component: NShopList
                //canActivate: [authGuard] 
            },
            {
                path: 'usersblockshoplist',
                component: NUsersBlockShopList,
                //canActivate: [authGuard] 
            },
            // Add your other pages here
        ]
    }

    // {
    //     path: 'home',
    //     component: HomePage,
    //     canActivate: [authGuard]
    // },
    // {
    //     path: 'accesscountlist',
    //     component: NAccessCountList,
    //     //canActivate: [authGuard] 
    // },
    // {
    //     path: 'shopList',
    //     component: NShopList,
    //     //canActivate: [authGuard] 
    // },
    // {
    //     path: 'userlist',
    //     component: NUserList,
    //     //canActivate: [authGuard] 
    // },
    // {
    //     path: 'usersblockshoplist',
    //     component: NUsersBlockShopList,
    //     //canActivate: [authGuard] 
    // },

    //4,{ path: '**', component: Notfound }
];

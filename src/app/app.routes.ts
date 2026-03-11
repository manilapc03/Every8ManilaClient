import { Routes } from '@angular/router';
import { authGuard } from './services/Auth/auth-guard';

// import { Add } from './employee/add/add';
// import { List } from './employee/list/list';

import { LoginPageComponent } from './pages/Login/login-page.component/login-page.component';
import { HomePage } from './pages/home-page/home-page';
import { NUserList } from './pages/N-User/n-user-list/n-user-list';
import { NAccessCountList } from './pages/N-AccessCount/n-accesscount-list/n-accesscount-list';


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
        path: 'home',
        component: HomePage,
        canActivate: [authGuard]
    },
    {
        path: 'userlist',
        component: NUserList,
        //canActivate: [authGuard] 
    },
    {
        path: 'accesscountlist',
        component: NAccessCountList,
        //canActivate: [authGuard] 
    },

    // 

    // {
    //     path: 'addemployee', component: Add
    // },
    // {
    //     path: 'employee', component: List
    // },
    // {
    //     path: 'editemployee/:id', component: Add
    // }


    //4,{ path: '**', component: Notfound }
];

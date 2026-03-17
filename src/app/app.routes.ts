import { Routes } from '@angular/router';
import { authGuard } from './services/Auth/auth-guard';
import { LoginPageComponent } from './pages/Login/login-page.component/login-page.component';
//import { HomePage } from './pages/home-page/home-page';
//import { NAccessCountList } from './pages/N-AccessCount/n-accesscount-list/n-accesscount-list';
//import { NShopList } from './pages/N-Shop/n-shop-list/n-shop-list';
//import { NUserList } from './pages/N-User/n-user-list/n-user-list';
//import { NUsersBlockShopList } from './pages/N-User/n-usersblockshop-list/n-usersblockshop-list';
import { SharedNavbarComponent } from './pages/shared-pages/shared-navbar';




export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    // The parent layout with the sidebar        
    path: '',
    component: SharedNavbarComponent,
    children: [
      // lazy loading
      {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(x => x.HomePage),
        canActivate: [authGuard]
      },
      {
        path: 'userlist',
        loadComponent: () => import('./pages/N-User/n-user-list/n-user-list').then(x => x.NUserList),
        canActivate: [authGuard]
      },
      {
        path: 'accesscountlist',
        loadComponent: () => import('./pages/N-AccessCount/n-accesscount-list/n-accesscount-list').then(x => x.NAccessCountList),
        canActivate: [authGuard]
      },
      {
        path: 'shopList',
        loadComponent: () => import('./pages/N-Shop/n-shop-list/n-shop-list').then(x => x.NShopList),
        canActivate: [authGuard]
      },
      {
        path: 'shopBackList',
        loadComponent: () => import('./pages/N-Shop/n-shopback-list/n-shopback-list').then(x => x.NShopBackList),
        canActivate: [authGuard]
      },
      {
        path: 'shopBackUpFlgList',
        loadComponent: () => import('./pages/N-Shop/n-shopbackupflg-list/n-shopbackupflg-list').then(x => x.NShopBackUpFlgList),
        canActivate: [authGuard]
      },
      {
        path: 'shopTainyuuIdentificationShopList',
        loadComponent: () => import('./pages/N-Shop/n-shoptainyuuidentificationshop-list/n-shoptainyuuidentificationshop-list').then(x => x.NShopTainyuuIdentificationShopList),
        canActivate: [authGuard]
      },
      {
        path: 'usersblockshoplist',
        loadComponent: () => import('./pages/N-User/n-usersblockshop-list/n-usersblockshop-list').then(x => x.NUsersBlockShopList),
        canActivate: [authGuard]
      },
      {
        path: 'usersfavoriteshoplist',
        loadComponent: () => import('./pages/N-User/n-usersfavoriteshop-list/n-usersfavoriteshop-list').then(x => x.NUsersFavoriteShopList),
        canActivate: [authGuard]
      },
      {
        path: 'usershopearealist',
        loadComponent: () => import('./pages/N-User/n-usershopearea-list/n-usershopearea-list').then(x => x.NUsersHopeAreaList),
        canActivate: [authGuard]
      },
      {
        path: 'usersjobproflist',
        loadComponent: () => import('./pages/N-User/n-usersjobprof-list/n-usersjobprof-list').then(x => x.NUsersJobProfList),
        canActivate: [authGuard]
      },
      {
        path: 'usersloglist',
        loadComponent: () => import('./pages/N-User/n-userslog-list/n-userslog-list').then(x => x.NUsersLogList),
        canActivate: [authGuard]
      },
      // Add your other pages here


    ]   // children     
  }

  //4,{ path: '**', component: Notfound }
];

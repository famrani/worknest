import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutguestComponent } from './layout/layoutguest/layoutguest.component';
import { LayouthostComponent } from './layout/layouthost/layouthost.component';
import { LayoutnoneComponent } from './layout/layoutnone/layoutnone.component';
import { Page404Component } from './page404/page404.component';
import { externalUrlProvider } from './services/services.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutguestComponent,
    children: [
      { path: '', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule) }
    ]
  },
  {
    path: '',
    component: LayouthostComponent,
    children: [
      { 
        path: '',
        loadChildren: () => import('./host/host.module').then(x => x.HostModule)
      },
    ]
  },
  {
    path: '',
    component: LayoutnoneComponent,
    children: [
      { 
        path: '',
        loadChildren: () => import('./login/login.module').then(x => x.LoginModule)
      },
    ]
  },
  { path: 'externalRedirect', resolve: { url: externalUrlProvider, }, component: LayoutguestComponent, },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload', })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AdminGuard } from './services/admin.guard';
import { FourofourComponent } from './fourofour/fourofour.component';

const routes: Routes = [
  {
    path: 'salon',
    redirectTo: 'salon/home',
    pathMatch: 'full',
  },
  {
    path: 'salon',
    loadChildren: () =>
      import('./salon/salon.module').then((m) => m.SalonModule),
  },
  {
    path: 'admin',
    redirectTo: '/admin/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/salon/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
  { path: 'not-found', component: FourofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

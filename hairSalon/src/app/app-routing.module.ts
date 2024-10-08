import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    redirectTo: 'admin/info',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    redirectTo: 'salon/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

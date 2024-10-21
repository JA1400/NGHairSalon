import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { InfoComponent } from './components/info/info.component';
import { InquiriesComponent } from './components/inquiries/inquiries.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'inquiries',
        component: InquiriesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

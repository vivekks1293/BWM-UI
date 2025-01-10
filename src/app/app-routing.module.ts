import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timetable', loadChildren: () => import('./Feature/time-table/time-table.module').then(m => m.TimeTableModule) } // Directly include the route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

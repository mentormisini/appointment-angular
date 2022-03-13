import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { OraretComponent } from './oraret/oraret.component';
import { ResetPasswordComponent } from './board-user/reset-password/reset-password.component';
import { ProfileComponent } from './board-user/profile/profile.component';
import { MyHistoryComponent } from './board-user/my-history/my-history.component';
import { MyAppointmentComponent } from './board-user/my-appointment/my-appointment.component';
import { GuardAuthGuard } from './_guard/guard-auth.guard';
import {UnSavedGuard} from './_guard/un-saved.guard';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'terminet', component: ListAppointmentsComponent},
  { path:'register-user',component:RegisterUserComponent, canDeactivate: [UnSavedGuard]},
  { path:'forgotpassword',component:ForgotpasswordComponent},
  { path:'oraret',component:OraretComponent},

  //nastedRoutes Parent Component
      { path:'board-user',component:BoardUserComponent, canActivate: [GuardAuthGuard],
  //Children Components
      children: [
      { path:'reset-password',component:ResetPasswordComponent},
      { path:'profile',component:ProfileComponent},
      { path:'my-history',component:MyHistoryComponent},
      { path:'my-appointment',component:MyAppointmentComponent},
      { path:'', redirectTo:'profile',pathMatch: 'full'}
      ]},

  { path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


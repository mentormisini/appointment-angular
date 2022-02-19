import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {OraretComponent} from './oraret/oraret.component';
import {ResetPasswordComponent} from './board-user/reset-password/reset-password.component';
import {ProfileComponent} from './board-user/profile/profile.component';


const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'terminet', component: ListAppointmentsComponent},
  { path:'welcome/:name', component: WelcomeComponent},
  { path:'welcome', component: WelcomeComponent},
  { path:'register-user',component:RegisterUserComponent},
  { path:'forgotpassword',component:ForgotpasswordComponent},
  { path:'board-user',component:BoardUserComponent},
  { path:'oraret',component:OraretComponent},
  { path:'board-user/reset-password',component:ResetPasswordComponent},
  { path:'profile',component:ProfileComponent},
  { path:'**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


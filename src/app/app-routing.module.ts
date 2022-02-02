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
<<<<<<< Updated upstream
import { ProfileComponent } from './profile/profile.component';
=======
>>>>>>> Stashed changes


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'terminet', component: ListAppointmentsComponent},
  { path:'welcome/:name', component: WelcomeComponent},
  { path:'welcome', component: WelcomeComponent},
  { path:'register-user',component:RegisterUserComponent},
  { path:'forgotpassword',component:ForgotpasswordComponent},
<<<<<<< Updated upstream
   {path :'profile',component:ProfileComponent},
=======
>>>>>>> Stashed changes
  { path:'**', component: ErrorComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

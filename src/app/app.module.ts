import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { OraretComponent } from './oraret/oraret.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ResetPasswordComponent} from './board-user/reset-password/reset-password.component';
import { ProfileComponent} from './board-user/profile/profile.component';
import { MyHistoryComponent} from './board-user/my-history/my-history.component';
import { MyAppointmentComponent} from './board-user/my-appointment/my-appointment.component';
import { InterceptorService} from './_services/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    NavbarComponent,
    FooterComponent,
    ListAppointmentsComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    RegisterUserComponent,
    OraretComponent,
    ForgotpasswordComponent,
    OraretComponent,
    ResetPasswordComponent,
    ProfileComponent,
    MyHistoryComponent,
    MyAppointmentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()








  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}, authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }

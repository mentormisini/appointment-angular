import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { PreloaderService } from '../_services/preloader.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  durationInSeconds = 5;
  hideElement = true;
  user: string;
  @ViewChild('userRef')userElement: ElementRef;
  constructor(
      private authService: AuthService,
      private tokenStorage: TokenStorageService,
      private router: Router,
      private preload: PreloaderService,
      private toastr: ToastrService) {
      }
  ngAfterViewInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.userElement.nativeElement.focus();
  }
  showError() {
    this.toastr.error(
      'Useri ose Fjalekalimi Gabim!',
      'Ndodhi nje Gabim',
      {timeOut: 5000,
        closeButton: true,
        positionClass: 'toast-bottom-center'
      });
    this.form.password = '';
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.preload.showSpinner();
        this.handleLogin();
      },
      err => {
        this.showError();
        this.isLoginFailed = true;
      }
    );
  }
  handleLogin() {
    this.router.navigate(['board-user']);
  }
}

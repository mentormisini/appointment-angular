import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
      private toastr: ToastrService,
      private preload: PreloaderService) {
      }

  ngAfterViewInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.userElement.nativeElement.focus();
  }
  handleClear() {
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
        this.errorMessage = err.error.errorMessage;
        this.toastr.error(this.errorMessage, 'Error',{
          closeButton: true,
          positionClass: 'toast-bottom-right',
          timeOut: 5000
        });
        this.isLoginFailed = true;
      }
    );
  }

  handleLogin() {
    this.router.navigate(['board-user']);
  }
}

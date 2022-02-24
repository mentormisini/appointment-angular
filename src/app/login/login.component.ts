import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormControlName,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  durationInSeconds=5;
  hideElement=true;
  username = '';
  password='';

  constructor(
      private authService: AuthService,
      private tokenStorage: TokenStorageService,
      private router: Router,
      private _snackBar: MatSnackBar)
      { }

       openSnackBar() {
        this._snackBar.open('Useri ose Fjalekalimi jo ne rregull','X', {
          duration: this.durationInSeconds * 1000
        });
        this.handleClear();
      }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;

    }
  }
  handleClear(){
    this.form.username='';
    this.form.password='';
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.handleLogin();
      },
      err => {
        this.openSnackBar();
        this.isLoginFailed = true;
      }
    );
  }

  handleLogin(){
    this.router.navigate(['board-user']);
  }


}

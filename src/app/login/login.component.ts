import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormControlName,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  startyping: string;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  saveNewField(startyping) {
    console.log("typed Text", startyping);
  }
  
  username = '';
  password='';
  loginForm = new FormGroup({
    username: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required)

  })
  

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router ) { }
  


  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    
  }

  
  handleClear(){
    this.form.username=null;
    this.form.password=null;
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
        this.handleLogin();
      },
      err => {
        this.errorMessage = "Useri ose Fjalekalimi inkorrekt";
        this.isLoginFailed = true;
        
        
        
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  handleLogin(){
    this.router.navigate(['welcome', this.username]);
  }
}

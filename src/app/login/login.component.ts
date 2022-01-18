import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormControlName,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  startyping: string;

  saveNewField(startyping) {
    console.log("typed Text", startyping);
  }

  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,Validators.required)

  })
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  
  username = '';


  constructor(private router: Router) { }

  ngOnInit(): void {
 
  }

  handleLogin(){
    this.router.navigate(['welcome', this.username]);
  }

}

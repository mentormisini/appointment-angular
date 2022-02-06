import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  numri='04';
  kohapritjes=5;
  startDate = new Date(1990, 0, 1);
  constructor(private authService: AuthService,
     private router: Router,
     private _snackBar:MatSnackBar) { }

     openSnackBar() {
      this._snackBar.open('Ju u regjistruat me sukses, Logohuni','X', {
        duration: this.kohapritjes * 1000,
      });
     }
  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.handleRegistration();
        this.openSnackBar();
        
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  //qekjo e ban si metod numrin 04, e me thirr ndiv pa click
  setNumber(numri){
    numri.value;
  }

  // e bllokon per karaktere veq numra lejon
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  ngOnInit(): void {
  }

  handleRegistration(){
    this.router.navigate(['login'])
  
  }

}

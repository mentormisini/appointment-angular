import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
=======
import { AuthService } from '../_services/auth.service';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  kohapritjes=7;
  constructor(private authService: AuthService,
     private router: Router,
     private _snackBar:MatSnackBar) { }

     openSnackBar() {
      this._snackBar.open('Ju u regjistruat me sukses, Logohuni','X', {
        duration: this.kohapritjes * 1000,
      });
     }
=======
  constructor(private authService: AuthService) { }

 
>>>>>>> Stashed changes
  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
<<<<<<< Updated upstream
        this.handleRegistration();
        this.openSnackBar();
        
        
=======
>>>>>>> Stashed changes
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

<<<<<<< Updated upstream
  //qekjo e ban si metod numrin 04, e me thirr ndiv pa click
=======
>>>>>>> Stashed changes
  setNumber(numri){
    numri.value;
  }

<<<<<<< Updated upstream
  // e bllokon per karaktere veq numra lejon
=======
>>>>>>> Stashed changes
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

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
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
  constructor(private authService: AuthService) { }

 
  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  setNumber(numri){
    numri.value;
  }

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

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService} from 'ngx-toastr';
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
  hideElement=true;
  startDate = new Date(1990, 0, 1);

  constructor(private authService: AuthService,
     private router: Router,
     private _snackBar:MatSnackBar,
     private toastr:ToastrService) { }


  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccess()
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  // qekjo e ban si metod numrin 04, e me thirr ndiv pa click
  setNumber(numri) {
    // tslint:disable-next-line:no-unused-expression
    numri.value;
  }

  // e bllokon per karaktere veq numra lejon
  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  ngOnInit(): void {
  }

  handleRegistration(){
    this.router.navigate(['login'])

  }
  showSuccess() {
    this.toastr.success('Ju mund te logoheni tani','Regjistrimi u be me sukses',{timeOut:5000,progressBar:true,progressAnimation:'decreasing',closeButton:true,positionClass:'toast-bottom-center'});
    this.handleRegistration();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PreventChanges} from '../_guard/un-saved.guard';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit, PreventChanges {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: string;
  numri = '04';
  hideElement = true;
  emrip = new FormControl();
  startDate = new Date(1990, 0, 1);

      canLeave(): boolean {
      if (this.emrip.dirty) {
      return window.confirm('Ka gjera te pa ruajtura');
      }
      return true;
      }

  constructor(private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private toastr: ToastrService) { }
  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.showSuccess();
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  ngOnInit(): void {

  }
  numericOnly(event): boolean {
    const patt = /^([0-9])$/;
    const result = patt.test(event.key);
    return result;
  }
  showSuccess() {
    this.toastr.success('Ju mund te logoheni tani',
      'Regjistrimi u be me sukses',
      {timeOut: 5000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        positionClass: 'toast-bottom-center'});
    this.router.navigate(['login']);
  }

}

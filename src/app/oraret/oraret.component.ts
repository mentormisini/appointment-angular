import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OraretService } from '../_services/oraret.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { map} from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-oraret',
  templateUrl: './oraret.component.html',
  styleUrls: ['./oraret.component.css']
})
export class OraretComponent implements OnInit {
  toppings = new FormControl();
  selected:Date;
  oraret: string[] = [];
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  thirdFormGroup:FormGroup;
  selektori:any;
  emri:string;
  kohapritjes=6;
  isSuccessful = false;
  isFailed = false;
  errorMessage:string;
  form: any = {};

  
  constructor(private oraretService: OraretService,
     private _formBuilder:FormBuilder,
     public datepipe: DatePipe,
     private _snackBar:MatSnackBar,
     private authService: AuthService) {}
     openSnackBar() {
      this._snackBar.open('Zgjedheni Daten pastaj oren','X', {
        duration: this.kohapritjes * 1000,
      });
    }
  
    ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      sherbimiZgjedhur : [Validators.required],
      puntoriZgjedhur : [Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      orarizgjedhur: ['', Validators.required],
     // dataZgjedhur: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      emri: ['', Validators.required],
      mbiemri: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      numri: ['', Validators.required, Validators.pattern('[- +()0-9]+')
    ]
    
    });
  
    // this.oraretService.getOraret().subscribe(
    //   response => this.oraret = response.oraret);
  }
  onClickDate(){
    this.oraret = [];
    console.log(this.datepipe.transform(this.selected,'yyyy-MM-dd'));
    this.getOraret(this.selected);
  }


  getOraret(selectedDate: Date){
    let latest_date =this.datepipe.transform(this.selected, 'yyyy-MM-dd');
    this.oraretService.getOraret(latest_date).subscribe(
      respon => this.shfaqeOraret(respon));
  }

  shfaqeOraret(response){
    //console.log(response)
    response.forEach(element => {
       this.oraret.push(element[0])
    });
   // this.oraret = response;
    console.log(response);
  }

  onSubmit() {
    this.authService.regjistroTerminet(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
        
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }



}

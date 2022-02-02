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
import { collectExternalReferences } from '@angular/compiler';
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
  paraqitMsg:string;
  
  constructor(private oraretService: OraretService,
     private _formBuilder:FormBuilder,
     public datepipe: DatePipe,
     private _snackBar:MatSnackBar) {}
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

  submit(){
    this.oraretService.postTermin(this.firstFormGroup.value, this.thirdFormGroup.value, this.secondFormGroup.value).subscribe(
      data => {console.log("weeeeeeeeeeeeeeeeee");
      }
    );
    console.log("submit form");
    console.log("oraaaaa" + this.secondFormGroup.value)
    console.log(this.firstFormGroup.getRawValue);
    console.log(this.secondFormGroup.value);
    console.log("emriiiii" + this.thirdFormGroup.value);
}
}

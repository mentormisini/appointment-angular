import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OraretService } from '../_services/oraret.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { map} from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common'

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
  
  constructor(private oraretService: OraretService, private _formBuilder:FormBuilder,
     public datepipe: DatePipe) {}

  
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdtCtrl: [Validators.required],
    });
  
    // this.oraretService.getOraret().subscribe(
    //   response => this.oraret = response.oraret);
  }
  onClickDate(){
    console.log("dataa" + this.selected);
    this.getOraret(this.selected);
  }

  getOraret(selectedDate: Date){
    let latest_date =this.datepipe.transform(this.selected, 'yyyy-MM-dd');
    console.log("latesssssssst" + latest_date);
    this.oraretService.getOraret(latest_date).subscribe(
      respon => this.shfaqeOraret(respon));
  
  }

  shfaqeOraret(response){
    this.oraret = response;
  
    console.log(response);
  }


  
}

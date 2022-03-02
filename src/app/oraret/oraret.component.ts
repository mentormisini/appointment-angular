import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OraretService } from '../_services/OraretServices/oraret.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { map} from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {SherbimetService} from '../_services/OraretServices/sherbimet.service';
import {element} from 'protractor';
import {PunetoretService} from '../_services/OraretServices/punetoret.service';
import {DergoRezerviminService} from '../_services/OraretServices/dergo-rezervimin.service';
import {PreloaderService} from '../_services/preloader.service';
import validate = WebAssembly.validate;




@Component({
  selector: 'app-oraret',
  templateUrl: './oraret.component.html',
  styleUrls: ['./oraret.component.css']
})
export class OraretComponent implements OnInit {
  toppings = new FormControl();
  dataZgjedhur:Date;
  oraret:string[]=[];
  sherbimi:string[]=[];
  punetori:string[]=[];
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  thirdFormGroup:FormGroup;
  selektori:any;
  sherbimiZgj:any;
  puntoriZgj:any;
  emri:string;
  kohapritjes=6;
  isSuccessful = false;
  isFailed = false;
  errorMessage:string;
  typeSelected:string;
  realizimiTerminit='';
  deshtimiTerminit='';
  realizmiKorrekt = false;
  realizimiFatal = false;
  showOraret=true;


  constructor(private oraretService: OraretService,
     private sherbimetService:SherbimetService,
     private punetoretService:PunetoretService,
     private dergoRezerviminService: DergoRezerviminService,
     private _formBuilder:FormBuilder,
     public datepipe: DatePipe,
     private _snackBar:MatSnackBar,
     private authService: AuthService,
     public spinnerService:NgxSpinnerService,
     private prel:PreloaderService) {
     this.typeSelected = 'timer';

     }

     openSnackBar() {
      this._snackBar.open('Zgjedheni Daten pastaj oren','X', {
        duration: this.kohapritjes * 1000,
      });
    }

    ngOnInit(): void {

      //shfaq sherbimet
      this.sherbimetService.getSherbimet().subscribe(
        responddata => {
          this.sherbimi = responddata.sherbimet;
        });
      // sherbimet end

      // shfaq punetoret
      this.punetoretService.getPunetoret().subscribe(
        respond => {
          this.punetori = respond.punetoret;
        });
      //punetoret end

    this.firstFormGroup = this._formBuilder.group({
      sherbimiZgjedhur : ['',Validators.required],
      puntoriZgjedhur : ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      orarizgjedhur: ['', Validators.required],
      dataZgjedhur: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      emri: ['', Validators.required],
      mbiemri: ['', Validators.required],
      email: ['', Validators.required],
      numri: ['', Validators.required,]
    });

  }
  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
}
  onClickDate(){
    this.oraret = [];
    console.log(this.datepipe.transform(this.dataZgjedhur,'yyyy-MM-dd'));
    this.getOraret(this.dataZgjedhur);
    this.prel.showSpinner();
    this.showOraret=false;



  }


  getOraret(selectedDate: Date){
    let latest_date =this.datepipe.transform(this.dataZgjedhur, 'yyyy-MM-dd');
    this.oraretService.getOraret(latest_date).subscribe(
      respon => this.shfaqeOraret(respon));
  }

  shfaqeOraret(response){
    response.forEach(element => {
      this.oraret.push(element[0])
    });
    console.log(response);
  }



  submit(){
    this.dergoRezerviminService.postTermin(this.firstFormGroup.value, this.thirdFormGroup.value, this.secondFormGroup.value).subscribe(
      data => {
        this.realizmiKorrekt=true;
        this.realizimiTerminit=data.mesazhi;
        this.realizimiFatal=false;
      },
      gabim => {
        this.realizimiFatal=true;
        this.deshtimiTerminit=gabim.error.mesazhi;
      });
  }


}

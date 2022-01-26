import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OraretService } from '../_services/oraret.service';

<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


=======
import {FormControl} from '@angular/forms';
>>>>>>> f7a56d65762eae71b62807a966345131d94b66a9

@Component({
  selector: 'app-oraret',
  templateUrl: './oraret.component.html',
  styleUrls: ['./oraret.component.css']
})
<<<<<<< HEAD

export class OraretComponent implements OnInit {
  oraret: string[] = [];
  startTime:string;

  
  constructor(private oraretService: OraretService)
   { this.getOraret()}



  ngOnInit(): void {

  }


  getOraret(): void{
    this.oraretService.getOraret().subscribe(
      response => this.shfaqeOraret(response))

=======
export class OraretComponent implements OnInit {
  toppings = new FormControl();
 selected:Date;
 
oraret: string[] = [];
  constructor(private oraretService: OraretService) { this.getOraret();}

  ngOnInit(): void {
    
    // this.oraretService.getOraret().subscribe(
    //   response => this.oraret = response.oraret);
  }
  onClickDate(){
    console.log("dataa" + this.selected);
  }

  getOraret(){
    this.oraretService.getOraret().subscribe(
      respon => this.shfaqeOraret(respon));
>>>>>>> f7a56d65762eae71b62807a966345131d94b66a9
  
  }

  shfaqeOraret(response){
    this.oraret = response;
  
    console.log("sssssss"+response);
  }


  
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OraretService } from '../_services/oraret.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-oraret',
  templateUrl: './oraret.component.html',
  styleUrls: ['./oraret.component.css']
})

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

  
  }

  shfaqeOraret(response){
    this.oraret = response;
    console.log(this.oraret);
  }


  
}

import { Component, OnInit } from '@angular/core';
import { OraretService } from '../_services/oraret.service';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-oraret',
  templateUrl: './oraret.component.html',
  styleUrls: ['./oraret.component.css']
})
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
  
  }

  shfaqeOraret(response){
    this.oraret = response;
  
    console.log("sssssss"+response);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';
  message:string = 'hello';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.message);
    this.name = this.activatedRoute.snapshot.params['name']
    
  }

}

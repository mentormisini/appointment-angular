import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { HelloWorldService } from '../service/hello-world.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';
  message:string = 'hello';
  constructor(
    private activatedRoute: ActivatedRoute,
    private service:HelloWorldService) { }

  ngOnInit(): void {
    console.log(this.message);
    this.name = this.activatedRoute.snapshot.params['name']
    
  }
  
  getHelloWorld(): void{
    this.service.executeHelloWorldService().subscribe(
    response => this.handleSuccessfulResponse(response));
    }

  handleSuccessfulResponse(response){
    console.log(response.message);
  }

}

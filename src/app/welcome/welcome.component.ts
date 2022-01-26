import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { HelloWorldService } from '../service/hello-world.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name = '';
  message:string = 'hello';
  durationInSeconds = 5;
  selected: Date | null;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private service:HelloWorldService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
    ) { }
    openSnackBar() {
      this._snackBar.openFromComponent(WelcomeComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    console.log(this.message);
    this.name = this.activatedRoute.snapshot.params['name'];
   
  }
  
  getHelloWorld(): void{
    this.service.executeHelloWorldService().subscribe(
    response => this.handleSuccessfulResponse(response));
    }

  handleSuccessfulResponse(response){
    console.log(response.message);
  }

}

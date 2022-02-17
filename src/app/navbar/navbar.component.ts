import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public isCollapsed=false; //hamburger icona
typeSelected:string;
  navbaridRef:any;
  constructor(private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'timer';
  }
  public showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000); //1 sekond
  }

  ToggleNavBar () {
    let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
    if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
      element.click();
    }
  }
  ngOnInit(): void {
  }




}

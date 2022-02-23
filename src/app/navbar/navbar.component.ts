import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {PreloaderService} from '../_services/preloader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public isCollapsed=false; //hamburger icona
typeSelected:string;
  navbaridRef:any;
  constructor(public prl: PreloaderService
              ) {
    this.typeSelected = 'timer';
  }

  ToggleNavBar () {
    let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
    if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
      element.click();
    }
  }
  ngOnInit(): void {

  }
  showLoader(){
    this.prl.showSpinner();
  }
}

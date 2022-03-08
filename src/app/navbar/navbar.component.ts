import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { PreloaderService} from '../_services/preloader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = false;
  public user: any;
  typeSelected: string;

  constructor(public prl: PreloaderService,
              private token: TokenStorageService) {
    this.typeSelected = 'timer';
  }

  ToggleNavBar() {
    const element: HTMLElement = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    if (element.getAttribute('aria-expanded') === 'true') {
      element.click();
    }
  }
  ngOnInit(): void {
  }
  showLoader() {
    this.prl.showSpinner();
  }
}

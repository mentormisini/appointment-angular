import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { PreloaderService } from '../_services/preloader.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  roles: string[] = [];
  startDate = new Date(1990, 0, 1);

  constructor(private tokenStorage: TokenStorageService,
              private preloader: PreloaderService) {
  }

  ngOnInit(): void {
    this.preloader.showSpinner();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
  }

  signOut() {
    this.tokenStorage.logOut();
  }
}
